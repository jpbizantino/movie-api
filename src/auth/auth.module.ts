import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    ConfigModule.forRoot(),
    UsersModule,
    RolesModule,
    JwtModule.registerAsync({
      imports: [ConfigModule], // Import ConfigModule for ConfigService
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '30m' }, // e.g. 30s, 7d, 24h,30m
      }),

      inject: [ConfigService], // Inject the ConfigService to access the configuration
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
