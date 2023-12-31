import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'key',
      signOptions: {
        expiresIn: '600000s',
      },
    }),
  ],
  providers: [AuthService,JwtStrategy],
  exports:[AuthService]
})
export class AuthModule {}
