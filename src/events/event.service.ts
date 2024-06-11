import { Injectable } from "@nestjs/common";
import { POOL_ADDRESS } from "src/constants/constants";
import { ClientService } from "src/services/client.service";
import {
  parseAbiItem,
} from "viem";

@Injectable()
export class EventService {
  constructor(private readonly _clientService: ClientService) {}

  async getSupply(): Promise<any[]> {
    const event = parseAbiItem(
      "event Supply(address reserve, address user, address onBehalfOf, uint256 amount, uint16 referralCode)"
    );
    return await this._getLogs(event);
  }

  async getRepay(): Promise<any[]> {
    const event = parseAbiItem(
      "event Repay(address reserve, address user, address repayer, uint256 amount, bool useATokens)"
    );
    return await this._getLogs(event);
  }

  async getBorrow(): Promise<any[]> {
    const event = parseAbiItem(
      "event Borrow(address reserve, address user, address onBehalfOf, uint256 amount, uint8 interestRateMode, uint256 borrowRate, uint16 referralCode)"
    );
    return await this._getLogs(event);
  }

  async getWithdraw(): Promise<any[]> {
    const event = parseAbiItem(
      "event Withdraw(address reserve, address user, address to, uint256 amount)"
    );
    return await this._getLogs(event);
  }

  private async _getLogs(event: any, nbrOfBlock = 100n): Promise<any[]> {
    const blockNumber = await this._getLastBlock();
    const logs = await this._clientService.client.getLogs({
      event,
      address: POOL_ADDRESS,
      fromBlock: blockNumber - nbrOfBlock,
      toBlock: blockNumber,
    });

    return logs;
  }

  private async _getLastBlock(): Promise<bigint> {
    return await this._clientService.client.getBlockNumber();
  }
}
