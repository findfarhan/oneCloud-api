import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './auth.entity';
import { Repository } from 'typeorm';
import { RegistrationDto,LoginDto } from './dto';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(registrationDto: RegistrationDto): Promise<User> {
    const { email } = registrationDto;

    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }
    const user = this.userRepository.create(registrationDto);
    return await this.userRepository.save(user);
  }
  

  async login(loginDto: LoginDto): Promise<User | null> {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOne({ where: { email } });

    if (user && user.password === password) {
      return user;
    }
    return null;
  }
}
