import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  async registerUser(createUserDto: CreateUserDto) {
    const hashPassword = await this.authService.hashPassword(
      createUserDto.password,
    );

    Object.assign(createUserDto, { password: hashPassword });

    const user = await this.userRepository.save(createUserDto);

    const token = this.authService.generateToken(user);

    return {
      email: user.email,
      id: user.id,
      token,
    };
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const user = await this.userRepository.findOne({
      where: { email: loginUserDto.email },
    });

    if (!user) throw new BadRequestException('invalid credentials');

    const isPasswordMatched = await this.authService.comparePassword(
      loginUserDto.password,
      user.password,
    );

    if (!isPasswordMatched)
      throw new BadRequestException('invalid credentials');

    const token = this.authService.generateToken(user);

    return {
      email: user.email,
      id: user.id,
      token,
    };
  }

  async isUniqueUser(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) return true;

    return false;
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id: id } });
  }
}
