import { MailerService } from '@nestjs-modules/mailer';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '@prisma/client';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from 'src/decorators/Public';
import { PrismaService } from 'src/prisma.service';

interface RequestWithUser extends Request {
  user?: User;
}

@Injectable()
export class CreditGuard implements CanActivate {
  constructor(
    private prisma: PrismaService,
    private reflector: Reflector,
    private readonly mailerService: MailerService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }
    const request: RequestWithUser = context.switchToHttp().getRequest();

    if (!request.user) {
      return false;
    }

    const foundUser = await this.prisma.user.findUnique({
      select: {
        credits: true,
      },
      where: {
        email: request.user.email,
      },
    });

    if (!foundUser) {
      return false;
    }

    if (foundUser.credits <= 0) {
      return false;
    }

    const remainingCredits = foundUser.credits - 1;

    await this.prisma.user.update({
      select: { id: true },
      data: {
        credits: foundUser.credits - 1,
      },
      where: {
        email: request.user.email,
      },
    });

    if (remainingCredits <= 0) {
      this.mailerService
        .sendMail({
          to: request.user.email,
          from: 'moviedb@support.com',
          subject: "Vous n'avez plus de crédits!",
          template: 'test',
          context: {
            name: request.user.firstName,
            credits: remainingCredits,
          },
        })
        .then(() => {})
        .catch(() => {});
    }

    return true;
  }
}
