import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/resource/users/entities/user.entity';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(payload: User): string {
    let expiresIn: any = 1e5;

    return this.jwtService.sign(
      { id: payload.id, email: payload.email },
      { expiresIn },
    );
  }

  decodeToken(token: string): any {
    return this.jwtService.verify(token);
  }

  hashPassword(password: string): string | Promise<string> {
    return bcrypt.hash(password, 10);
  }

  comparePassword(
    password: string,
    hashPassword: string,
  ): boolean | Promise<boolean> {
    return bcrypt.compare(password, hashPassword);
  }

  generateTempToken(payload: User): string {
    const expiresIn = '15 m';
    return this.jwtService.sign(
      { id: payload.id, email: payload.email },
      { expiresIn },
    );
  }
}
