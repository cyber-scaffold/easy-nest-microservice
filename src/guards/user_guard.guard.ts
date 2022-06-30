import * as jwt from "jsonwebtoken";
import { Injectable, CanActivate } from "@nestjs/common";

import { jwt_secret } from "@/configs/jwt_config";

/** TOKEN鉴权 **/
@Injectable()
export class UserGuard implements CanActivate {
  async canActivate(context) {
    const request = context.switchToHttp().getRequest();
    if (request.url.match("login")) {
      return true;
    }
    if (request.url.match("forget")) {
      return true;
    }
    if (request.url.match("registry")) {
      return true;
    }
    try {
      const { API_TOKEN } = request.cookies;
      const is_verify = await jwt.verify(API_TOKEN, jwt_secret);
      if (is_verify) {
        return true;
      }
      return false;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
