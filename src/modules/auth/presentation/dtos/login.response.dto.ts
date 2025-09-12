import { Role } from 'src/modules/user/domain/role.vo';

export class LoginResponseDto {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
    role: Role;
  };
}
