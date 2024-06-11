import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventService } from './events/event.service';
import { EventsController } from './events/events.controller';
import { PoolService } from './pools/pool.service';
import { ClientService } from './services/client.service';

@Module({
  controllers: [AppController, EventsController],
  providers: [AppService, EventService, PoolService, ClientService],
})
export class AppModule {}
