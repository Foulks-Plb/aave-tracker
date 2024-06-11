import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { EventService } from "./events/event.service";
import { EventsController } from "./events/events.controller";
import { PoolService } from "./pools/pool.service";
import { ClientService } from "./services/client.service";
import { UsersController } from "./users/users.controller";
import { UserService } from "./users/user.service";

@Module({
  controllers: [AppController, EventsController, UsersController],
  providers: [
    AppService,
    EventService,
    PoolService,
    ClientService,
    UserService,
  ],
})
export class AppModule {}
