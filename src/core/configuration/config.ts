import * as Joi from 'joi';
import { pick } from 'lodash';

export type Config = ReturnType<typeof loadConfig>;

export function loadConfig() {
    const validationSchemaInner = {
        SERVER_PORT: Joi.number(),
        TYPEORM_HOST: Joi.string(),
        TYPEORM_DATABASE: Joi.string(),
        SECRET: Joi.string(),
        TYPEORM_ENTITIES: Joi.string(),
        TYPEORM_SYNCHRONIZE: Joi.string().valid('true', 'false'),
        TYPEORM_LOGGING: Joi.string().valid('true', 'false'),
    };

    const validationSchema = Joi.object(validationSchemaInner).options({
        presence: 'required',
    });

    const validatedProperties = pick(
        process.env,
        Object.keys(validationSchemaInner),
    );

    Joi.assert(validatedProperties, validationSchema);

    const {
        SERVER_PORT,
        TYPEORM_HOST,
        TYPEORM_DATABASE,
        SECRET,
        TYPEORM_ENTITIES,
        TYPEORM_SYNCHRONIZE,
        TYPEORM_LOGGING,
    } = validatedProperties as {
        [key in keyof typeof validationSchemaInner]: string;
    };

    return {
        port: parseInt(SERVER_PORT, 10),
        secret: SECRET,
        database: {
            host: TYPEORM_HOST,
            database: TYPEORM_DATABASE,
            entites: TYPEORM_ENTITIES,
            synchronize: TYPEORM_SYNCHRONIZE === 'true',
            logging: TYPEORM_LOGGING === 'true',
        },
    };
}
