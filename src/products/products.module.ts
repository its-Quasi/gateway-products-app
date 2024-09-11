import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { PRODUCT_SERVICE } from "src/config/services";
import { envs } from "src/config/envs";

@Module({
  controllers: [ProductsController],
  imports: [
    ClientsModule.register([
      {
        name: PRODUCT_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.productMsHost,
          port: Number(envs.productMsPort)
        }
      }
    ])
  ]
})
export class ProductsModule {
  constructor() { }
}
