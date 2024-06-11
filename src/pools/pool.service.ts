import { Injectable } from "@nestjs/common";
import { ClientService } from "src/services/client.service";
import { Address } from "viem";
import { aavePoolV3 } from "../abi/aavePoolV3";
import { ADDRESS } from "src/constants/constants";

interface IApyData {
  supplyApy: number;
  stableBorrowApy: number;
  variableBorrowApy: number;
}

@Injectable()
export class PoolService {
  constructor(private readonly _clientService: ClientService) {}

  async getReserveData(address: Address): Promise<IApyData> {
    const reservesData = await this._clientService.client.readContract({
      address: ADDRESS,
      abi: aavePoolV3,
      functionName: "getReserveData",
      args: [address],
    });
    const supplyApy = this.convertToPercentage(
      reservesData.currentLiquidityRate
    );
    const stableBorrowApy = this.convertToPercentage(
      reservesData.currentStableBorrowRate
    );
    const variableBorrowApy = this.convertToPercentage(
      reservesData.currentVariableBorrowRate
    );

    return {
      supplyApy,
      stableBorrowApy,
      variableBorrowApy,
    };
  }

  convertToPercentage(value: bigint) {
    return (Number(value) / 10 ** 27) * 100;
  }
}
