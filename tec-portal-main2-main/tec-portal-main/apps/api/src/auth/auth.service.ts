import { Injectable } from '@nestjs/common';
import { compare } from '../utils/hash';
import { PrismaService } from '@tec-portal/prisma-client';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async isValidApiKey(appId: string, apiKey: string): Promise<boolean> {
    const app = await this.prisma.app.findUnique({
      where: { appId },
    });
    return app ? compare(apiKey, app.apiKey) : false;
  }
}
