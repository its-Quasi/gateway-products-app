import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  Query,
  ParseUUIDPipe
} from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { catchError } from "rxjs";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { CreateOrderDto } from "./dto/create-order.dto";
import { ORDER_SERVICE } from "src/config/services";

@Controller("orders")
export class OrdersController {
  constructor(
    @Inject(ORDER_SERVICE) private readonly orderClient: ClientProxy
  ) { }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderClient.send("create_order", createOrderDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      })
    );
  }

  @Get()
  findAll(@Query() pagination: PaginationDto) {
    return this.orderClient.send("find_all_orders", pagination).pipe(
      catchError((err) => {
        throw new RpcException(err);
      })
    );
  }

  @Get(":id")
  findOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.orderClient.send("find_one_order", { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      })
    )
  }
}
