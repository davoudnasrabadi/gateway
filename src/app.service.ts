import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {UsersService} from './interfaces'; 
import {AuthService} from './interfaces';
@Injectable()
export class AppService implements OnModuleInit {
  private userService: UsersService;
  private authService: AuthService;
  constructor(
    @Inject('USER_SERVICE') private userServiceClient: ClientGrpc,
    @Inject('AuthService') private authServiceClinet:ClientGrpc
  ) {}
  onModuleInit() {
    this.userService = this.userServiceClient.getService<UsersService>('UsersService');
    this.authService = this.authServiceClinet.getService<AuthService>('AuthService');
  }
  async getById(id:string) {
    if(id!= 'all'){
    const data = {id:id}
    return this.userService.findOne(data);
    }
    else {
      const data= {id:'all'}
      return this.userService.findAll(data);
    
    }
    
  }
  deleteById(id:string) {
    const data = {id:id}
    return this.userService.DeleteOne(data);
  }
  getAll(data:any) {
    return this.userService.findAll(data);
  }
  register(body:any){
    return this.authService.register(body);
  }
  login(body:any){
    return this.authService.login(body);
  }
  updateOne(id:string,body:any){
       const user = {
         id:id,
         username:body.username,
         email:body.email,
         password:body.password
       }
      return this.userService.UpdateOne(user);
  }
}
