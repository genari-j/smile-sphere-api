import type { FastifyReply, FastifyRequest } from 'fastify'

import type { PatientsTreatmentsInterfaceRepository } from '~/models/interfaces/index'

import type { GetPatientsTreatmentsResponse } from '~/@types/index'

import { env, getPatientsTreatmentsFiltersQuerySchema } from '~/validators/index'

export class PatientsTreatmentsController {
	private readonly patientsTreatmentsRepository: PatientsTreatmentsInterfaceRepository

	constructor(patientsTreatmentsRepository: PatientsTreatmentsInterfaceRepository) {
		this.patientsTreatmentsRepository = patientsTreatmentsRepository
	}

	async getAll(request: FastifyRequest, reply: FastifyReply): Promise<GetPatientsTreatmentsResponse | undefined> {
		try {
			const { page = env.INITIAL_DATA_OFFSET, limit = env.LIST_PER_PAGE } = request.query as {
				page?: string
				limit?: string
			}
			const skip = (Number(page) - 1) * Number(limit)

			const { name } = getPatientsTreatmentsFiltersQuerySchema.parse(request.query)
			const filters = { name }

			const { data, total, pages, currentPage } = await this.patientsTreatmentsRepository.findPatientsTreatments(
				skip,
				Number(limit),
				filters,
			)

			const mappedPatientsTreatments = data?.map((treatment) => {
				return {
					id: treatment.id,
					name: treatment.name,
					description: treatment.description,
					active: treatment.active,
					created_at: treatment.created_at,
					updated_at: treatment.updated_at,
					deleted_at: treatment.deleted_at,
				}
			})

			return reply.code(200).send({
				error: false,
				data: mappedPatientsTreatments,
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
