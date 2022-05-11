import { Controller, Get, Param, Post,Body, Delete, Put, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import {ValidationPipe} from './myPipe';
import {CreateUserDto} from './Dtos/createDto';
import { identifier } from '@babel/types';
import {AllMsg,UserByIdDto,errorMsg, DeleteMsg,UpdateMsg} from './Dtos/response.dto';
import { tokenDto } from './Dtos/response.dto';
@Controller('users')
export class AppController {
  constructor(private readonly appService: AppService) {}
  private readonly logger = new Logger(AppController.name);
  @Get(':id')
  getById(@Param('id') id:string):Promise<UserByIdDto | errorMsg>  {
    return this.appService.getById(id);
  }

  @Get('')
  async getAll():Promise<AllMsg>{
    this.logger.log('Gw request for getting all users');
    return await this.appService.getAll();
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
  deleteById(@Param('id') id:string):DeleteMsg{
    this.logger.log('Gw request for deleting a user');
        return this.appService.deleteById(id);
  }
  @Put(':id')
   updateById(@Param('id') id,@Body(new ValidationPipe()) body:CreateUserDto):UpdateMsg{
    this.logger.log('Gw request for updating a user');
     return this.appService.updateOne(id,body);
   }
}
