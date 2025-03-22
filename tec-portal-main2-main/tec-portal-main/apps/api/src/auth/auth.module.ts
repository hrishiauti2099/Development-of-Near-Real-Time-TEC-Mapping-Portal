import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiKeyGuard } from './api-key.guard';

@Global()
@Module({
  providers: [
    AuthService,
    {
      provide: 'APP_GUARD',
      useClass: ApiKeyGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
