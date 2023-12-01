import {
  Injectable,
} from '@nestjs/common';
import {
  ClientDto
} from './dto';
import { Client } from './client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly userRepository: Repository<Client>,
  ) {}

  async add(
    clientDto: ClientDto,
  ): Promise<any> {
    const {
      customerType,
      billingGroup,
      surname,
      firstName,
      taxIDcode,
      identityDocument,
      technicalDepartmentEmail,
      number,
      email,
      pec,
      sDICode,
      mobilePhone,
      landlinePhone,
      invoiceViaEmail,
      paperInvoice,
      note,
      street,
      civic,
      common,
      province,
      postalCode,
      nation,
      payment,
      iBAN,
      bICCode,
      differentBillingAddress,
      disableUnpaidInvoiceChecking,
      status

    } = clientDto;

    const user = this.userRepository.create({
      customerType,
      billingGroup,
      surname,
      firstName,
      taxIDcode,
      identityDocument,
      technicalDepartmentEmail,
      number,
      email,
      pec,
      sDICode,
      mobilePhone,
      landlinePhone,
      invoiceViaEmail,
      paperInvoice,
      note,
      street,
      civic,
      common,
      province,
      postalCode,
      nation,
      payment,
      iBAN,
      bICCode,
      differentBillingAddress,
      disableUnpaidInvoiceChecking,
      status

    });

    const savedUser =
      await this.userRepository.save(user);

    return savedUser;
  }

  async update(id: string, clientDto: ClientDto,): Promise<Client | null> {

    const client = await this.userRepository.findOne({ where: { id: id } });

    if (!client) {
      return null; 
    }

    client.customerType = clientDto.customerType;
    client.billingGroup = clientDto.billingGroup;
    client.surname = clientDto.surname;
    client.firstName = clientDto.firstName;
    client.taxIDcode = clientDto.taxIDcode;
    client.identityDocument = clientDto.identityDocument;
    client.technicalDepartmentEmail = clientDto.technicalDepartmentEmail;
    client.number = clientDto.number;
    client.email = clientDto.email;
    client.pec = clientDto.pec;
    client.sDICode = clientDto.sDICode;
    client.mobilePhone = clientDto.mobilePhone;
    client.landlinePhone = clientDto.landlinePhone;
    client.invoiceViaEmail = clientDto.invoiceViaEmail;
    client.paperInvoice = clientDto.paperInvoice;
    client.note = clientDto.note;
    client.street = clientDto.street;
    client.civic = clientDto.civic;
    client.common = clientDto.common;
    client.province = clientDto.province;
    client.postalCode = clientDto.postalCode;
    client.nation = clientDto.nation;
    client.payment = clientDto.payment;
    client.iBAN = clientDto.iBAN;
    client.bICCode = clientDto.bICCode;
    client.differentBillingAddress = clientDto.differentBillingAddress;
    client.disableUnpaidInvoiceChecking = clientDto.disableUnpaidInvoiceChecking;
    client.status = clientDto.status;



    const updatedPassiveInvoice = await this.userRepository.save(client);
    return updatedPassiveInvoice;
    

  }

  async delete(id: string): Promise<Client | null> {

    const client = await this.userRepository.findOne({ where: { id: id } });

    if (!client) {
      return null; 
    }
    
   await this.userRepository.remove(client);  
   return client  

  }

  async getAll(): Promise<Client[]> {
    const client = await this.userRepository.find();
    return client;
  }
}
