import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { CusName } from "./entities/CUS_NAME.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CusName) private cusNameRepository: Repository<CusName>,
  ) {}

  async create(dto: CreateCustomerDto) {
    const customer = await this.cusNameRepository.findOne({
      where: { cus_id: dto.cus_id },
    });
    if (customer) {
      throw new ConflictException("Customer ID already exists");
    }

    const newCustomer = this.cusNameRepository.create(dto);
    return this.cusNameRepository.save(newCustomer);
  }

  findAll() {
    return this.cusNameRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  update(dto: CreateCustomerDto) {
    return this.cusNameRepository.save(dto);
  }

  async remove(id: string) {
    const customer = await this.cusNameRepository.findOne({
      where: { cus_id: id },
    });
    if (!customer) {
      throw new NotFoundException("Customer not found");
    }
    return this.cusNameRepository.remove(customer);
  }
}
