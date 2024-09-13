import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query
} from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { catchError } from "rxjs";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { NATS_SERVICE } from "src/config/services";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

@Controller("products")
export class ProductsController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) { }

  @Post()
  createProduct(@Body() product: CreateProductDto) {
    return this.client.send("create_product", product).pipe(
      catchError((err) => {
        throw new RpcException(err);
      })
    );
  }

  @Get()
  findAll(@Query() pagination: PaginationDto) {
    console.log(pagination);
    return this.client.send("get_all_products", pagination);
  }

  @Get(":id")
  findById(@Param("id") id: string) {
    return this.client.send("get_product_id", { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      })
    );
  }

  @Patch(":id")
  update(@Body() update: UpdateProductDto) {
    return this.client.send("update_product", update).pipe(
      catchError((err) => {
        throw new RpcException(err);
      })
    );
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.client.send("delete_product", { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      })
    );
  }
}
