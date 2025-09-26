import { v4 as uuidv4 } from 'uuid';

export class CreateUserDto {
       id = uuidv4();
        username: '';
        password: '';
        email: '';
        name: '';

 
}
