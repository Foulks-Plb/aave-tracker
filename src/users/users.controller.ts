import { Controller, Get, Param } from "@nestjs/common";
import { Address } from "viem";
import { UserService } from "./user.service";

@Controller("users")
export class UsersController {
  constructor(private readonly _userService: UserService) {}

  // @Get("/healtFactor/:address")
  // async getApy(@Param('address') address: Address): Promise<any> {
  //   return await this._userService.getUserAccountData(address, address);
  // }

}
