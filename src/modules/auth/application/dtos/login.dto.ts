import { Role } from "src/modules/user/domain/role.vo";

export type LoginDtoInput = {
  email: string;
  password: string;
};

export type LoginDtoOutput = {
  token: string;
  user: {
    id?: string;
    username: string;
    email: string;
    role:Role;
  };
};
