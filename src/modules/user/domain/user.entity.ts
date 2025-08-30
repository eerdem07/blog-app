import { Role } from "./role.vo";

export class User {
  constructor(
    private _username: string,
    private _email: string,
    private _password: string,
    private _role:Role,
    private _id?: string,
  ) {
    if(!_email.includes('@')){
      throw new Error('Invalid email address')
    }

    if(_password.length < 8){
      throw new Error('Password must be at least 8 characters')
    }
  }

  get id(): string | undefined {
    return this._id;
  }

  get email(): string {
    return this._email;
  }

  get username(): string {
    return this._username;
  }

  get password(): string {
    return this._password;
  }
  
  get role():Role {
    return this._role;
  }

  // changeEmail(){}
  // changePassowrd(){}
}
