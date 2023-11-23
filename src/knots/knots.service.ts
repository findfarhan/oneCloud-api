import {
  Injectable,
} from '@nestjs/common';
import {
  KnotsDto
} from './dto';
import { Knots } from './knots.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class KnotsService {
  constructor(
    @InjectRepository(Knots)
    private readonly userRepository: Repository<Knots>,
  ) {}

  async add(
    knotsDto: KnotsDto,
  ): Promise<any> {
    const {
      address,
      firstName,


    } = knotsDto;

    const user = this.userRepository.create({
      address,
        firstName,


    });

    const savedUser =
      await this.userRepository.save(user);

    return savedUser;
  }

  async update(id: string, knotsDto: KnotsDto,): Promise<Knots | null> {

    const Knots = await this.userRepository.findOne({ where: { id: id } });

    if (!Knots) {
      return null; 
    }

    Knots.address = knotsDto.address;
    Knots.firstName = knotsDto.firstName;



    const updatedKnots = await this.userRepository.save(Knots);
    return updatedKnots;
    

  }

  async delete(id: string): Promise<Knots | null> {

    const Knots = await this.userRepository.findOne({ where: { id: id } });

    if (!Knots) {
      return null; 
    }
    
   await this.userRepository.remove(Knots);  
   return Knots  

  }

  async getAll(): Promise<Knots[]> {
    const Knots = await this.userRepository.find();
    return Knots;
  }
}
