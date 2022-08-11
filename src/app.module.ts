import { TypeOrmModule } from "@nestjs/typeorm";
import { Module, CacheModule } from "@nestjs/common";

import { AppController } from "@/app.controller";
import { UserController } from "@/modules/version1/user.controller";

import { AdminUserEntity } from "@/providers/admin_user.providers";

import { AuthService } from "@/services/version1/auth.service";
import config from "@/configs/";

@Module({
  imports: [
    CacheModule.register(config.cache_module_config),
    TypeOrmModule.forRoot({
      ...config.mysql_module_config,
      entities: [AdminUserEntity],
    }),
    TypeOrmModule.forFeature([AdminUserEntity]),
  ],
  controllers: [AppController, UserController],
  providers: [AuthService],
})
export class AppModule {}
