import { Controller, Get, Param, Post,Body, Delete, Put, Logger,Req,Inject,UnauthorizedException } from '@nestjs/common';
import { AppService } from './app.service';
import {ValidationPipe} from './myPipe';
import {CreateUserDto} from './Dtos/createDto';
import {AllMsg,UserByIdDto,errorMsg, DeleteMsg,UpdateMsg} from './Dtos/response.dto';
@Controller('users')
export class AppController {

  constructor(private readonly appService: AppService) {}
  private readonly logger = new Logger(AppController.name);
  @Get(':id')
  async getById(@Param('id') id:string,@Req() req):Promise<UserByIdDto | errorMsg>  {
    this.logger.log('Gw request for getting a user');
    try{
      let isValidRequest = await this.appService.validateRequest(req)
      if(!isValidRequest){
        throw new UnauthorizedException('Not allowed')
      }
      return this.appService.getById(id);
    }
    catch(err){
       return {msg:"Not allowed"}
    }
  }

  @Get('')
  async getAll(@Req() req):Promise<AllMsg>{
    this.logger.log('Gw request for getting all users');
    try{
    let isValidRequest = await this.appService.validateRequest(req);
    if(!isValidRequest){
      throw new UnauthorizedException('Not allowed');
    }
    return await this.appService.getAll();
    }
    catch(err){
      return {all:"Not Allowed"}
    }
  }

  @Post('/register')
  createOne(@Body(new ValidationPipe()) body:CreateUserDto):string{
    this.logger.log('Gw request for registering a user');
    return this.appService.register(body);
  }
  @Post('/login')
  login(@Body(new ValidationPipe()) body:CreateUserDto):string{
    this.logger.log('Gw request for login a user');
    return this.appService.login(body);
  }
  @Delete(':id')
  async deleteById(@Req() req,@Param('id') id:string):Promise<DeleteMsg>{
    this.logger.log('Gw request for deleting a user');
    try{
      let isValidRequest = await this.appService.validateRequest(req);
      if(!isValidRequest){
        throw new UnauthorizedException('Not allowed');
      }
        return this.appService.deleteById(id);
    }
    catch(err){
      return {msg:"Not Allowed"}
    }
  }
  @Put(':id')
   async updateById(@Req() req,@Param('id') id,@Body(new ValidationPipe()) body:CreateUserDto):Promise<UpdateMsg>{
    this.logger.log('Gw request for updating a user');
    try{
      let isValidRequest = await this.appService.validateRequest(req);
      if(!isValidRequest){
        throw new UnauthorizedException('Not allowed');
      }
     return this.appService.updateOne(id,body);
    }
    catch(err){
       return {msg:"Not Allowed"}
    }
   }
}
