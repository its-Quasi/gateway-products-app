import { Controller, Get, Inject, Post, Query } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { PRODUCT_SERVICE } from "src/config/services";

@Controller("products")
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy
  ) {}

  @Post()
  createProduct() {
    return "create product";
  }

  @Get()
  findAll(@Query() pagination: PaginationDto) {
    return this.productsClient.send("get_all_products", pagination);
  }
}
