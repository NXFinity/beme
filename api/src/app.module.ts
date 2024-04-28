import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import databaseConfig from "./config/database.config";
import securityConfig from "./config/security.config";
import Joi from "joi";
import { DatabaseModule } from "./database/database.module";
import { AuthModule } from "./security/auth/auth.module";
import { UsersModule } from "./api/users/users.module";
import { PermitModule } from "./security/permit/permit.module";
import { BlogsModule } from "./api/blogs/blogs.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      load: [databaseConfig, securityConfig],
      validationSchema: Joi.object({
        // BASIC VALIDATION
        SERVER_ENV: Joi.string()
          .required()
          .valid('development', 'production', 'test')
          .default('development'),
        SERVER_DOMAIN: Joi.string().required(),
        SERVER_PORT: Joi.number().required(),
        ALLOWED_ORIGINS_URL: Joi.string().required(),
        ALLOWED_ORIGINS_LOCAL: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    PermitModule,
    BlogsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
