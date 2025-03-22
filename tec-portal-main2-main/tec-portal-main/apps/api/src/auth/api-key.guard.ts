import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly auth: AuthService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const appId = request.headers['x-app-id'];
    const apiKey = request.headers['x-api-key'];
    if (!appId || !apiKey) {
      return false;
    }
    return this.auth.isValidApiKey(appId, apiKey);
  }
}
