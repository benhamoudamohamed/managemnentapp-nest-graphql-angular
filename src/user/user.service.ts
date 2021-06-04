import { Injectable, UnauthorizedException, ConflictException, InternalServerErrorException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken'
import { sendEmail } from './shared/sendEmail';
import { Status } from './shared/status.enum';

@Injectable()
export class UserService {
  
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>) { }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<User>  {
    const user = await this.userRepository.findOne({where: {id}});
    if(!user) {
      throw new UnauthorizedException('user not found');
    }
    return user;
  }

  async findbyEmail(email: string): Promise<User>  {
    const user = await this.userRepository.findOne({where: {email}});
    if (!user) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Invalid credentials',
      }, HttpStatus.FORBIDDEN);
    }
    if(user.status !== 'Active') {
      throw new HttpException({
        status: HttpStatus.UNAUTHORIZED,
        error: 'Account Is Not Active',
      }, HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  async read(email: string)  {
    const user = await this.userRepository.findOne({ where: { email }});
    if (!user) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Invalid credentials',
      }, HttpStatus.FORBIDDEN);
    }
    if(user.status !== 'Active') {
      throw new HttpException({
        status: HttpStatus.UNAUTHORIZED,
        error: 'Account Is Not Active',
      }, HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  async signUp(createUserInput: CreateUserInput): Promise<User> {
    const { username, email, password, userRole, status } = createUserInput;
    const user = new User();
    user.username = username;
    user.email = email;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    user.userRole = userRole;
    user.status = status;

    const subject = 'Invitaion';
    const header = 'Activate Your E-mail Address';
    const title = "You've been invited to join our team";
    const subtitle = "To begin please accept this invitation.";
    const buttonTitle = 'Accept';

    try {
      await this.userRepository.save(user);

      const user1 = await this.userRepository.findOne({where: {email}});
      if(!user1) {
        throw new UnauthorizedException('user not found');
      }
      const link = 'users/activate/' 
      const userId = user.id
      console.log(link)
     
      await sendEmail(subject, user1.email, user1.username, header, title, subtitle, link, userId, buttonTitle)
      return user;

    } catch(error) {
      if(error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Username already exists')
      } else {
        throw new InternalServerErrorException()
      } 
    }
  } 

  async update(id: string, data: CreateUserInput): Promise<User> {
    const { username, email, password, userRole, status } = data;

    let user = await this.userRepository.findOne({ where: {id}});
    if(!user) {
      throw new UnauthorizedException('user not found');
    }

    const user1 = new User();
    user1.username = username;
    user1.email = email;
    user1.userRole = userRole;
    user1.status = status;
    user1.salt = await bcrypt.genSalt();
    user1.password = await this.hashPassword(password, user1.salt);

    const subject = 'Profile updated';
    const header = 'Profile updated';
    const title = "You've been updating your profile";
    const subtitle = 'If you believe this is an error, please contact administration';
    const buttonTitle = 'Login';
    const link = 'login'
    const userId = ''
 
    await sendEmail(subject, user1.email, user1.username, header, title, subtitle, link, userId, buttonTitle)
    await this.userRepository.update({ id }, {...user1});
    user = await this.userRepository.findOne({ where: {id}});
    return user;
  }

  async validateEmail(id: string): Promise<User> {

    let user = await this.userRepository.findOne({ where: {id}});
    if(!user) {
      throw new UnauthorizedException('user not found');
    }
 
    const email = user.email;
    const username = user.username;

    const user1 = new User();
    user1.status = Status.Active;

    const subject = 'Activation';
    const header = "Your Account Is Activated";
    const title = 'Please Set Your Password';
    const subtitle = '';
    const buttonTitle = 'Set Password';
    const link = 'users/reset'
    const userId = ''

    await sendEmail(subject, email, username, header, title, subtitle, link, userId, buttonTitle)
    await this.userRepository.update({ id }, {...user1});
    user = await this.userRepository.findOne({ where: {id}});
    return user;
  }

  async resetPassowrd(email: string, data: CreateUserInput): Promise<User> {
    const { password } = data;

    let user = await this.userRepository.findOne({ where: {email}});
    if(!user) {
      throw new UnauthorizedException('user not found');
    }

    if(user.status !== 'Active') {
      throw new HttpException({
        status: HttpStatus.UNAUTHORIZED,
        error: 'Account Is Not Active',
      }, HttpStatus.UNAUTHORIZED);
    }

    const user1 = new User();  
    user1.salt = await bcrypt.genSalt();
    user1.password = await this.hashPassword(password, user1.salt);

    const subject = 'Changed Password';
    const header = 'Changed Password';
    const title = 'Your login password has been changed';
    const subtitle = 'If you believe this is an error, please contact administration';
    const buttonTitle = 'Login';
    const link = 'login'
    const userId = ''

    await this.userRepository.update({ email }, {...user1});
    await sendEmail(subject, user.email, user.username, header, title, subtitle, link, userId, buttonTitle)

    user = await this.userRepository.findOne({ where: {email}});
    return user;
  }

  async signIn(createUserInput: CreateUserInput): Promise<any> {
    const { email, status } = createUserInput;
    const user = await this.userRepository.findOne({ where: { email } });
    const userPass = await this.validateUserPassword(createUserInput)
    if (!user || !userPass) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Invalid credentials',
      }, HttpStatus.FORBIDDEN);
    }
    if(user.status !== 'Active') {
      throw new HttpException({
        status: HttpStatus.UNAUTHORIZED,
        error: 'Account Is Not Active',
      }, HttpStatus.UNAUTHORIZED);
    }

    const payload = { id: user.id, email: user.email, userRole: user.userRole } ;
    const token = jwt.sign( payload , 'topSecret', {expiresIn: '1d'});
    return { token };
  }

  async delete(id: string): Promise<User> {
    const user: any = await this.userRepository.findOne({ where: {id}});
    if(!user) {
      throw new UnauthorizedException('user not found');
    }
    await this.userRepository.delete(id);
    return user;
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async validateUserPassword(createUserInput: CreateUserInput): Promise<string>  {
    const { email, password } = createUserInput;
    const user = await this.userRepository.findOne({email});
    if(user && await user.validatePassword(password)) { 
      return user.email;
    } else {
      return null;
    }
  }
}
