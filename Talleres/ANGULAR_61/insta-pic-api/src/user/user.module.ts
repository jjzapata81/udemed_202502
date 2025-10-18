/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
//import { TypeOrmModule } from '@nestjs/typeorm';
//import { User } from './entities/user.entity';
import { UserReposotoryService } from './repository/user-reposotory.service';

@Module({
  //imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, UserReposotoryService],
  exports: [UserService, UserReposotoryService],
})
export class UserModule {}
