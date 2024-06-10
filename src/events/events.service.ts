import { Injectable } from "@nestjs/common";
import {
  createPublicClient,
  http,
  parseAbiItem,
  Address,
  PublicClient,
} from "viem";
import { mainnet } from "viem/chains";

@Injectable()
export class EventsService {
  constructor() {
    this._initClient();
  }

  private _client: PublicClient;
  private readonly ADDRESS: Address =
    "0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2"; // AAVE address pool v3

  private async _initClient() {
    // @ts-ignore
    this._client = createPublicClient({
      chain: mainnet,
      transport: http(),
    }) as PublicClient;
  }

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

  private async _getLogs(event: any): Promise<any[]>{
    const blockNumber = await this._getLastBlock();
    const logs = await this._client.getLogs({
      event,
      address: this.ADDRESS,
      fromBlock: blockNumber - 100n,
      toBlock: blockNumber,
    });

    return logs;
  }

  private async _getLastBlock(): Promise<bigint> {
    return await this._client.getBlockNumber();
  }
}
