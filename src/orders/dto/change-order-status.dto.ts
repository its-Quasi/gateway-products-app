import { OrderStatus, OrderStatusList } from '../../enum/order-status'
import { IsEnum, IsUUID } from 'class-validator';


export class ChangeOrderStatusDto {
  @IsUUID(4)
  id: string;

  @IsEnum(OrderStatus, { message: `Valid status are ${OrderStatusList}` })
  status: OrderStatus;
}