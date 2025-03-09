import type { FastifyInstance, FastifyPluginAsync } from 'fastify'

import { authMiddleware } from '~/middlewares/auth'

import { AppointmentsController } from '~/controllers/index'

import {
	AppointmentsRepository,
	AppointmentsStatusRepository,
	PatientsRepository,
	DoctorsRepository,
} from '~/models/repositories/index'

const controller = new AppointmentsController(
	AppointmentsRepository,
	AppointmentsStatusRepository,
	PatientsRepository,
	DoctorsRepository,
)

const appointmentsRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
	fastify.get(
		'/appointments-summary',
		{ preHandler: [authMiddleware] },
		controller.getAppointmentsSummary.bind(controller),
	)
	fastify.get('/appointments', { preHandler: [authMiddleware] }, controller.getAll.bind(controller))
	fastify.get(
		'/appointments/patients/:id',
		{ preHandler: [authMiddleware] },
		controller.getAppointmentsByPatientId.bind(controller),
	)
	fastify.post('/appointments', { preHandler: [authMiddleware] }, controller.create.bind(controller))
}

export default appointmentsRoutes
