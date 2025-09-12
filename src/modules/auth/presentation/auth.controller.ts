import { Controller, Body, Post } from '@nestjs/common';
import { RegisterRequestDto } from './dtos/register.request.dto';
import { LoginRequestDto } from './dtos/login.request.dto';
import { LoginResponseDto } from './dtos/login.response.dto';
import { AuthService } from '../application/auth.service';
import { RegisterDtoInput } from '../application/dtos/register.dto';
import { LoginDtoInput } from '../application/dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterRequestDto) {
    // Presentation Layer DTO'sunu, Application Layer'ın beklediği saf input verisine map'le.
    // Bu dönüşüm, servis katmanını HTTP'ye özgü DTO'lardan ve class-validator gibi
    // kütüphanelerden koruyarak katmanlar arası sızıntıyı (leaking) engeller.

    const registerDtoInput: RegisterDtoInput = {
      username: registerDto.username,
      password: registerDto.password,
      email: registerDto.email,
    };

    return this.authService.register(registerDtoInput);
  }

  @Post('login')
  login(@Body() loginDto: LoginRequestDto): Promise<LoginResponseDto> {
    const loginDtoInput: LoginDtoInput = {
      email: loginDto.email,
      password: loginDto.password,
    };

    return this.authService.login(loginDtoInput);
  }
}
