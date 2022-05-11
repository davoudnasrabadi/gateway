import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {UsersService} from './interfaces'; 
@Injectable()
export class AppService implements OnModuleInit {
  private userService: UsersService;
  constructor(
    @Inject('USER_SERVICE') private userServiceClient: ClientGrpc
  ) {}
  onModuleInit() {
    this.userService = this.userServiceClient.getService<UsersService>('UsersService');
  }
  async getById(id:string) {
    const data = {id:id}
    return this.userService.findOne(data);
    
  }
  deleteById(id:string) {
    const data = {id:id}
    return this.userService.DeleteOne(data);
  }
  getAll() {
    const all= {
      all:"all"
    }
    return this.userService.findAll(all);
  }
  register(body:any){
    return this.userService.register(body);
  }
  login(body:any){
    return this.userService.login(body);
  }
  updateOne(id:string,body:any){
       const user = {
         id:id,
         username:body.username,
         password:body.password
       }
      return this.userService.UpdateOne(user);
  }
}
