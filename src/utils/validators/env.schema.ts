import * as Joi from 'joi';

const schema = Joi.object({
    NODE_ENV: Joi.string().valid('development', 'production', 'test').required(),
    PORT: Joi.number().required(),
    DATABASE_URL: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
});

export default schema;
