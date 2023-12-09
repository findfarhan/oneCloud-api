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

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtAuthService: JwtAuthService, // Inject JwtAuthService
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authConfig: AuthConfig,
  ) {}

  async checkIfUserExists(
    email: string,
  ): Promise<boolean> {
    const existingUser =
      await this.userRepository.findOne({
        where: { email },
      });
    return !!existingUser; // Returns true if user exists, false otherwise
  }

  async onModuleInit() {
    await this.createDefaultUserIfNotExists();
  }

  async createDefaultUserIfNotExists() {
    const {
      email,
      password,
      name,
      role,
      partner,
    } = this.authConfig;

    const userExists =
      await this.checkIfUserExists(email);
    if (!userExists) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(
        password,
        saltRounds,
      );

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

  async register(
    registrationDto: RegistrationDto,
  ): Promise<any> {
    const {
      email,
      password,
      name,
      role,
      partner,
    } = registrationDto;

    const userExists =
      await this.checkIfUserExists(email);
    if (userExists) {
      throw new ConflictException(
        'User with this email already exists',
      );
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      password,
      saltRounds,
    );

    const user = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      role,
      partner,
    });

    // Save the new user
    const savedUser =
      await this.userRepository.save(user);

    // Generate a JWT token for the newly registered user
    const token =
      await this.jwtAuthService.generateToken(
        savedUser,
      );

    return [savedUser, token];
  }

  async login(loginDto: LoginDto): Promise<any> {
    const { email, password } = loginDto;
    const user =
      await this.userRepository.findOne({
        where: { email },
      });

    if (
      user &&
      (await bcrypt.compare(
        password,
        user.password,
      ))
    ) {
      // Generate a JWT token
      const token =
        await this.jwtAuthService.generateToken(
          user,
        );
      return { user, token }; // Return both user and token
    }
    return null;
  }

  async update(
    id: string,
    registrationDto: RegistrationDto,
  ): Promise<User | null> {
    const userList =
      await this.userRepository.findOne({
        where: { id: id },
      });

    if (!userList) {
      return null;
    }

    userList.name = registrationDto.name;
    userList.email = registrationDto.email;
    userList.partner = registrationDto.partner;
    // Check if a new password is provided and update it securely
    if (registrationDto.password) {
      const hashedPassword = await bcrypt.hash(
        registrationDto.password,
        10,
      );
      userList.password = hashedPassword;
    }
    const updatedUser =
      await this.userRepository.save(userList);
    return updatedUser;
  }

  async delete(id: string): Promise<User | null> {
    const userList =
      await this.userRepository.findOne({
        where: { id: id },
      });

    if (!userList) {
      return null;
    }

    await this.userRepository.remove(userList);
    return userList;
  }

  async getAll(): Promise<User[]> {
    const userList =
      await this.userRepository.find();
    return userList;
  }
}
