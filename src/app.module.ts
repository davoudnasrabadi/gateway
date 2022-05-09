import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
@Module({
  imports: [ClientsModule.register([
    {
      name: 'USER_SERVICE',
      transport: Transport.GRPC,
      options: {
        package: 'users',
        protoPath: join(__dirname, '../src/users.proto'),
      },
    }
  ]),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}