import { Body, Controller, Inject, Post } from "@nestjs/common";
import { NATS_SERVICE } from "src/config/services";
import { ClientProxy } from "@nestjs/microservices";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

@Controller("auth")
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post("register")
  register(@Body() registerDto: RegisterDto) {
    return this.client.send("register", registerDto);
  }

  @Post("login")
  login(@Body() loginDto: LoginDto) {
    return this.client.send("login", loginDto);
  }

  @Post("verify-token")
  verifyToken() {
    return this.client.send("verify-token", {});
  }
}
