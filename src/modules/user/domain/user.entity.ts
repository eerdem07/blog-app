import { Role } from './role.vo';

export class User {
  private readonly _id: string;
  private _username: string;
  private _email: string;
  private _passwordHash: string;
  private _role: Role;

  constructor(
    username: string,
    email: string,
    password: string,
    role: Role,
    id?: string,
  ) {
    if (!email.includes('@')) throw new Error('Invalid email address');
    if (password.length < 8)
      throw new Error('Password must be at least 8 characters');

    this._id = id!;
    this._username = username;
    this._email = email;
    this._passwordHash = password;
    this._role = role;
  }

  static create(username: string, email: string, password: string, role: Role) {
    return new User(username, email, password, role);
  }

  static fromPresistence(
    username: string,
    email: string,
    password: string,
    role: Role | string,
    id: string,
  ) {
    return new User(
      username,
      email,
      password,
      role instanceof Role ? role : Role.create(role),
      id,
    );
  }

  get id(): string {
    return this._id;
  }

  get username(): string {
    return this._username;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._passwordHash;
  }

  get role(): Role {
    return this._role;
  }
}

// export class User {
//   private readonly _id: string;
//   private _email: string;
//   private _passwordHash: string;
//   private _role: Role;

//   constructor(email: string, password: string, role: Role, id?: string) {
//     if (!email.includes('@')) throw new Error('Invalid email address');
//     if (password.length < 8)
//       throw new Error('Password must be at least 8 characters');

//     this._id = id!;
//     this._email = email;
//     this._passwordHash = password;
//     this._role = role;
//   }

//   create(email: string, password: string, role: Role) {
//     return new User(email, password, role);
//   }

//   fromPresistence(email: string, password: string, role: Role, id: string) {
//     return new User(email, password, role, id);
//   }

//   get id(): string {
//     return this._id;
//   }

//   get email(): string {
//     return this._email;
//   }

//   get password(): string {
//     return this._passwordHash;
//   }

//   get role(): Role {
//     return this._role;
//   }
// }
