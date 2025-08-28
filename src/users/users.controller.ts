import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe, ValidationPipe} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users') //handles users route
export class UsersController {
constructor(private readonly usersService: UsersService) {}


// GET /users - get all users



//From here to the next comment, ...........
//@Get()
//findAll() {
//    return this.usersService.findAll(role);
//}
//From here to the next comment, ...........



//QUERY: /users?role=value - get users by role
//user
@Get()
// findByQuery(@Query('role') role: string) {
findByQuery(@Query('role') role?: 'admin' | 'user' | 'guest') {

    return this.usersService.findAll(role);
}


//GET /users/interns - get all interns
// @Get('interns')
// findAllInterns() {
//     return []
// }

 //GET /users/:id - get user by id
 @Get(':id')
 findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
 }




 // POST /users - create a new user
 //the 'user' parameter is decorated with @Body() to indicate that it should be populated with the data from the request body.
 // it is typed as an empty object {} for simplicity, but in a real application, you would typically define a specific DTO (Data Transfer Object) class or interface to represent the structure of the user data being sent in the request.
 // this method simply returns the received user data as it is.
@Post()
create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
}




 // PATCH /users/:id - update user by id

//  @Patch(':id')
//  update(@Param('id', ParseIntPipe) id: number, 
//  @Body(ValidationPipe) updateUserDto): UpdateUserDto {
//     return this.usersService.update(id, updateUserDto)
//  }
 @Patch(':id')
update(
  @Param('id', ParseIntPipe) id: number,
  @Body(ValidationPipe) updateUserDto: UpdateUserDto
) {
  return this.usersService.update(id, updateUserDto);
}





 // DELETE /users/:id - delete user by id
 @Delete(':id')
 delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id)
 }





}

