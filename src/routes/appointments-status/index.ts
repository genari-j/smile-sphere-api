import type { FastifyInstance, FastifyPluginAsync } from 'fastify'

import { authMiddleware } from '~/middlewares/auth'

import { AppointmentsStatusController } from '~/controllers/index'

import { AppointmentsStatusRepository } from '~/models/repositories/index'

const controller = new AppointmentsStatusController(AppointmentsStatusRepository)

const appointmentsStatusRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
	fastify.get('/appointments-status', { preHandler: [authMiddleware] }, controller.getAll.bind(controller))
}

export default appointmentsStatusRoutes
