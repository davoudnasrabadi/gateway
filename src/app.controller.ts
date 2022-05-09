import { Controller, Get, Param, Post,Body, Delete, Put } from '@nestjs/common';
import { AppService } from './app.service';
import {ValidationPipe} from './myPipe';
import {CreateUserDto} from './Dtos/createDto';
import { identifier } from '@babel/types';
@Controller('users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  getById(@Param('id') id:string) {
    return this.appService.getById(id);
  }

  @Get('/all')
  async getAll(@Param('id') id:string){
    return await this.appService.getAll("all");
  }

  @Post()
  createOne(@Body(new ValidationPipe()) body:CreateUserDto){
    return this.appService.createOne(body);
  }

  @Delete(':id')
  deleteById(@Param('id') id:string){
        return this.appService.deleteById(id);
  }
  @Put(':id')
   updateById(@Param('id') id,@Body(new ValidationPipe()) body:CreateUserDto){
     return this.appService.updateOne(id,body);
   }
}
