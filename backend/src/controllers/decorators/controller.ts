import 'reflect-metadata';
import { AppRouter } from '../../AppRouter';
import { Methods } from './Methods';
import { MetadataKeys } from './MetadataKeys';
import { Request, Response, NextFunction, RequestHandler } from 'express';

function bodyValidators(keys: string): RequestHandler {
    return function (req: Request, res: Response, next: NextFunction) {
        if (!req.body) {
            res.status(422).send('Invalid request');
            return;
        }

        for (let key of keys) {
            if (!req.body[key]) {
                res.status(422).send(`Missing property: ${key}`);
                return;
            }
        }

        next();
    }
}

function queryValidators(keys: string): RequestHandler {
    return function (req: Request, res: Response, next: NextFunction) {
        if (!req.query) {
            res.status(422).send('Invalid request');
            return;
        }

        for (let key of keys) {
            if (!req.query[key]) {
                res.status(422).send(`Missing query property: ${key}`);
                return;
            }
        }

        next();
    }
}

export function controller(routePrefix: string) {
    return function (target: Function) {
        const router = AppRouter.getInstance();

        for (let key in target.prototype) {
            const routeHandler = target.prototype[key];
            const path = Reflect.getMetadata(
                MetadataKeys.path,
                target.prototype,
                key
            );
            const method: Methods = Reflect.getMetadata(
                MetadataKeys.method,
                target.prototype,
                key
            );
            const middlewares = Reflect.getMetadata(
                MetadataKeys.middleware,
                target.prototype,
                key
            ) || [];
            const requiredBodyProps = Reflect.getMetadata(
                MetadataKeys.validator,
                target.prototype,
                key
            ) || [];
            const requiredQueryProps = Reflect.getMetadata(
                MetadataKeys.queryValidator,
                target.prototype,
                key
            ) || [];

            const validator = bodyValidators(requiredBodyProps);
            const queryValidator = queryValidators(requiredQueryProps);

            if (path) {
                router[method](
                    `${routePrefix}${path}`,
                    ...middlewares,
                    validator,
                    queryValidator,
                    routeHandler
                );
            }
        }
    }
}