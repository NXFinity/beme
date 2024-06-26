import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      usernameField: 'username',
      emailField: 'email',
      passwordField: 'password',
    });
  }
  async validate(
    username: string,
    email: string,
    password: string,
  ): Promise<any> {
    return { username, email, password };
  }
}
