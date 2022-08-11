import * as jwt from "jsonwebtoken";
import { InjectRepository } from "@nestjs/typeorm";
import { Inject, Injectable, CACHE_MANAGER } from "@nestjs/common";

import { AdminUserEntity } from "@/providers/admin_user.providers";

import config from "@/configs";

@Injectable()
export class AuthService {
  constructor(
    @Inject(CACHE_MANAGER) private redis_cache,
    @InjectRepository(AdminUserEntity) private admin_user,
  ) {}

  /** 缓存用户信息并返回令牌信息 **/
  async cacheUserInfoAndReturnAuth(login_id, username) {
    /* prettier-ignore */
    const jwt_string = await jwt.sign(login_id,config.jwt_secret,{ expiresIn: "1 days" });
    const user_info = await this.admin_user.findOneBy({ username });
    await this.redis_cache.set(login_id, username);
    await this.redis_cache.set(username, user_info);
    return jwt_string;
  }

  /** 根据token令牌获取用户详情 **/
  async getAutoInfoByToken(API_TOKEN) {
    const { login_id } = await jwt.verify(API_TOKEN, config.jwt_secret);
    const username = await this.redis_cache.get(login_id);
    const user_info = await this.redis_cache.get(username);
    return user_info;
  }

  /** 清空用户信息 **/
  async clear_login_info(API_TOKEN) {
    const { login_id } = await jwt.verify(API_TOKEN, config.jwt_secret);
    const username = await this.redis_cache.get(login_id);
    await this.redis_cache.del(login_id);
    await this.redis_cache.del(username);
  }
}
