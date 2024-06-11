import { Injectable } from "@nestjs/common";
import { ClientService } from "src/services/client.service";
import { Address } from "viem";
import { aaveDataProviderV3 } from "../abi/aaveDataProviderV3";
import { aaveOracleV3 } from "../abi/aaveOracleV3";
import {
  DATAPROVIDER_ADDRESS,
  POOL_ADDRESS,
  ORACLE_ADDRESS,
} from "src/constants/constants";
import { aavePoolV3 } from "src/abi/aavePoolV3";

interface IApyData {
  supplyApy: number;
  stableBorrowApy: number;
  variableBorrowApy: number;
}

@Injectable()
export class UserService {
  constructor(private readonly _clientService: ClientService) {
    this.getUserAccountData(
      "0x2DE373887B9742162c9A5885DdB5DebEA8e4486d",
      "0x135E676A7d07c2e287B7b4B73ECCb160AF377256"
    );
  }

  // TODO: Finish implementing this function
  // TODO: batch all calls into one
  async getUserAccountData(token: Address, user: Address): Promise<any> {
    const configuration = await this._clientService.client.readContract({
      address: POOL_ADDRESS,
      abi: aavePoolV3,
      functionName: "getConfiguration",
      args: ["0x2DE373887B9742162c9A5885DdB5DebEA8e4486d"], // Token for test
    });

    let config = configuration.data.toString(2);
    while (config.length < 48) {
      config = "0" + config;
    }

    console.log(config);
    let liquidationBonus =
      parseInt(config.slice(32, 47), 2) / Math.pow(10, 4) - 1;

    console.log(liquidationBonus);

    const _debtAssetPrice = await this._clientService.client.readContract({
      address: ORACLE_ADDRESS,
      abi: aaveOracleV3,
      functionName: "getAssetPrice",
      args: ["0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0"], // token for test
    });
    const debtAssetPrice = Number(_debtAssetPrice);

    const _collateralAssetPrice = await this._clientService.client.readContract(
      {
        address: ORACLE_ADDRESS,
        abi: aaveOracleV3,
        functionName: "getAssetPrice",
        args: ["0xdAC17F958D2ee523a2206206994597C13D831ec7"], // USDT for test
      }
    );
    const collateralAssetPrice = Number(_collateralAssetPrice);
    console.log(collateralAssetPrice);

    const userData = await this._clientService.client.readContract({
      address: POOL_ADDRESS,
      abi: aavePoolV3,
      functionName: "getUserAccountData",
      args: [user],
    });

    const healthFactor = Number(userData[5]) / 10 ** 18;
    console.log(healthFactor);

    let liquidationCloseFactor = 0;
    if (healthFactor > 0.95 && healthFactor < 1) {
      liquidationCloseFactor = 0.5;
    } else if (healthFactor < 0.95) {
      liquidationCloseFactor = 1;
    }

    const userReserveData = await this._clientService.client.readContract({
      address: DATAPROVIDER_ADDRESS,
      abi: aaveDataProviderV3,
      functionName: "getUserReserveData",
      args: ["0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0", user],
    });

    console.log(userReserveData);
    const debtToCover =
      (Number(userReserveData[4]) + Number(userReserveData[5])) *
      liquidationCloseFactor;
    console.log(debtToCover);

    const maxAmountOfCollateralToLiquidate =
      (debtAssetPrice * debtToCover * liquidationBonus) / collateralAssetPrice;

    console.log(maxAmountOfCollateralToLiquidate);

    // ...

    return {
      canLiquidate: true,
    };
  }
}
