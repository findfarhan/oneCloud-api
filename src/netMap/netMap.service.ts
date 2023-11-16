import {
  Injectable,
} from '@nestjs/common';
import {
  NetMapDto
} from './dto';
import { NetMap } from './netMap.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class NetMapService {
  constructor(
    @InjectRepository(NetMap)
    private readonly userRepository: Repository<NetMap>,
  ) {}

  async add(
    netMapDto: NetMapDto,
  ): Promise<any> {
    const {
      svlanId,
      clli,
      svlanCode,
      service,
      startFrom
    } = netMapDto;

    const user = this.userRepository.create({
      svlanId,
      clli,
      svlanCode,
      service,
      startFrom
    });

    const savedUser =
      await this.userRepository.save(user);

    return savedUser;
  }

  async update(id: string, netMapDto: NetMapDto,): Promise<NetMap | null> {

    const netMap = await this.userRepository.findOne({ where: { id: id } });

    if (!netMap) {
      return null; 
    }

    netMap.clli = netMapDto.clli;
    netMap.svlanCode = netMapDto.svlanCode;
    netMap.service = netMapDto.service;
    netMap.startFrom = netMapDto.startFrom;
    
    const updatedNetMap = await this.userRepository.save(netMap);
    return updatedNetMap;
    

  }

  async delete(id: string): Promise<NetMap | null> {

    const netMap = await this.userRepository.findOne({ where: { id: id } });

    if (!netMap) {
      return null; 
    }
    
   await this.userRepository.remove(netMap);  
   return netMap  

  }

  async getAll(): Promise<NetMap[]> {
    const netMap = await this.userRepository.find();
    return netMap;
  }
}
