import {Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import { UserModuleService } from './user-module.service';
import { CreateUserModuleDto } from './dto/create-user-module.dto';
import { UpdateUserModuleDto } from './dto/update-user-module.dto';

@Controller('v1/user')
export class UserModuleController {
  constructor(private readonly userModuleService: UserModuleService) {}

  // CREATE
  @Post('create')
  create(@Body() createUserModuleDto: CreateUserModuleDto) {
    return this.userModuleService.create(createUserModuleDto);
  }

  // READ – obtener todos
  @Get()
  findAll() {
    return this.userModuleService.findAll();
  }

  // READ – obtener uno por UUID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userModuleService.findOne(id);
  }

  // READ – obtener uno por username
  @Get('byUsername/:username')
  findByUsername(@Param('username') username: string) {
    return this.userModuleService.findByUsername(username);
  }

  // UPDATE – recibe cambios en el body
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() changes: UpdateUserModuleDto,
  ) {
    return this.userModuleService.update(id, changes);
  }

  // DELETE – eliminar por UUID
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userModuleService.remove(id);
  }
}
