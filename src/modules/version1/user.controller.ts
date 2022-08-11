import { v4 as uuidv4 } from "uuid";
import { InjectRepository } from "@nestjs/typeorm";
/*  prettier-ignore */
import { Controller ,Get, Post, Request, Response } from "@nestjs/common";

import { AdminUserEntity } from "@/providers/admin_user.providers";
import { AuthService } from "@/services/version1/auth.service";

@Controller("/user/v1/")
export class UserController {
  constructor(
    private auth: AuthService,
    @InjectRepository(AdminUserEntity) private admin_user,
  ) {}

  @Post("login")
  async login(@Request() request, @Response({ passthrough: true }) response) {
    const { username, password } = request.body;
    const user_info = await this.admin_user.findOneBy({ username });
    if (!user_info) {
      throw new Error("无效的凭据!");
    }
    if (user_info.password !== password) {
      throw new Error("无效的凭据!");
    }
    const login_id = uuidv4();
    /** 在缓存中记录用户的信息 **/
    /* prettier-ignore */
    const jwt_string = await this.auth.cacheUserInfoAndReturnAuth(login_id,username);
    /** 向前端注入cookie **/
    await response.cookie("API_TOKEN", jwt_string, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    /** 返回令牌 **/
    return jwt_string;
  }

  @Post("logout")
  async logout(@Request() request, @Response({ passthrough: true }) response) {
    const { API_TOKEN } = request.cookies;
    /** 清空redis缓存信息 **/
    await this.auth.clear_login_info(API_TOKEN);
    /** 清理前端的cookie **/
    await response.clearCookie("API_TOKEN");
    return true;
  }

  @Post("registry")
  async registry(@Request() request) {
    try {
      const { username, password, mobile_phone, e_mail } = request.body;
      /*  prettier-ignore */
      await this.admin_user.insert({username,password,mobile_phone,e_mail});
      return true;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Get("detail")
  async detail(@Request() request) {
    const { API_TOKEN } = request.cookies;
    const auth_info = await this.auth.getAutoInfoByToken(API_TOKEN);
    return auth_info;
  }
}
