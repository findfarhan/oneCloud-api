import {
  Injectable,
} from '@nestjs/common';
import {
  RateDto
} from './dto';
import { Rate } from './rate.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RateService {
  constructor(
    @InjectRepository(Rate)
    private readonly userRepository: Repository<Rate>,
  ) {}

  async add(
    rateDto: RateDto,
  ): Promise<any> {
    const {
      Rate,
        Description,
        Nature,
        Default,


    } = rateDto;

    const user = this.userRepository.create({
      Rate,
      Description,
      Nature,
      Default,


    });

    const savedUser =
      await this.userRepository.save(user);

    return savedUser;
  }

  async update(id: string, rateDto: RateDto,): Promise<Rate | null> {

    const Rate = await this.userRepository.findOne({ where: { id: id } });

    if (!Rate) {
      return null; 
    }

    Rate.Rate = rateDto.Rate;
    Rate.Description = rateDto.Description;
    Rate.Nature = rateDto.Nature;
    Rate.Default = rateDto.Default;



    const updatedRate = await this.userRepository.save(Rate);
    return updatedRate;
    

  }

  async delete(id: string): Promise<Rate | null> {

    const Rate = await this.userRepository.findOne({ where: { id: id } });

    if (!Rate) {
      return null; 
    }
    
   await this.userRepository.remove(Rate);  
   return Rate  

  }

  async getAll(): Promise<Rate[]> {
    const Rate = await this.userRepository.find();
    return Rate;
  }
}
