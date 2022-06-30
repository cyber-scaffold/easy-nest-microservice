import { NestFactory } from "@nestjs/core";
import * as cookieParser from "cookie-parser";

import { AppModule } from "@/app.module";
import { UserGuard } from "@/guards/user_guard.guard";
import { ErrorExceptionFilter } from "@/filters/error.filter";
import { ResponseInterceptor } from "@/interceptors/response.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.setGlobalPrefix("api");
  await app.useGlobalGuards(new UserGuard());
  await app.useGlobalFilters(new ErrorExceptionFilter());
  await app.useGlobalInterceptors(new ResponseInterceptor());
  await app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
