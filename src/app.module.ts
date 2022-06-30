import { TypeOrmModule } from "@nestjs/typeorm";
import { Module, CacheModule } from "@nestjs/common";
import * as redisStore from "cache-manager-redis-store";

import { AppController } from "@/app.controller";
import { UserController } from "@/modules/version1/user.controller";
import { SystemController } from "@/modules/version1/system.controller";
import { OrdersController } from "@/modules/version1/orders.controller";
import { CommodityController } from "@/modules/version1/commodity.controller";

import { CommodityEntity } from "@/providers/commodity_entity.providers";
import { UserAccountEntity } from "@/providers/user_account_entity.providers";
import { OrderRecordEntity } from "@/providers/order_record_entity.providers";
import { TransactionRecordEntity } from "@/providers/transaction_record_entity.providers";

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
      database: "orders",
      entities: [
        CommodityEntity,
        UserAccountEntity,
        OrderRecordEntity,
        TransactionRecordEntity,
      ],
      synchronize: true,
    }),
    TypeOrmModule.forRoot({
      port: 3306,
      type: "mysql",
      host: "localhost",
      username: "root",
      password: "",
      database: "user",
      entities: [UserAccountEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([CommodityEntity]),
    TypeOrmModule.forFeature([UserAccountEntity]),
    TypeOrmModule.forFeature([OrderRecordEntity]),
    TypeOrmModule.forFeature([TransactionRecordEntity]),
  ],
  controllers: [
    AppController,
    UserController,
    SystemController,
    OrdersController,
    CommodityController,
  ],
  providers: [AuthService],
})
export class AppModule {}
