import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateInvoiceInput } from './dto/create-invoice.input';
import { UpdateInvoiceInput } from './dto/update-invoice.input';
import { Invoice } from './entities/invoice.entity';
import { Customer } from '../customer/entities/customer.entity';
import { Product } from '../product/entities/product.entity';
import { Company } from 'src/company/entities/company.entity';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    @InjectRepository(Invoice)
    private invoiceRepository: Repository<Invoice>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(User)
    private userRepository: Repository<User>) { }


  async findAll(): Promise<Invoice[]> {
    return await this.invoiceRepository.find({relations: ['product', 'customer']});
  }

  async findByCompany(companyId: string): Promise<Invoice[]> {
    const company = await this.companyRepository.findOne({where: {id: companyId} });
    return await this.invoiceRepository.find({company: company});
  }

  async findOne(id: string): Promise<Invoice>  {
    const invoice = await this.invoiceRepository.findOne(id);
    if(!invoice) {
      throw new UnauthorizedException('invoice not found');
    }
    return invoice;
  }  

  async create(userId: string, data: CreateInvoiceInput, customerId: string, productId: string, companyId: string): Promise<Invoice> {
    const user = await this.userRepository.findOne({where: {id: userId} });
    const company = await this.companyRepository.findOne({where: {id: companyId} });
    const customer = await this.customerRepository.findOne({where: {id: customerId} });
    const product = await this.productRepository.findOne({where: {id: productId} });

    const invoice = this.invoiceRepository.create({...data, customer, product, user: user, company: company});  
    try {
      return await this.invoiceRepository.save(invoice);
    } catch(error) {
      console.error(error)
      throw new InternalServerErrorException();
    }
  }

  async update(userId: string, id: string, data: UpdateInvoiceInput, customerId: string, productId: string, companyId: string): Promise<Invoice> {
    const user = await this.userRepository.findOne({where: {id: userId} });
    const company = await this.companyRepository.findOne({where: {id: companyId} });
    const customer = await this.customerRepository.findOne({where: {id: customerId} });
    const product = await this.productRepository.findOne({where: {id: productId} });
    let invoice = await this.invoiceRepository.findOne({ where: {id}});
    if(!invoice) {
      throw new UnauthorizedException('invoice not found');
    }

    await this.invoiceRepository.update({ id }, {...data, customer, product, company: company});
    invoice = await this.invoiceRepository.findOne({ where: {id}});
    return invoice;
  }

  async delete(id: string): Promise<Invoice> {
    const invoice: any = await this.invoiceRepository.findOne({ where: {id}});
    if(!invoice) {
      throw new UnauthorizedException('invoice not found');
    }
    await this.invoiceRepository.delete(id);
    return invoice;
  }
}
