import { ConflictException, Injectable } from "@nestjs/common";
import { AddUserDto } from './dto';
import { Home } from './user.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";


@Injectable()
export class HomeService{

    constructor(
        @InjectRepository(Home)
        private readonly userRepository: Repository<Home>,
      ) {}

    async add(
        addUserDto: AddUserDto,
      ): Promise<any> {
        const {service, customer, address,billing,issue } = addUserDto;
        
        const user = this.userRepository.create({
            service, customer, address,billing,issue
        });
            const savedUser = await this.userRepository.save(user);
    
    
        return savedUser;
      }
}