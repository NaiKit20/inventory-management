import { PartialType } from "@nestjs/mapped-types";
import { CreateHeaderOrderDto } from "./create-header-order.dto";

export class UpdateOrderDto extends PartialType(CreateHeaderOrderDto) {}
