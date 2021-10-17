import 'reflect-metadata';
import { AppRouter } from '../../AppRouter';
import { Methods } from './Methods';
import { MetadataKeys } from './MetadataKeys';
import { Request, Response, NextFunction, RequestHandler } from 'express';

type RequestPropertyType = 'body' | 'query' | 'params';

function validatorBinder(property: RequestPropertyType) {
    return function (keys: string): RequestHandler {
        return function (req: Request, res: Response, next: NextFunction) {
            if (!req[property]) {
                res.status(422).send('Invalid request');
                return;
            }

            for (let key of keys) {
                if (!req[property][key]) {
                    res.status(422).send(`Missing property: ${key}`);
                    return;
                }
            }

            next();
        }
    }
}

const bodyValidators = validatorBinder('body');
const queryValidators = validatorBinder('query');
const paramValidators = validatorBinder('params');

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
            const requiredParamProps = Reflect.getMetadata(
                MetadataKeys.paramValidator,
                target.prototype,
                key
            ) || [];

            const bodyValidator = bodyValidators(requiredBodyProps);
            const queryValidator = queryValidators(requiredQueryProps);
            const paramValidator = paramValidators(requiredParamProps);

            if (path) {
                router[method](
                    `${routePrefix}${path}`,
                    ...middlewares,
                    bodyValidator,
                    queryValidator,
                    paramValidator,
                    routeHandler
                );
            }
        }
    }
}