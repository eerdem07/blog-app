import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDtoInput } from './dtos/register.dto';
import { LoginDtoInput, LoginDtoOutput } from './dtos/login.dto';
import { UserService } from 'src/modules/user/application/user.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDtoInput: RegisterDtoInput) {
    const isExisting = await this.userService.findOneByEmail(
      registerDtoInput.email,
    );

    if (isExisting) throw new ConflictException('This email already taken!');

    const saltRounds = Number(
      this.configService.get<string | number>('SALT_ROUNDS')!,
    );

    registerDtoInput.password = await bcrypt.hash(
      registerDtoInput.password,
      saltRounds,
    );

    const newUser = await this.userService.create(registerDtoInput);
    return newUser;
  }

  async login(loginDtoInput: LoginDtoInput): Promise<LoginDtoOutput> {
    const user = await this.userService.findOneByEmail(loginDtoInput.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDtoInput.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email,
      roles: user.role,
    };

    const token = this.jwtService.sign(payload, { expiresIn: '15m' });
    return {
      token,
      user: {
        id: user.id!,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    };
  }
}
