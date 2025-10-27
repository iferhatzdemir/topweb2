import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.getType() === 'http'
    ? ctx.switchToHttp().getRequest()
    : GqlExecutionContext.create(ctx).getContext().req;
  return request.user;
});
