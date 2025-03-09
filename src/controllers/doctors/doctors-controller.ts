import type { FastifyReply, FastifyRequest } from 'fastify'

import type { DoctorsInterfaceRepository } from '~/models/interfaces/index'

import type { GetDoctorsResponse } from '~/@types/index'

import { env, getDoctorsFiltersQuerySchema } from '~/validators/index'

export class DoctorsController {
	private readonly doctorsRepository: DoctorsInterfaceRepository

	constructor(doctorsRepository: DoctorsInterfaceRepository) {
		this.doctorsRepository = doctorsRepository
	}

	async getAll(request: FastifyRequest, reply: FastifyReply): Promise<GetDoctorsResponse | undefined> {
		try {
			const { page = env.INITIAL_DATA_OFFSET, limit = env.LIST_PER_PAGE } = request.query as {
				page?: string
				limit?: string
			}
			const skip = (Number(page) - 1) * Number(limit)

			const { name } = getDoctorsFiltersQuerySchema.parse(request.query)
			const filters = { name }

			const { data, total, pages, currentPage } = await this.doctorsRepository.findAllDoctors(
				skip,
				Number(limit),
				filters,
			)

			const mappedDoctors = data?.map((doctor) => {
				return {
					id: doctor.id,
					name: doctor.name,
					user_code: doctor.user_code,
					email: doctor.email,
					contact: doctor.contact,
					specialty: {
						id: doctor.specialtie_id,
						name: doctor.specialty.name,
						description: doctor.specialty.description,
						created_at: doctor.specialty.created_at,
					},
					address: {
						id: doctor.address_id,
						street: doctor.address.street,
						neighborhood: doctor.address.number,
						city: doctor.address.city,
						state: doctor.address.state,
						cep: doctor.address.cep,
						complement: doctor.address.complement,
						active: doctor.address.active,
						created_at: doctor.address.created_at,
					},
					profile: {
						id: doctor.profile_id,
						name: doctor.profile.name,
						description: doctor.profile.description,
						active: doctor.profile.active,
						created_at: doctor.profile.created_at,
					},
					avatar: doctor.avatar,
					active: doctor.active,
					created_at: doctor.created_at,
					updated_at: doctor.updated_at,
					deleted_at: doctor.deleted_at,
				}
			})

			return reply.code(200).send({
				error: false,
				data: mappedDoctors,
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
