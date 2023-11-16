import {
  Injectable,
} from '@nestjs/common';
import {
  ProviderDto
} from './dto';
import { Provider } from './provider.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProviderService {
  constructor(
    @InjectRepository(Provider)
    private readonly userRepository: Repository<Provider>,
  ) {}

  async add(
    providerDto: ProviderDto,
  ): Promise<any> {
    const {
      supplierType,
      businessName,
      vatNumber,
      attorney,
      representativeTaxCode,
      taxIdCode,
      identityDocument,
      number,
      email,
      pec,
      mobilePhone,
      landlinePhone,
      emailNOC,
      enableTicketSending,
      street,
      civic,
      common,
      province,
      postalCode,
      payment,
      iBAN


    } = providerDto;

    const user = this.userRepository.create({
      supplierType,
      businessName,
      vatNumber,
      attorney,
      representativeTaxCode,
      taxIdCode,
      identityDocument,
      number,
      email,
      pec,
      mobilePhone,
      landlinePhone,
      emailNOC,
      enableTicketSending,
      street,
      civic,
      common,
      province,
      postalCode,
      payment,
      iBAN

    });

    const savedUser =
      await this.userRepository.save(user);

    return savedUser;
  }

  async update(id: string, providerDto: ProviderDto,): Promise<Provider | null> {

    const passiveInvoice = await this.userRepository.findOne({ where: { id: id } });

    if (!passiveInvoice) {
      return null; 
    }

    passiveInvoice.supplierType = providerDto.supplierType;
    passiveInvoice.businessName = providerDto.businessName;
    passiveInvoice.vatNumber = providerDto.vatNumber;
    passiveInvoice.attorney = providerDto.attorney;
    passiveInvoice.representativeTaxCode = providerDto.representativeTaxCode;
    passiveInvoice.taxIdCode = providerDto.taxIdCode;
    passiveInvoice.identityDocument = providerDto.identityDocument;
    passiveInvoice.number = providerDto.number;
    passiveInvoice.email = providerDto.email;
    passiveInvoice.pec = providerDto.pec;
    passiveInvoice.mobilePhone = providerDto.mobilePhone;
    passiveInvoice.landlinePhone = providerDto.landlinePhone;
    passiveInvoice.emailNOC = providerDto.emailNOC;
    passiveInvoice.enableTicketSending = providerDto.enableTicketSending;
    passiveInvoice.street = providerDto.street;
    passiveInvoice.civic = providerDto.civic;
    passiveInvoice.common = providerDto.common;
    passiveInvoice.province = providerDto.province;
    passiveInvoice.postalCode = providerDto.postalCode;
    passiveInvoice.payment = providerDto.payment;
    passiveInvoice.iBAN = providerDto.iBAN;

    const updatedPassiveInvoice = await this.userRepository.save(passiveInvoice);
    return updatedPassiveInvoice;
    

  }

  async delete(id: string): Promise<Provider | null> {

    const passiveInvoice = await this.userRepository.findOne({ where: { id: id } });

    if (!passiveInvoice) {
      return null; 
    }
    
   await this.userRepository.remove(passiveInvoice);  
   return passiveInvoice  

  }

  async getAll(): Promise<Provider[]> {
    const passiveInvoice = await this.userRepository.find();
    return passiveInvoice;
  }
}
