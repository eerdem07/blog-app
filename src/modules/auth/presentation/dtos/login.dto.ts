import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @Transform(({ value }) => {
    return typeof value === 'string' ? value.trim() : value;
  })
  @IsEmail({}, { message: 'please fullfil valid email.' })
  @IsNotEmpty({ message: 'email' })
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
