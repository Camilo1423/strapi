'use strict';

/**
 * blog controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::blog.blog', ({ strapi }) => ({
    async findOne(ctx) {
        // Obtener el slug desde los parámetros de la consulta
        const { slug } = ctx.params;

        // Utilizar findMany con un filtro para buscar por slug
        const entities = await strapi.entityService.findMany('api::blog.blog', {
            filters: { slug },
            ...this.getFetchParams(ctx.query),
        });

        // Manejar el caso de no encontrar resultados o encontrar más de uno
        if (entities.length === 0) {
            return ctx.notFound('No se encontró el blog con ese slug.');
        }

        if (entities.length > 1) {
            return ctx.badRequest('Múltiples blogs encontrados con ese slug, por favor sea más específico.');
        }

        // Devolver el primer elemento ya que debería haber solo uno
        return this.sanitizeOutput(entities[0], ctx);
    }
}));
