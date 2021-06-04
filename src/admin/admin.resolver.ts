import { Resolver, Query, Mutation, Args, ID, Context } from '@nestjs/graphql';
import { AdminService } from './admin.service';
import { CreateAdminInput } from './dto/create-admin.input';
import { UpdateAdminInput } from './dto/update-admin.input';
import { AdminType } from './dto/admin.type';
import { Admin } from './entities/admin.entity';
import { UseGuards } from '@nestjs/common';
import { AdminAuthGuard } from './auth.guard';

@Resolver(() => AdminType)
export class AdminResolver {
  constructor(private readonly adminService: AdminService) {}

  @Query(() => [AdminType], { name: 'admins' })
  findAll() {
    return this.adminService.findAll();
  } 

  @Query(() => AdminType, { name: 'admin' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.adminService.findOne(id);
  }


  @Query(() => AdminType, { name: 'whoamiAdmin' })
  @UseGuards(new AdminAuthGuard())
  whoami(@Context('admin') admin: Admin) {
    const { username } = admin;
    return this.adminService.read(username);;
  }

  @Mutation(() => AdminType, { name: 'adminRegister' })
  async register(@Args('firstname') firstname: string, @Args('lastname') lastname: string, @Args('username') username: string, @Args('password') password: string) {
    const admin: any = { firstname, lastname, username, password };
    return await this.adminService.signUp(admin);
  }

  @Mutation(() => AdminType, { name: 'adminLogin' })
  async login(@Args('username') username: string, @Args('password') password: string) {
    const admin: any = { username, password };
    return await this.adminService.signIn(admin);
  }
}
