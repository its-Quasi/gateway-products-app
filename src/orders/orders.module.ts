import { Module } from "@nestjs/common";
import { OrdersController } from "./orders.controller";
import { ClientsModule } from "@nestjs/microservices";
import { NatsModule } from "src/brokers/nats.module";

@Module({
  controllers: [OrdersController],
  imports: [NatsModule]
})
export class OrdersModule { }
