import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class RegisterRequestDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(8, {
    message: 'username must be at least 8 characters long.',
  })
  @MaxLength(30, { message: 'username must be at most 30 characters long' })
  username: string;

  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  @IsNotEmpty({ message: 'email should not be empty' })
  @IsEmail({}, { message: 'please provide a valid email' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'password must be at least 8 characters long' })
  password: string;
}
