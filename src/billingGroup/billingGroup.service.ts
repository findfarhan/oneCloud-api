import {
  Injectable,
} from '@nestjs/common';
import {
  BillingGroupDto
} from './dto';
import { BillingGroup } from './billingGroup.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BillingGroupService {
  constructor(
    @InjectRepository(BillingGroup)
    private readonly userRepository: Repository<BillingGroup>,
  ) {}

  async add(
    billingGroupDto: BillingGroupDto,
  ): Promise<any> {
    const {
      firstName,
      Monthinadvance,
      Daytoexpiry,
      TransmitterCode,
      Name,
      Address,
      PostalCode,
      Common,
      Province,
      Telephone,
      CrimeCode,
      Bank,
      IBAN,
      PostalAccount,
      Email,
      VATNumber,
      TaxIDCode,
      SepaCodeCUC,
      SepaCreditorCode,
      DD1stUnpaidNotice,
      DD2stUnpaidNotice,
      GGServicesBlock,
      Nation

    } = billingGroupDto;

    const user = this.userRepository.create({
      firstName,
      Monthinadvance,
      Daytoexpiry,
      TransmitterCode,
      Name,
      Address,
      PostalCode,
      Common,
      Province,
      Telephone,
      CrimeCode,
      Bank,
      IBAN,
      PostalAccount,
      Email,
      VATNumber,
      TaxIDCode,
      SepaCodeCUC,
      SepaCreditorCode,
      DD1stUnpaidNotice,
      DD2stUnpaidNotice,
      GGServicesBlock,
      Nation


    });

    const savedUser =
      await this.userRepository.save(user);

    return savedUser;
  }

  async update(id: string, billingGroupDto: BillingGroupDto,): Promise<BillingGroup | null> {

    const BillingGroup = await this.userRepository.findOne({ where: { id: id } });

    if (!BillingGroup) {
      return null; 
    }

    BillingGroup.firstName = billingGroupDto.firstName;
    BillingGroup.Monthinadvance = billingGroupDto.Monthinadvance;
    BillingGroup.Daytoexpiry = billingGroupDto.Daytoexpiry;
    BillingGroup.TransmitterCode = billingGroupDto.TransmitterCode;
    BillingGroup.Name = billingGroupDto.Name;
    BillingGroup.Address = billingGroupDto.Address;
    BillingGroup.PostalCode = billingGroupDto.PostalCode;
    BillingGroup.Common = billingGroupDto.Common;
    BillingGroup.Province = billingGroupDto.Province;
    BillingGroup.Telephone = billingGroupDto.Telephone;
    BillingGroup.CrimeCode = billingGroupDto.CrimeCode;
    BillingGroup.Bank = billingGroupDto.Bank;
    BillingGroup.IBAN = billingGroupDto.IBAN;
    BillingGroup.PostalAccount = billingGroupDto.PostalAccount;
    BillingGroup.Email = billingGroupDto.Email;
    BillingGroup.VATNumber = billingGroupDto.VATNumber;
    BillingGroup.TaxIDCode = billingGroupDto.TaxIDCode;
    BillingGroup.SepaCodeCUC = billingGroupDto.SepaCodeCUC;
    BillingGroup.SepaCreditorCode = billingGroupDto.SepaCreditorCode;
    BillingGroup.DD1stUnpaidNotice = billingGroupDto.DD1stUnpaidNotice;
    BillingGroup.DD2stUnpaidNotice = billingGroupDto.DD2stUnpaidNotice;
    BillingGroup.GGServicesBlock = billingGroupDto.GGServicesBlock;
    BillingGroup.Nation = billingGroupDto.Nation;



    const updatedBillingGroup = await this.userRepository.save(BillingGroup);
    return updatedBillingGroup;
    

  }

  async delete(id: string): Promise<BillingGroup | null> {

    const BillingGroup = await this.userRepository.findOne({ where: { id: id } });

    if (!BillingGroup) {
      return null; 
    }
    
   await this.userRepository.remove(BillingGroup);  
   return BillingGroup  

  }

  async getAll(): Promise<BillingGroup[]> {
    const BillingGroup = await this.userRepository.find();
    return BillingGroup;
  }
}
