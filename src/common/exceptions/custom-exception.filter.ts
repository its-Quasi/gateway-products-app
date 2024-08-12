import { Catch, ArgumentsHost, ExceptionFilter } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";

interface InheritedError {
  status: number;
  message: string;
}

@Catch(RpcException)
export class ExceptionFilterCustom implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const inheritedError = exception.getError() as InheritedError;
    const { status, message } = inheritedError;
    response.status(status).json({
      status,
      exceptionMessage: message
    });
  }
}
