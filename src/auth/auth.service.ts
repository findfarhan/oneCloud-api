/* eslint-disable prettier/prettier */
import {
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './auth.entity';
import { Repository } from 'typeorm';
import { RegistrationDto, LoginDto } from './dto';
import * as bcrypt from 'bcrypt';
import { JwtAuthService } from './jwt-auth.service';
import { AuthConfig } from './auth.config';

const SALT_ROUNDS = 10;

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtAuthService: JwtAuthService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authConfig: AuthConfig,
  ) {}

  async checkIfUserExists(email: string): Promise<boolean> {
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    return !!existingUser;
  }

  async onModuleInit() {
    await this.createDefaultUserIfNotExists();
  }

  private async createDefaultUserIfNotExists() {
    const { email, password, name, role, partner } = this.authConfig;

    const userExists = await this.checkIfUserExists(email);
    if (!userExists) {
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

      const user = this.userRepository.create({
        name,
        email,
        password: hashedPassword,
        role,
        partner,
      });

      await this.userRepository.save(user);
    }
  }

  async register(registrationDto: RegistrationDto): Promise<any> {
    const { email, password, name, role, partner } = registrationDto;

    const userExists = await this.checkIfUserExists(email);
    if (userExists) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      role,
      partner,
    });

    const savedUser = await this.saveUser(user);
    const token = await this.jwtAuthService.generateToken(savedUser);

    return { user: savedUser, token };
  }

  async login(loginDto: LoginDto): Promise<any> {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOne({ where: { email } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = await this.jwtAuthService.generateToken(user);
      return { user, token };
    }

    return null;
  }

  async update(id: string, registrationDto: RegistrationDto): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      return null;
    }

    user.name = registrationDto.name;
    user.email = registrationDto.email;
    user.partner = registrationDto.partner;

    if (registrationDto.password) {
      user.password = await bcrypt.hash(registrationDto.password, SALT_ROUNDS);
    }

    const updatedUser = await this.saveUser(user);
    return updatedUser;
  }

  async delete(id: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      return null;
    }

    await this.userRepository.remove(user);
    return user;
  }

  async getAll(): Promise<User[]> {
    const userList = await this.userRepository.find();
    return userList;
  }

  private async saveUser(user: User): Promise<User> {
    try {
      return await this.userRepository.save(user);
    } catch (error) {
      // Handle database save errors here
      throw new Error('Error saving user to the database');
    }
  }
}
