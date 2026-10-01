import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwt: JwtService) {}

  async login({ username, password }: LoginDto) {
    if (username !== 'johndoe' || password !== 'susiairtest') {
      throw new UnauthorizedException('Invalid username or password');
    }

    return { token: await this.jwt.signAsync({ sub: username }) };
  }
}
