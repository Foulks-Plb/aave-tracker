import { Controller, Get, Param } from "@nestjs/common";
import { PoolService } from "./pool.service";
import { Address } from "viem";

@Controller("pools")
export class PoolsController {
  constructor(private readonly _poolService: PoolService) {}

  @Get("/apy/:address")
  async getApy(@Param('address') address: Address): Promise<any> {
    return await this._poolService.getReserveData(address);
  }

}
