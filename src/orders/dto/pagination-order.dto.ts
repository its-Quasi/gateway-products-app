import { IsEnum, IsOptional, IsString } from "class-validator";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { OrderStatus } from "src/enum/order-status";


export class PaginationOrderDto extends PaginationDto {
  @IsOptional()
  @IsEnum(OrderStatus)
  status: OrderStatus = OrderStatus.DELIVERED
}