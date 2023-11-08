import {
  Injectable,
} from '@nestjs/common';
import {
  AddPartnerDto
} from './dto';
import { Partner } from './partner.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PartnerService {
  constructor(
    @InjectRepository(Partner)
    private readonly userRepository: Repository<Partner>,
  ) {}

  async add(
    addPartnerDto: AddPartnerDto,
  ): Promise<any> {
    const {
      businessName,
      contactSurname,
      contactName,
      landlineTel,
      telMobile,
      code,
    } = addPartnerDto;

    const user = this.userRepository.create({
      businessName,
      contactSurname,
      contactName,
      landlineTel,
      telMobile,
      code,
    });

    const savedUser =
      await this.userRepository.save(user);

    return savedUser;
  }

  async update(id: string, addPartnerDto: AddPartnerDto,): Promise<Partner | null> {

    const partner = await this.userRepository.findOne({ where: { id: id } });

    if (!partner) {
      return null; 
    }

    partner.businessName = addPartnerDto.businessName;
    partner.contactSurname = addPartnerDto.contactSurname;
    partner.contactName = addPartnerDto.contactName;
    partner.landlineTel = addPartnerDto.landlineTel;
    partner.telMobile = addPartnerDto.telMobile;
    partner.code = addPartnerDto.code;
    
    const updatedPartner = await this.userRepository.save(partner);
    return updatedPartner;
    

  }

  async delete(id: string): Promise<Partner | null> {

    const partner = await this.userRepository.findOne({ where: { id: id } });

    if (!partner) {
      return null; 
    }
    
   await this.userRepository.remove(partner);  
   return partner  

  }

  async getAll(): Promise<Partner[]> {
    const partners = await this.userRepository.find();
    return partners;
  }
}
