import { Module } from '@nestjs/common';
import { ClientsModule, Transport, ClientProviderOptions } from '@nestjs/microservices';
import { envs } from 'src/config/envs';
import { NATS_SERVICE } from 'src/config/services';

const natsClientConfig: ClientProviderOptions = {
  name: NATS_SERVICE,
  transport: Transport.NATS,
  options: {
    servers: envs.nats_servers,
  },
};

@Module({
  imports: [ClientsModule.register([natsClientConfig])],
  exports: [ClientsModule.register([natsClientConfig])],
})
export class NatsModule { }