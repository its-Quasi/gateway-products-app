import { Controller, Get, Inject, Post, Query } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { PRODUCT_SERVICE } from "src/config/services";

@Controller("products")
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy
  ) {}

  @Post()
  createProduct(@Query() product: any) {
    return this.productsClient.send("create_product", { product });
  }

  @Get()
  findAll(@Query() pagination: PaginationDto) {
    console.log(pagination);
    return this.productsClient.send("get_all_products", pagination);
  }

  @Get()
  async findById(@Query() id: string) {
    const product = await firstValueFrom(
      this.productsClient.send("get_product_id", { id })
    );
    return product;
  }
}
