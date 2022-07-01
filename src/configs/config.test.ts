import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as redisStore from "cache-manager-redis-store";

export const jwt_secret = "local_jwt_secret";
export const cache_module_config = {
  store: redisStore,
  host: "test_redis_service",
  port: 6379,
  ttl: 60 * 60 * 1000,
};
export const mysql_module_config: TypeOrmModuleOptions = {
  port: 3306,
  type: "mysql",
  host: "test_mysql_service",
  username: "root",
  password: "glyz205070410",
  entities: [],
  synchronize: true,
};
