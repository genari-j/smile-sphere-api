import type { FastifyInstance, FastifyPluginAsync } from 'fastify'

import { authMiddleware } from '~/middlewares/auth'

import { ItemsController } from '~/controllers/index'

import { ItemsRepository, CategoriesRepository } from '~/models/repositories/index'

const controller = new ItemsController(ItemsRepository, CategoriesRepository)

const itemsRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
	fastify.get('/items', { preHandler: [authMiddleware] }, controller.getAll.bind(controller))
	fastify.post('/items', { preHandler: [authMiddleware] }, controller.create.bind(controller))
}

export default itemsRoutes
