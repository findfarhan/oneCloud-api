import {
  Injectable,
} from '@nestjs/common';
import {
  NASDto
} from './dto';
import { NAS } from './nas.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Knots } from 'src/knots/knots.entity';

@Injectable()
export class NASService {
  constructor(
    @InjectRepository(NAS)
    private readonly nasRepository: Repository<NAS>,
    @InjectRepository(Knots)
    private readonly KnotsRepository: Repository<Knots>,
  ) {}

  async add(
    nASDto:NASDto,
  ): Promise<any> {
    const {
      ipNas,
      node,


    } = nASDto;

    const user = this.nasRepository.create({
      ipNas,
      node,


    });

    const savedUser =
      await this.nasRepository.save(user);

    return savedUser;
  }

  async update(id: string, nASDto: NASDto,): Promise<NAS | null> {

    const NAS = await this.nasRepository.findOne({ where: { id: id } });

    if (!NAS) {
      return null; 
    }

    NAS.ipNas = nASDto.ipNas;
    NAS.node = nASDto.node;



    const updatedNAS = await this.nasRepository.save(NAS);
    return updatedNAS;
    

  }

  async delete(id: string): Promise<NAS | null> {

    const NAS = await this.nasRepository.findOne({ where: { id: id } });

    if (!NAS) {
      return null; 
    }
    
   await this.nasRepository.remove(NAS);  
   return NAS  

  }

  async getAll(): Promise<NAS[]> {
    const NAS = await this.nasRepository.find();
    return NAS;
  }

  
  async getAllIpNas(): Promise<string[]> {
    const allNas = await this.nasRepository.find();
    
    const allIpNas = allNas.map((nas: NAS) => nas.ipNas);
    
    return allIpNas;
  }

  
  
}
