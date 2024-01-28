import * as Joi from 'joi';

export const paginationSchema = Joi.object({
    page: Joi.number().required(),
    pageSize: Joi.number().required(),
    sortField: Joi.string().allow(null).empty(null),
    sortOrder: Joi.string().valid('asc', 'desc').allow(null).empty(null),
});
