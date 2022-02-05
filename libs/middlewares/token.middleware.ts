import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import environment from 'tools/environment/environment';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  static forRoutes(arg0: {
    path: string;
  }): Function | import('@nestjs/common').Type<any> {
    throw new Error('Method not implemented.');
  }
  use(req: Request, res: Response, next: Function) {
    const authJWT = req.headers.authorization;

    if (req.baseUrl !== '/api/login') {
      if (!authJWT) {
        next();
        throw new HttpException('Jwt could not found!', HttpStatus.FORBIDDEN);
      } else {
        try {
          const user = jwt.verify(
            authJWT.slice(7, authJWT.length),
            environment.jwtText,
          );
          if (user) {
            req['user'] = user;
            next();
          } else {
            throw new HttpException(
              'something went wrong!',
              HttpStatus.BAD_REQUEST,
            );
          }
        } catch (error) {
          throw new HttpException(error.message, HttpStatus.BAD_GATEWAY);
        }
      }
    } else {
      next();
      return;
    }
  }
}
