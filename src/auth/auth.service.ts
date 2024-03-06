import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { AuthEntity } from './entity/auth.entity';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
    private roleService: RolesService,
  ) {}

  async validateUser(email: string, password: string): Promise<AuthEntity> {
    // Step 1: Fetch a user with the given email
    const user = await this.userService.findByEmail(email);

    // If no user is found, throw an error
    if (!user.userId) {
      throw new NotFoundException(`Incorrect email or password.`);
    }

    // Step 2: Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If password does not match, throw an error
    if (!isPasswordValid) {
      throw new UnauthorizedException('Incorrect email or password.');
    }

    // Get user roles
    const roles = await this.roleService.findByUserId(user.userId);

    const token = await this.jwtService.signAsync({ userId: user.userId });

    // Step 3: Generate a JWT containing the user's ID and return it
    return {
      token,
      user,
      roles,
    };
  }
}
