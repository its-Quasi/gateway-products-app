import { IsBoolean, IsEnum, IsNumber, IsOptional, IsPositive } from "class-validator";
import { OrderStatus } from "src/enum/order-status";

export class CreateOrderDto {
  @IsNumber()
  @IsPositive()
  totalAmount: number

  @IsNumber()
  @IsPositive()
  totalItems: number

  @IsEnum(OrderStatus, { message: `Posible status are ${OrderStatus}` })
  @IsOptional()
  status: OrderStatus = OrderStatus.PENDING

  @IsBoolean()
  @IsOptional()
  paid: boolean = false
}
