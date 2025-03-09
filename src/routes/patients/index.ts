import type { FastifyInstance, FastifyPluginAsync } from 'fastify'

import { authMiddleware } from '~/middlewares/auth'

import { PatientsController } from '~/controllers/index'

import { PatientsRepository } from '~/models/repositories/index'

const controller = new PatientsController(PatientsRepository)

const patientsRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
	fastify.get('/patients', { preHandler: [authMiddleware] }, controller.getAll.bind(controller))
}

export default patientsRoutes
