import { HttpCode, Inject, Injectable, OnModuleInit, Req } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {UsersService} from './interfaces'; 
import {AllMsg,errorMsg,UserByIdDto, DeleteMsg,UpdateMsg} from './Dtos/response.dto';
import jwt_decode from 'jwt-decode';
import {Token} from './Dtos/token.interface'
import { type } from 'os';
import { Observable } from 'rxjs';
import axios from 'axios';

@Injectable()
export class AppService implements OnModuleInit {
  private userService: UsersService;
  constructor(
    @Inject('USER_SERVICE') private userServiceClient: ClientGrpc
  ) {}
  onModuleInit() {
    this.userService = this.userServiceClient.getService<UsersService>('UsersService');
  }
  async getById(id:string):Promise<any> {
    const data = {id:id}
    return this.userService.findOne(data);
  }

   async getByIdForJwt(id:string):Promise<boolean>{
     const observable = await this.getById(id) as Observable<any>;
     const promise = observable.toPromise();
     const data:UserByIdDto = await promise;
     if(data?.id !== undefined){
       return true;
     }
     return false;
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
   async  validateRequest(@Req() req):Promise<boolean>{
    const token=req.headers['authorization'].split(' ')[1];
    const decoded:Token = jwt_decode(token);
    const now = Date.now().valueOf() / 1000;
    if(!decoded.exp || !decoded.iat || !decoded.id || !decoded.username){
      return false;
    }
    if(decoded.exp <now){
      return false;
    }
    const id = decoded.id.toString();
    const isUser = await this.getByIdForJwt(id);
    return isUser;
    
  }
}
