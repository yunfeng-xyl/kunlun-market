import { configuration } from "@config/configuration";
import { JwtAuthGuard } from "@guard/jwt-auth.guard";
import { RolesGuard } from "@guard/roles.guard";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { CaptchaService } from "src/services/captcha.service";
import { AppController } from "./app.controller";
import { AdminUserController } from "./modules/admin/admin.controller";
import { AdminUserModule } from "./modules/admin/admin.module";
import { AuthModule } from "./modules/auth/auth.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || "dev"}`,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get("database") as TypeOrmModuleOptions,
      inject: [ConfigService],
    }),
    AdminUserModule,
    AuthModule,
  ],
  controllers: [AppController, AdminUserController],
  providers: [
    CaptchaService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}