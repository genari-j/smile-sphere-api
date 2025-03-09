import type { FastifyInstance, FastifyPluginAsync } from 'fastify'

import { authMiddleware } from '~/middlewares/auth'

import { PatientsTreatmentsController } from '~/controllers/index'

import { PatientsTreatmentsRepository } from '~/models/repositories/index'

const controller = new PatientsTreatmentsController(PatientsTreatmentsRepository)

const patientsTreatmentsRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
	fastify.get('/patients-treatments', { preHandler: [authMiddleware] }, controller.getAll.bind(controller))
}

export default patientsTreatmentsRoutes
