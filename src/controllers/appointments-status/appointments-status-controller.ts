import type { FastifyReply, FastifyRequest } from 'fastify'

import type { AppointmentsStatusInterfaceRepository } from '~/models/interfaces/index'

import type { GetAppointmentsStatusResponse } from '~/@types/index'

import { env, getAppointmentsStatusFiltersQuerySchema } from '~/validators/index'

export class AppointmentsStatusController {
	private readonly appointmentsStatusRepository: AppointmentsStatusInterfaceRepository

	constructor(appointmentsStatusRepository: AppointmentsStatusInterfaceRepository) {
		this.appointmentsStatusRepository = appointmentsStatusRepository
	}

	async getAll(request: FastifyRequest, reply: FastifyReply): Promise<GetAppointmentsStatusResponse | undefined> {
		try {
			const { page = env.INITIAL_DATA_OFFSET, limit = env.LIST_PER_PAGE } = request.query as {
				page?: string
				limit?: string
			}
			const skip = (Number(page) - 1) * Number(limit)

			const { name } = getAppointmentsStatusFiltersQuerySchema.parse(request.query)
			const filters = { name }

			const { data, total, pages, currentPage } = await this.appointmentsStatusRepository.findAllAppointmentsStatus(
				skip,
				Number(limit),
				filters,
			)

			const mappedAppointmentsStatus = data?.map((status) => {
				return {
					id: status.id,
					name: status.name,
					active: status.active,
					created_at: status.created_at,
					updated_at: status.updated_at,
					deleted_at: status.deleted_at,
				}
			})

			return reply.code(200).send({
				error: false,
				data: mappedAppointmentsStatus,
				limit: Number(limit),
				total,
				pages,
				currentPage,
			})
		} catch (err) {
			reply.code(500).send(`Algo saiu como não esperado: ${err}`)
		}
	}
}
