import type { FastifyInstance, FastifyPluginAsync } from 'fastify'

import { authMiddleware } from '~/middlewares/auth'

import { DoctorsController } from '~/controllers/index'

import { DoctorsRepository } from '~/models/repositories/index'

const controller = new DoctorsController(DoctorsRepository)

const doctorsRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
	fastify.get('/doctors', { preHandler: [authMiddleware] }, controller.getAll.bind(controller))
}

export default doctorsRoutes
