import { Injectable } from "@nestjs/common";
import { createPublicClient, http, PublicClient } from "viem";
import { mainnet } from "viem/chains";

@Injectable()
export class ClientService {

  client: PublicClient;

  constructor() {
    this._initClient();
  }

  private _initClient() {
    // @ts-ignore
    this.client = createPublicClient({
      chain: mainnet,
      transport: http(),
    }) as PublicClient;
  }
}
