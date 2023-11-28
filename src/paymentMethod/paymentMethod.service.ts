import {
  Injectable,
} from '@nestjs/common';
import {
  PaymentMethodDto
} from './dto';
import { PaymentMethod } from './paymentMethod.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentMethodService {
  constructor(
    @InjectRepository(PaymentMethod)
    private readonly userRepository: Repository<PaymentMethod>,
  ) {}

  async add(
    paymentMethodDto: PaymentMethodDto,
  ): Promise<any> {
    const {
      CommunicationCode,
      Description,
      InvoiceCodeEl,
      BillingNotes,
      Unpaidtext

    } = paymentMethodDto;

    const user = this.userRepository.create({
      CommunicationCode,
      Description,
      InvoiceCodeEl,
      BillingNotes,
      Unpaidtext


    });

    const savedUser =
      await this.userRepository.save(user);

    return savedUser;
  }

  async update(id: string, paymentMethodDto: PaymentMethodDto,): Promise<PaymentMethod | null> {

    const PaymentMethod = await this.userRepository.findOne({ where: { id: id } });

    if (!PaymentMethod) {
      return null; 
    }

    PaymentMethod.CommunicationCode = paymentMethodDto.CommunicationCode;
    PaymentMethod.Description = paymentMethodDto.Description;
    PaymentMethod.InvoiceCodeEl = paymentMethodDto.InvoiceCodeEl;
    PaymentMethod.BillingNotes = paymentMethodDto.BillingNotes;
    PaymentMethod.Unpaidtext = paymentMethodDto.Unpaidtext;



    const updatedPaymentMethod = await this.userRepository.save(PaymentMethod);
    return updatedPaymentMethod;
    

  }

  async delete(id: string): Promise<PaymentMethod | null> {

    const PaymentMethod = await this.userRepository.findOne({ where: { id: id } });

    if (!PaymentMethod) {
      return null; 
    }
    
   await this.userRepository.remove(PaymentMethod);  
   return PaymentMethod  

  }

  async getAll(): Promise<PaymentMethod[]> {
    const PaymentMethod = await this.userRepository.find();
    return PaymentMethod;
  }
}
