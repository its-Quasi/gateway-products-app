import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { NatsModule } from "src/brokers/nats.module";

@Module({
  controllers: [AuthController],
  providers: [NatsModule]
})
export class AuthModule {}
