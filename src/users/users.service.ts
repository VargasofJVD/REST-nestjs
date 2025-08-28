import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {

    
    /*
    before
    private users = [
        { id: 1, name: 'Alice', role: 'admin' },
        { id: 2, name: 'Bob', role: 'user' },
        { id: 3, name: 'Charlie', role: 'guest' },
        { id: 4, name: 'David', role: 'user' },
        { id: 5, name: 'Eve', role: 'admin' },
    ];
    */




    private users = [
        { id: 1, name: 'Alice', email: 'alice@gmail.com', role: 'admin' },
        { id: 2, name: 'Bob', email: 'bob@gmail.com', role: 'user' },
        { id: 3, name: 'Charlie', email: 'charlie@gmail.com', role: 'guest' },
        { id: 4, name: 'David', email: 'david@gmail.com', role: 'user' },
        { id: 5, name: 'Eve', email: 'eve@gmail.com', role: 'admin' },
    ];

    findAll(role?: 'admin' | 'user' | 'guest'){
        if(role){
            const rolesArray = this.users.filter(user => user.role === role)
            if (rolesArray.length === 0) throw new NotFoundException(`No users with role ${role} found`)
            return rolesArray
        }
        return this.users
    }

    findOne(id: number){
        const user = this.users.find(user => user.id === id)
        if (!user){
            throw new NotFoundException(`User with ID ${id} not found`)
        }
        return user
    }

    create(createUserDto: CreateUserDto){
        const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id)
        const newUser = { id: usersByHighestId[0].id + 1, ...createUserDto }
        this.users.push(newUser)
        return newUser
    }

    update(id: number, updateUserDto: UpdateUserDto){
        this.users = this.users.map(user => {
            if (user.id === id){
                return { ...user, ...updateUserDto}
            }
            return user
        })
        return this.findOne(id)
    }

    delete(id: number){
        const removedUser = this.findOne(id)
        this.users = this.users.filter(user => user.id !== id)
        return removedUser
    }




}
