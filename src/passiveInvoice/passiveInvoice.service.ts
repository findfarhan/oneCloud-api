import {
  Injectable,
} from '@nestjs/common';
import {
  PassiveInvoiceDto
} from './dto';
import { PassiveInvoice } from './passiveInvoice.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PassiveInvoiceService {
  constructor(
    @InjectRepository(PassiveInvoice)
    private readonly userRepository: Repository<PassiveInvoice>,
  ) {}

  async add(
    passiveInvoiceDto: PassiveInvoiceDto,
  ): Promise<any> {
    const {
      supplierCompanyName,
      crediteNote,
      number,
      issueDate,
      expireDate,
      totalExcluding,
      totalNotSubject,
      totalNonTaxable,
      totalExempt,
      totalNotShown,
      totalReverseCharge,
      totalEUCountry,
      totalTaxableAmount,
      totalVAT,
      totalDocument,
      payment,
      note


    } = passiveInvoiceDto;

    const user = this.userRepository.create({
      supplierCompanyName,
      crediteNote,
      number,
      issueDate,
      expireDate,
      totalExcluding,
      totalNotSubject,
      totalNonTaxable,
      totalExempt,
      totalNotShown,
      totalReverseCharge,
      totalEUCountry,
      totalTaxableAmount,
      totalVAT,
      totalDocument,
      payment,
      note

    });

    const savedUser =
      await this.userRepository.save(user);

    return savedUser;
  }

  async update(id: string, passiveInvoiceDto: PassiveInvoiceDto,): Promise<PassiveInvoice | null> {

    const passiveInvoice = await this.userRepository.findOne({ where: { id: id } });

    if (!passiveInvoice) {
      return null; 
    }

    passiveInvoice.supplierCompanyName = passiveInvoiceDto.supplierCompanyName;
    passiveInvoice.crediteNote = passiveInvoiceDto.crediteNote;
    passiveInvoice.number = passiveInvoiceDto.number;
    passiveInvoice.issueDate = passiveInvoiceDto.issueDate;
    passiveInvoice.expireDate = passiveInvoiceDto.expireDate;
    passiveInvoice.totalExcluding = passiveInvoiceDto.totalExcluding;
    passiveInvoice.totalNotSubject = passiveInvoiceDto.totalNotSubject;
    passiveInvoice.totalNonTaxable = passiveInvoiceDto.totalNonTaxable;
    passiveInvoice.totalExempt = passiveInvoiceDto.totalExempt;
    passiveInvoice.totalNotShown = passiveInvoiceDto.totalNotShown;
    passiveInvoice.totalReverseCharge = passiveInvoiceDto.totalReverseCharge;
    passiveInvoice.totalEUCountry = passiveInvoiceDto.totalEUCountry;
    passiveInvoice.totalTaxableAmount = passiveInvoiceDto.totalTaxableAmount;
    passiveInvoice.totalVAT = passiveInvoiceDto.totalVAT;
    passiveInvoice.totalDocument = passiveInvoiceDto.totalDocument;
    passiveInvoice.payment = passiveInvoiceDto.payment;
    passiveInvoice.note = passiveInvoiceDto.note;
    
    const updatedPassiveInvoice = await this.userRepository.save(passiveInvoice);
    return updatedPassiveInvoice;
    

  }

  async delete(id: string): Promise<PassiveInvoice | null> {

    const passiveInvoice = await this.userRepository.findOne({ where: { id: id } });

    if (!passiveInvoice) {
      return null; 
    }
    
   await this.userRepository.remove(passiveInvoice);  
   return passiveInvoice  

  }

  async getAll(): Promise<PassiveInvoice[]> {
    const passiveInvoice = await this.userRepository.find();
    return passiveInvoice;
  }
}
