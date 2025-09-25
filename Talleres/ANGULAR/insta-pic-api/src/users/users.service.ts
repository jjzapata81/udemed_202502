import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  users : User[] = [
    {id: "0", username: "default", password: "passdefault", email: "default@example.com",
      fullName: "Default User", createdAt: new Date(), updatedAt: new Date(), isActive: true, avatarUrl: '', photos: []},
  ]

  create(createUserDto: CreateUserDto) {

    const newUser : User = {
      id: uuidv4(),
      username: createUserDto.username,
      password: createUserDto.password,
      email: createUserDto.email ?? '',
      fullName: createUserDto.fullName ?? '',
      createdAt: new Date(),
      updatedAt: new Date(),
      avatarUrl: '',
      isActive: true,
    }

    if(this.users.find(u => u.username === newUser.username)) {
      throw new ConflictException('Username already exists');
    }
    this.users.push(newUser);
    return {status: true, message: 'User created successfully'};
  }

  findAll() {
    const activeUsers = this.users.filter(user => user.isActive);
    console.log("--------------")
    this.users.forEach(user => {
      console.log(`USUARIO: ${user.username}, STATUS: ${user.isActive}`);
    });
    console.log("--------------")
    return activeUsers;
  }

  findById(id: string) {
    const user = this.users.find(user => user.id === id);
    if (!user || !user.isActive) {
      throw new NotFoundException('User ID does not exist');
    }
    return user;
  }

  findByUsername(username: string) {
    const user = this.users.find(user => user.username === username);
    if (!user || !user.isActive) {
      throw new NotFoundException('Username does not exist');
    }
    return user;
  }



  update(id: string, updateUserDto: UpdateUserDto) {
    const userIndex = this.users.findIndex(user => user.id === id);
  
    if (userIndex === -1) {
      throw new NotFoundException('User ID does not exist');
    }

    const currentUser = this.users[userIndex];
    const updatedUser = { ...currentUser, ...updateUserDto, updatedAt: new Date() };
    this.users[userIndex] = updatedUser;
    return { status: true, message: 'User updated successfully' };
  }

  remove(id: string) {
    const userIndex = this.users.findIndex(user => user.id === id);

    if (userIndex === -1) {
      throw new NotFoundException('User ID does not exist');
    }

    this.users[userIndex].isActive = false;
    return {status: true, message: 'User deleted successfully'};
  }
}
