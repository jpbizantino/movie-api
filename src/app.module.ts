import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { configLoader } from './config/config-loader';
import { configSchema } from './config/config-schema';
import { RolesModule } from './roles/roles.module';
import { RolesPermissionsModule } from './roles-permissions/roles-permissions.module';
import { PermissionsModule } from './permissions/permissions.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configLoader],
      validationSchema: configSchema,
    }),
    AuthModule,
    UsersModule,
    RolesPermissionsModule,
    RolesModule,
    PermissionsModule,
    PrismaModule,
    ReviewsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
