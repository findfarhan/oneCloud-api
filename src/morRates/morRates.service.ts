import {
  Injectable,
} from '@nestjs/common';
import {
MorRatesDto} from './dto';
import { MorRates } from './morRates.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MorRatesService {
  constructor(
    @InjectRepository(MorRates)
    private readonly userRepository: Repository<MorRates>,
  ) {}

  async add(
    morRatesDto: MorRatesDto,
  ): Promise<any> {
    const {
      BackendDescription,
      Descriptioninvoice,
      MORID,
      Service,
      CommunicationCode,
      Isnap,
      ITfixed,
      ITfurniture,
      FixedEU,
      EUfurniture,
      FixedWorld,
      WorldFurniture,
      active

    } = morRatesDto;

    const user = this.userRepository.create({
      BackendDescription,
      Descriptioninvoice,
      MORID,
      Service,
      CommunicationCode,
      Isnap,
      ITfixed,
      ITfurniture,
      FixedEU,
      EUfurniture,
      FixedWorld,
      WorldFurniture,
      active


    });

    const savedUser =
      await this.userRepository.save(user);

    return savedUser;
  }

  async update(id: string, morRatesDto: MorRatesDto,): Promise<MorRates | null> {

    const MorRates = await this.userRepository.findOne({ where: { id: id } });

    if (!MorRates) {
      return null; 
    }

    MorRates.BackendDescription =
    morRatesDto.BackendDescription;
      MorRates.Descriptioninvoice =
      morRatesDto.Descriptioninvoice;
      MorRates.Service =
      morRatesDto.Service;
      MorRates.MORID = morRatesDto.MORID;
      MorRates.CommunicationCode =
      morRatesDto.CommunicationCode;
      MorRates.Isnap =
      morRatesDto.Isnap;
      MorRates.ITfixed =
      morRatesDto.ITfixed;
      MorRates.ITfurniture =
      morRatesDto.ITfurniture;

      MorRates.FixedEU =
      morRatesDto.FixedEU;
      MorRates.EUfurniture =
      morRatesDto.EUfurniture;
      MorRates.FixedWorld =
      morRatesDto.FixedWorld;
      MorRates.WorldFurniture =
      morRatesDto.WorldFurniture;
      MorRates.active = morRatesDto.active;


    const updatedMorRates = await this.userRepository.save(MorRates);
    return updatedMorRates;
    

  }

  async delete(id: string): Promise<MorRates | null> {

    const MorRates = await this.userRepository.findOne({ where: { id: id } });

    if (!MorRates) {
      return null; 
    }
    
   await this.userRepository.remove(MorRates);  
   return MorRates  

  }

  async getAll(): Promise<MorRates[]> {
    const MorRates = await this.userRepository.find();
    return MorRates;
  }
}
