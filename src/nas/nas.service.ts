import {
  Injectable,
} from '@nestjs/common';
import {
  NASDto
} from './dto';
import { NAS } from './nas.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class NASService {
  constructor(
    @InjectRepository(NAS)
    private readonly userRepository: Repository<NAS>,
  ) {}

  async add(
    nASDto:NASDto,
  ): Promise<any> {
    const {
      ipNas,
      node,


    } = nASDto;

    const user = this.userRepository.create({
      ipNas,
      node,


    });

    const savedUser =
      await this.userRepository.save(user);

    return savedUser;
  }

  async update(id: string, nASDto: NASDto,): Promise<NAS | null> {

    const NAS = await this.userRepository.findOne({ where: { id: id } });

    if (!NAS) {
      return null; 
    }

    NAS.ipNas = nASDto.ipNas;
    NAS.node = nASDto.node;



    const updatedNAS = await this.userRepository.save(NAS);
    return updatedNAS;
    

  }

  async delete(id: string): Promise<NAS | null> {

    const NAS = await this.userRepository.findOne({ where: { id: id } });

    if (!NAS) {
      return null; 
    }
    
   await this.userRepository.remove(NAS);  
   return NAS  

  }

  async getAll(): Promise<NAS[]> {
    const NAS = await this.userRepository.find();
    return NAS;
  }
}
