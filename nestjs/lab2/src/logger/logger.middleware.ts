import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    if (!req.headers.authorization) {
      throw new UnauthorizedException;
    }
    const head = req.headers.authorization;
    const [__, token] = head.split(' ');
    if (!token) {
      throw new UnauthorizedException;
    }
    try{
      const data = jwt.verify(token, '1234');
      req.user = data;

    } catch(e) {
      throw new UnauthorizedException;
    }
    next();
  }
}
