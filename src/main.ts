import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger, ValidationPipe } from "@nestjs/common";
import { envs } from "./config/envs";
import { ExceptionFilterCustom } from "./common/exceptions/custom-exception.filter";

async function bootstrap() {
  const logger = new Logger("GATEWAY MAIN");
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  );
  app.setGlobalPrefix("api");
  app.useGlobalFilters(new ExceptionFilterCustom());
  await app.listen(envs.port);
  logger.log(`GATEWAY RUNNING ON PORT ${envs.port}`);
}
bootstrap();
