import { Injectable } from '@nestjs/common';
import { EditoProfileDto } from './dto';
import { EditorProfile } from './editorProfile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EditorProfileService {
  constructor(
    @InjectRepository(EditorProfile)
    private readonly userRepository: Repository<EditorProfile>,
  ) {}

  async add(
    editoProfileDto: EditoProfileDto,
  ): Promise<any> {
    const {
      BackendDescription,
      Descriptioninvoice,
      Service,
      Type,
      LineTechnicalProfile,
      BandPeakDown,
      BandaPiccoUP,
      PriceMonthly,
      RadiusServiceId,
      CommunicationCode,
      Partner,
      Business,
      active,
    } = editoProfileDto;

    const user = this.userRepository.create({
      BackendDescription,
      Descriptioninvoice,
      Service,
      Type,
      LineTechnicalProfile,
      BandPeakDown,
      BandaPiccoUP,
      PriceMonthly,
      RadiusServiceId,
      CommunicationCode,
      Partner,
      Business,
      active,
    });

    const savedUser =
      await this.userRepository.save(user);

    return savedUser;
  }

  async update(
    id: string,
    editoProfileDto: EditoProfileDto,
  ): Promise<EditorProfile | null> {
    const editoProfile =
      await this.userRepository.findOne({
        where: { id: id },
      });

    if (!editoProfile) {
      return null;
    }

    editoProfile.BackendDescription =
      editoProfileDto.BackendDescription;
    editoProfile.Descriptioninvoice =
      editoProfileDto.Descriptioninvoice;
    editoProfile.Service =
      editoProfileDto.Service;
    editoProfile.Type = editoProfileDto.Type;
    editoProfile.LineTechnicalProfile =
      editoProfileDto.LineTechnicalProfile;
    editoProfile.BandPeakDown =
      editoProfileDto.BandPeakDown;
    editoProfile.BandaPiccoUP =
      editoProfileDto.BandaPiccoUP;
    editoProfile.PriceMonthly =
      editoProfileDto.PriceMonthly;

    editoProfile.RadiusServiceId =
      editoProfileDto.RadiusServiceId;
    editoProfile.CommunicationCode =
      editoProfileDto.CommunicationCode;
    editoProfile.Partner =
      editoProfileDto.Partner;
    editoProfile.Business =
      editoProfileDto.Business;
    editoProfile.active = editoProfileDto.active;

    const updatededitoProfile =
      await this.userRepository.save(
        editoProfile,
      );
    return updatededitoProfile;
  }

  async delete(
    id: string,
  ): Promise<EditorProfile | null> {
    const editoProfile =
      await this.userRepository.findOne({
        where: { id: id },
      });

    if (!editoProfile) {
      return null;
    }

    await this.userRepository.remove(
      editoProfile,
    );
    return editoProfile;
  }

  async getAll(): Promise<EditorProfile[]> {
    const editoProfile =
      await this.userRepository.find();
    return editoProfile;
  }
}
