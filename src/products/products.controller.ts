import { Controller, Get, Inject, Param, Post, Query } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { catchError, firstValueFrom } from "rxjs";
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

  @Get(":id")
  async findById(@Param("id") id: string) {
    return this.productsClient.send("get_product_id", { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      })
    );
    // try {
    //   const product = await firstValueFrom(
    //     this.productsClient.send("get_product_id", { id })
    //   );
    //   return product;
    // } catch (error) {
    //   throw new RpcException(error);
    // }
  }
}
