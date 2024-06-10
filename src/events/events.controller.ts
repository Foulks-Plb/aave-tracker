import { Controller, Get } from "@nestjs/common";
import { EventsService } from "./events.service";

@Controller("events")
export class EventsController {
  constructor(private readonly _eventService: EventsService) {}

  @Get("/supply")
  async getSupply(): Promise<any[]> {
    return await this._eventService.getSupply();
  }

  @Get("/repay")
  async getRepay(): Promise<any[]> {
    return await this._eventService.getRepay();
  }

  @Get("/borrow")
  async getBorrow(): Promise<any[]> {
    return await this._eventService.getBorrow();
  }

  @Get("/withdraw")
  async getWithdraw(): Promise<any[]> {
    return await this._eventService.getWithdraw();
  }
}
