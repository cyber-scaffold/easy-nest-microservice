import { TypeOrmModule } from "@nestjs/typeorm";
import { Module, CacheModule } from "@nestjs/common";
import * as redisStore from "cache-manager-redis-store";

import { AppController } from "@/app.controller";
import { UserController } from "@/modules/version1/user.controller";

import { UserAccountEntity } from "@/providers/user_account_entity.providers";

import { AuthService } from "@/services/version1/auth.service";

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: "localhost",
      port: 6379,
      ttl: 60 * 60 * 1000,
    }),
    TypeOrmModule.forRoot({
      port: 3306,
      type: "mysql",
      host: "localhost",
      username: "root",
      password: "",
      entities: [],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([UserAccountEntity]),
  ],
  controllers: [AppController, UserController],
  providers: [AuthService],
})
export class AppModule {}
