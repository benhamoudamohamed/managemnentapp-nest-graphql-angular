import { Resolver, Query, Mutation, Args, ID, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UserType } from './dto/user.type';
import { UseGuards } from '@nestjs/common';
import { userAuthGuard } from './shared/auth.guard';
import { UserRole } from './shared/role.enum';
import { Status } from './shared/status.enum';
@Resolver(() => UserType)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserType], { name: 'users'})
  findAll() {
    return this.userService.findAll();
  } 
  
  @Query(() => UserType, { name: 'user' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.userService.findOne(id);
  }

  @Query(() => UserType, { name: 'findUserbyEmail' })
  findUserbyEmail(@Args('email') email: string) {
    return this.userService.findbyEmail(email);
  }

  @Query(() => UserType, { name: 'whoamiUser' })
  @UseGuards(new userAuthGuard())
  whoami(@Context('user') user: User) {
    const { email } = user;
    return this.userService.read(email);;
  }

  @Mutation(() => UserType, { name: 'userRegister'})
  async register(
    @Args('username') username: string,
    @Args('password') password: string,
    @Args('email') email: string,
    @Args('userRole', { type: () => UserRole }) userRole: UserRole,
    @Args('status', { type: () => Status }) status: Status) {
    const user: any = { username, password, email, userRole, status };
    return await this.userService.signUp(user);
  }

  @Mutation(() => UserType, { name: 'updateUser'})
  async update(
    @Args('id', { type: () => ID }) id: string,
    @Args('username') username: string,
    @Args('password') password: string,
    @Args('email') email: string,
    @Args('userRole', { type: () => UserRole }) userRole: UserRole,
    @Args('status', { type: () => Status }) status: Status) {
    const user: any = { username, password, email, userRole, status  };
    return await this.userService.update(id, user);
  }

  @Mutation(() => UserType, { name: 'validateEmail'})
  async validateEmail(
    @Args('id', { type: () => ID }) id: string) {
    return await this.userService.validateEmail(id);
  }

  @Mutation(() => UserType, { name: 'resetPassowrd'})
  async resetPassowrd(
    @Args('email') email: string,
    @Args('password') password: string) {
    const user: any = { email, password };
    return await this.userService.resetPassowrd(email, user);
  }

  @Mutation(() => UserType, {name: 'deleteUser'})
  async delete(@Args('id', { type: () => ID }) id: string) {
    return await this.userService.delete(id);
  }

  @Mutation(() => UserType, { name: 'userLogin'})
  async login(@Args('email') email: string, @Args('password') password: string ) {
    const user: any = { email, password };  
    return await this.userService.signIn(user);
  }
}
