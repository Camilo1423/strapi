'use strict';

/**
 * blog controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::blog.blog', ({ strapi }) => ({
    async findeOne(ctx) {
        const { id } = ctx.params;

        const entity = await strapi.service('api::blog.blog').findeOne({
            where: { slug: id }
        });
        const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

        return this.transformResponse(sanitizedEntity)
    }
}));
