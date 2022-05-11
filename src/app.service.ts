import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {UsersService} from './interfaces'; 
import {AllMsg,errorMsg,UserByIdDto, DeleteMsg,UpdateMsg} from './Dtos/response.dto';
@Injectable()
export class AppService implements OnModuleInit {
  private userService: UsersService;
  constructor(
    @Inject('USER_SERVICE') private userServiceClient: ClientGrpc
  ) {}
  onModuleInit() {
    this.userService = this.userServiceClient.getService<UsersService>('UsersService');
  }
  async getById(id:string):Promise<UserByIdDto | errorMsg> {
    const data = {id:id}
    return this.userService.findOne(data);
    
  }
  deleteById(id:string):DeleteMsg {
    const data = {id:id}
    return this.userService.DeleteOne(data);
  }
  getAll():AllMsg {
    const all= {
      all:"all"
    }
    return this.userService.findAll(all);
  }
  register(body:any):string{
    return this.userService.register(body);
  }
  login(body:any):string{
    return this.userService.login(body);
  }
  updateOne(id:string,body:any):UpdateMsg{
       const user = {
         id:id,
         username:body.username,
         password:body.password
       }
      return this.userService.UpdateOne(user);
  }
}
