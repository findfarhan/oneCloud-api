import {
  Injectable,
} from '@nestjs/common';
import {
  InventionGridDto
} from './dto';
import { InventionGrid } from './inventionGrid.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class InventionGridService {
  constructor(
    @InjectRepository(InventionGrid)
    private readonly userRepository: Repository<InventionGrid>,
  ) {}

  async add(
    inventionGridDto: InventionGridDto,
  ): Promise<any> {
    const {
      Supervisor,
      Technician,
      AppointmentDate,
      AppointmentDuration,
      Customer,
      Service,
      Priority,
      Reminder,
      Contacts,
      Address,
      EstimatedPrice,
      NotifyCustomer,


    } = inventionGridDto;

    const user = this.userRepository.create({
      Supervisor,
      Technician,
      AppointmentDate,
      AppointmentDuration,
      Customer,
      Service,
      Priority,
      Reminder,
      Contacts,
      Address,
      EstimatedPrice,
      NotifyCustomer,


    });

    const savedUser =
      await this.userRepository.save(user);

    return savedUser;
  }

  async update(id: string, inventionGridDto: InventionGridDto,): Promise<InventionGrid | null> {

    const inventionGrid = await this.userRepository.findOne({ where: { id: id } });

    if (!inventionGrid) {
      return null; 
    }

    inventionGrid.Supervisor = inventionGridDto.Supervisor;
    inventionGrid.Technician = inventionGridDto.Technician;
    inventionGrid.AppointmentDate = inventionGridDto.AppointmentDate;
    inventionGrid.AppointmentDuration = inventionGridDto.AppointmentDuration;
    inventionGrid.Customer = inventionGridDto.Customer;
    inventionGrid.Service = inventionGridDto.Service;
    inventionGrid.Priority = inventionGridDto.Priority;
    inventionGrid.Reminder = inventionGridDto.Reminder;
    inventionGrid.Contacts = inventionGridDto.Contacts;
    inventionGrid.Address = inventionGridDto.Address;
    inventionGrid.EstimatedPrice = inventionGridDto.EstimatedPrice;
    inventionGrid.NotifyCustomer = inventionGridDto.NotifyCustomer;



    const updatedinventionGrid = await this.userRepository.save(inventionGrid);
    return updatedinventionGrid;
    

  }

  async delete(id: string): Promise<InventionGrid | null> {

    const inventionGrid = await this.userRepository.findOne({ where: { id: id } });

    if (!inventionGrid) {
      return null; 
    }
    
   await this.userRepository.remove(inventionGrid);  
   return inventionGrid  

  }

  async getAll(): Promise<InventionGrid[]> {
    const inventionGrid = await this.userRepository.find();
    return inventionGrid;
  }
}
