import { Observable, from } from 'rxjs';

export interface getById {
  id: string
}


export interface User {
  id: string;
  username: string;
  email: string;
  password: string;

}
export interface DeleteMsg {
  msg: string;
}
export interface UserCreateDto {
  username: string;
  email: string;
  password: string;
}
export interface UpdateMsg {
  msg: string;
}
export interface UsersService {
  findOne(id: getById): User;
  findAll(id: getById): string;
  createOne(body: UserCreateDto): User[];
  DeleteOne(id: getById): DeleteMsg;
  UpdateOne(body: User): UpdateMsg
}

export interface UserRegister {
  username:string;
  password:string;
}
export interface UserLogin {
  username:string;
  password:string;
}
export interface AuthService {
  register(user:UserRegister):string;
  login(User:UserLogin):string;
}