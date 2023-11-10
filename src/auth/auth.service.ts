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

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtAuthService: JwtAuthService, // Inject JwtAuthService
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(
    registrationDto: RegistrationDto,
  ): Promise<any> {
    const { email, password, name,role } = registrationDto;

    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash the user's password before saving it
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    // Save the new user
    const savedUser = await this.userRepository.save(user);

    // Generate a JWT token for the newly registered user
    const token = await this.jwtAuthService.generateToken(savedUser);

    return { user: savedUser, token };
  }

  async login(loginDto: LoginDto): Promise<any> {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOne({ where: { email } });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Generate a JWT token
      const token = await this.jwtAuthService.generateToken(user);
      return { user, token }; // Return both user and token
    }
    return null;
  }
}
