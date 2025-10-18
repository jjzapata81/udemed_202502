/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class UserReposotoryService {
  
  private repo: User[] = [];

  create(user: User): User {
    return {
      ...user,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    };
  }

  save(user: User): User {
    this.repo.push(user);
    return user;
  }

  findAll() {
    return this.repo;
  }

  findBy(username: string) {
    return this.repo.find(user => user.username === username);
  }

  findOne(id: string) {
    return this.repo.find(user => user.id === id)!;
  }

  update(id: string, partialUser: Partial<User>): User | undefined {
    const index = this.repo.findIndex((u) => u.id === id);
    if (index === -1) return undefined;
    this.repo[index] = { ...this.repo[index], ...partialUser };
    return this.repo[index];
  }

}
