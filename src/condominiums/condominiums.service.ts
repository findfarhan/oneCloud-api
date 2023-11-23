import {
  Injectable,
} from '@nestjs/common';
import {
  CondominiumsDto
} from './dto';
import { Condominiums } from './condominiums.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CondominiumsService {
  constructor(
    @InjectRepository(Condominiums)
    private readonly userRepository: Repository<Condominiums>,
  ) {}

  async add(
    condominiumsDto: CondominiumsDto,
  ): Promise<any> {
    const {
      ipCpe,
      firstName,
      address,
      referent,
      ap,
      node,
      client
          

    } = condominiumsDto;

    const user = this.userRepository.create({
      ipCpe,
        firstName,
        address,
        referent,
        ap,
        node,
        client

    });

    const savedUser =
      await this.userRepository.save(user);

    return savedUser;
  }

  async update(id: string, condominiumsDto: CondominiumsDto,): Promise<Condominiums | null> {

    const Condominiums = await this.userRepository.findOne({ where: { id: id } });

    if (!Condominiums) {
      return null; 
    }

    Condominiums.ipCpe = condominiumsDto.ipCpe;
    Condominiums.firstName = condominiumsDto.firstName;
    Condominiums.address = condominiumsDto.address;
    Condominiums.referent = condominiumsDto.referent;
    Condominiums.ap = condominiumsDto.ap;
    Condominiums.node = condominiumsDto.node;
    Condominiums.client = condominiumsDto.client;


    const updatedCondominiums = await this.userRepository.save(Condominiums);
    return updatedCondominiums;
    

  }

  async delete(id: string): Promise<Condominiums | null> {

    const Condominiums = await this.userRepository.findOne({ where: { id: id } });

    if (!Condominiums) {
      return null; 
    }
    
   await this.userRepository.remove(Condominiums);  
   return Condominiums  

  }

  async getAll(): Promise<Condominiums[]> {
    const Condominiums = await this.userRepository.find();
    return Condominiums;
  }
}
