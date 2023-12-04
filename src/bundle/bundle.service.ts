import {
  Injectable,
} from '@nestjs/common';
import {
  BundleDto
} from './dto';
import { Bundle } from './bundle.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BundleService {
  constructor(
    @InjectRepository(Bundle)
    private readonly userRepository: Repository<Bundle>,
  ) {}

  async add(
    bundleDto: BundleDto,
  ): Promise<any> {
    const {
      Description


    } = bundleDto;

    const user = this.userRepository.create({
      Description


    });

    const savedUser =
      await this.userRepository.save(user);

    return savedUser;
  }

  async update(id: string, bundleDto: BundleDto,): Promise<Bundle | null> {

    const bundle = await this.userRepository.findOne({ where: { id: id } });

    if (!bundle) {
      return null; 
    }

    bundle.Description = bundleDto.Description;



    const updatedBundle = await this.userRepository.save(bundle);
    return updatedBundle;
    

  }

  async delete(id: string): Promise<Bundle | null> {

    const bundle = await this.userRepository.findOne({ where: { id: id } });

    if (!bundle) {
      return null; 
    }
    
   await this.userRepository.remove(bundle);  
   return bundle  

  }

  async getAll(): Promise<Bundle[]> {
    const bundle = await this.userRepository.find();
    return bundle;
  }
}
