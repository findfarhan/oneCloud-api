import {
  Injectable,
} from '@nestjs/common';
import {
  IpListDto
} from './dto';
import { IpList } from './ipList.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class IpListService {
  constructor(
    @InjectRepository(IpList)
    private readonly userRepository: Repository<IpList>,
  ) {}

  async add(
    ipListDto: IpListDto,
  ): Promise<any> {
    const {
      description,
      startIp,
      network,
      startIp1,
      reservedIps,
      active
          

    } = ipListDto;

    const user = this.userRepository.create({
      description,
      startIp,
      network,
      startIp1,
      reservedIps,
      active

    });

    const savedUser =
      await this.userRepository.save(user);

    return savedUser;
  }

  async update(id: string, ipListDto: IpListDto,): Promise<IpList | null> {

    const IpList = await this.userRepository.findOne({ where: { id: id } });

    if (!IpList) {
      return null; 
    }

    IpList.description = ipListDto.description;
    IpList.startIp = ipListDto.startIp;
    IpList.network = ipListDto.network;
    IpList.startIp1 = ipListDto.startIp1;
    IpList.reservedIps = ipListDto.reservedIps;
    IpList.active = ipListDto.active;


    const updatedIpList = await this.userRepository.save(IpList);
    return updatedIpList;
    

  }

  async delete(id: string): Promise<IpList | null> {

    const IpList = await this.userRepository.findOne({ where: { id: id } });

    if (!IpList) {
      return null; 
    }
    
   await this.userRepository.remove(IpList);  
   return IpList  

  }

  async getAll(): Promise<IpList[]> {
    const IpList = await this.userRepository.find();
    return IpList;
  }
}
