import { Controller, Inject, Post } from "@nestjs/common";
import { NATS_SERVICE } from "src/config/services";
import { ClientProxy } from "@nestjs/microservices";

@Controller("auth")
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private client: ClientProxy) {}

  @Post("register")
  register() {
    return this.client.send("register", {});
  }

  @Post("login")
  login() {
    return this.client.send("login", {});
  }

  @Post("verify-token")
  verifyToken() {
    return this.client.send("verify-token", {});
  }
}
