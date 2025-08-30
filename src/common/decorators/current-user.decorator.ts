import { createParamDecorator, ExecutionContext } from '@nestjs/common';

type UserShape = {
  userId: string;
  username?: string;
  email?: string;
  roles?: string[];
  perms?: string[];
};

export const CurrentUser = createParamDecorator<keyof UserShape | undefined>(
  (key, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getResponse();
    const user: UserShape | undefined = req.user;
    return key ? user?.[key] : user;
  },
);
