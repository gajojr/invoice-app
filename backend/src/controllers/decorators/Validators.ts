import 'reflect-metadata';
import { MetadataKeys } from './MetadataKeys';

function validatorBinder(metadataKey: MetadataKeys) {
    return function (...keys: string[]) {
        return function (target: any, key: string, desc: PropertyDescriptor) {
            Reflect.defineMetadata(metadataKey, keys, target, key);
        }
    }
}

export const bodyValidator = validatorBinder(MetadataKeys.validator);
export const queryValidator = validatorBinder(MetadataKeys.queryValidator);
export const paramValidator = validatorBinder(MetadataKeys.paramValidator);