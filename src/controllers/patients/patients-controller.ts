import type { FastifyReply, FastifyRequest } from 'fastify'

import type { PatientsInterfaceRepository } from '~/models/interfaces/index'

import type { GetPatientsResponse } from '~/@types/index'

import { env, getPatientsFiltersQuerySchema } from '~/validators/index'

export class PatientsController {
	private readonly patientsRepository: PatientsInterfaceRepository

	constructor(patientsRepository: PatientsInterfaceRepository) {
		this.patientsRepository = patientsRepository
	}

	async getAll(request: FastifyRequest, reply: FastifyReply): Promise<GetPatientsResponse | undefined> {
		try {
			const { page = env.INITIAL_DATA_OFFSET, limit = env.LIST_PER_PAGE } = request.query as {
				page?: string
				limit?: string
			}
			const skip = (Number(page) - 1) * Number(limit)

			const { name } = getPatientsFiltersQuerySchema.parse(request.query)
			const filters = { name }

			const { data, total, pages, currentPage } = await this.patientsRepository.findAllPatients(
				skip,
				Number(limit),
				filters,
			)

			const mappedPatients = data?.map((patient) => {
				return {
					id: patient.id,
					name: patient.name,
					email: patient.email,
					contact: patient.contact,
					treatment: {
						id: patient.patient_treatment_id,
						name: patient.patientsTreatment.name,
						description: patient.patientsTreatment.description,
						created_at: patient.patientsTreatment.created_at,
					},
					history: {
						id: patient.patient_history_id,
						height: patient.patientsHistory.height,
						weight: patient.patientsHistory.weight,
						birth: patient.patientsHistory.birth,
						gender: patient.patientsHistory.gender,
						civil: patient.patientsHistory.civil,
						occupation: patient.patientsHistory.occupation,
						medicament: patient.patientsHistory.medicament,
						comorbidity: patient.patientsHistory.comorbidity,
						observation: patient.patientsHistory.observation,
						created_at: patient.patientsHistory.created_at,
					},
					address: {
						id: patient.address_id,
						street: patient.address.street,
						neighborhood: patient.address.number,
						city: patient.address.city,
						state: patient.address.state,
						cep: patient.address.cep,
						complement: patient.address.complement,
						active: patient.address.active,
						created_at: patient.address.created_at,
					},
					avatar: patient.avatar,
					active: patient.active,
					created_at: patient.created_at,
					updated_at: patient.updated_at,
					deleted_at: patient.deleted_at,
				}
			})

			return reply.code(200).send({
				error: false,
				data: mappedPatients,
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
