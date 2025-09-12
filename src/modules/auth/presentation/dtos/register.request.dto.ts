import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class RegisterRequestDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(8, {
    message: 'username must be longer then 8 charachters.',
  })
  username: string;

  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  @IsNotEmpty({ message: 'email should not be empty' })
  @IsEmail({}, { message: 'please fullfil valid email' })
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
