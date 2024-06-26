import { Controller, Get } from "@nestjs/common";
import { EventService } from "./event.service";

@Controller("events")
export class EventsController {
  constructor(private readonly _eventService: EventService) {}

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
