import { Observable, from } from 'rxjs';

export interface getById {
  id: string
}

export interface all {
  all:string;
}
export interface User {
  id: string;
  username: string;
  createdAt:string;
  updatedAt:string;
}
export interface DeleteMsg {
  msg: string;
}
export interface UserCreateDto {
  id:string;
  username: string;
  password: string;
}
export interface UpdateMsg {
  msg: string;
}
export interface UserRegister {
  username:string;
  password:string;
}
export interface UserLogin {
  username:string;
  password:string;
}
export interface UserAll {
  id:string;
  username:string;
  createdAt:string;
  updatedAt:string;
}
export interface UsersService {
  findOne(id: getById): User;
  findAll(all:all): all;
  DeleteOne(id: getById): DeleteMsg;
  UpdateOne(body: UserCreateDto): UpdateMsg;
  register(user:UserRegister):string;
  login(User:UserLogin):string;
}


