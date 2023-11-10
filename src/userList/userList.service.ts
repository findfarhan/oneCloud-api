import {
  Injectable,
} from '@nestjs/common';
import {
  AddUserListDto
} from './dto';
import { UserList } from './userList.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserListService {
  constructor(
    @InjectRepository(UserList)
    private readonly userRepository: Repository<UserList>,
  ) {}

  async add(
    addUserListDto: AddUserListDto,
  ): Promise<any> {
    const {
      firstName,
      email,
      partner,
      password,
    } = addUserListDto;

    const user = this.userRepository.create({
      firstName,
      email,
      partner,
      password,

    });

    const savedUser =
      await this.userRepository.save(user);

    return savedUser;
  }

  async update(id: string, addUserListDto: AddUserListDto,): Promise<UserList | null> {

    const userList = await this.userRepository.findOne({ where: { id: id } });

    if (!userList) {
      return null; 
    }

    userList.firstName = addUserListDto.firstName;
    userList.email = addUserListDto.email;
    userList.partner = addUserListDto.partner;
    userList.password = addUserListDto.password;
    
    const updatedPartner = await this.userRepository.save(userList);
    return updatedPartner;
    

  }

  async delete(id: string): Promise<UserList | null> {

    const userList = await this.userRepository.findOne({ where: { id: id } });

    if (!userList) {
      return null; 
    }
    
   await this.userRepository.remove(userList);  
   return userList  

  }

  async getAll(): Promise<UserList[]> {
    const userList = await this.userRepository.find();
    return userList;
  }
}
