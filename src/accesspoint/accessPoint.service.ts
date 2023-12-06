import {
  Injectable,
} from '@nestjs/common';
import {
  AccessPointDto
} from './dto';
import { AccessPoint } from './accessPoint.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AccessPointService {
  constructor(
    @InjectRepository(AccessPoint)
    private readonly userRepository: Repository<AccessPoint>,
  ) {}

  async add(
    accessPointDto: AccessPointDto,
  ): Promise<any> {
    const {
      ipAccessPoint,
      name,
      nas,
      node

          

    } = accessPointDto;

    const user = this.userRepository.create({
      ipAccessPoint,
      name,
      nas,
      node
    });

    const savedUser =
      await this.userRepository.save(user);

    return savedUser;
  }

  async update(id: string, AccessPointDto: AccessPointDto,): Promise<AccessPoint | null> {

    const AccessPoint = await this.userRepository.findOne({ where: { id: id } });

    if (!AccessPoint) {
      return null; 
    }

    AccessPoint.ipAccessPoint = AccessPointDto.ipAccessPoint;
    AccessPoint.name = AccessPointDto.name;
    AccessPoint.nas = AccessPointDto.nas;
    AccessPoint.node = AccessPointDto.node;
  


    const updatedAccessPoint = await this.userRepository.save(AccessPoint);
    return updatedAccessPoint;
    

  }

  async delete(id: string): Promise<AccessPoint | null> {

    const AccessPoint = await this.userRepository.findOne({ where: { id: id } });

    if (!AccessPoint) {
      return null; 
    }
    
   await this.userRepository.remove(AccessPoint);  
   return AccessPoint  

  }

  async getAll(): Promise<AccessPoint[]> {
    const AccessPoint = await this.userRepository.find();
    return AccessPoint;
  }

  async getAllIpAccessPoint(): Promise<string[]> {
    const allAccessPoint = await this.userRepository.find();
    
    const allIpAccessPoint = allAccessPoint.map((accessPoint: AccessPoint) => accessPoint.ipAccessPoint);
    
    return allIpAccessPoint;
  }
}
