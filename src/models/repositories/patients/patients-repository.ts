import prismaClient from '~/config/prisma-client'

import { RestRepository } from '~/models/repositories/index'

import type { GetPatientsFilters, GetPatientsResponse } from '~/@types/index'

class Repository extends RestRepository {
	async findAllPatients(skip: number, take: number, filters: GetPatientsFilters): Promise<GetPatientsResponse> {
		const [data, total] = await prismaClient.$transaction([
			prismaClient.patient.findMany({
				orderBy: {
					created_at: 'desc',
				},
				where: {
					active: true,
					deleted_at: null,
					...filters,
				},
				include: {
					patientsTreatment: true,
					patientsHistory: true,
					address: true,
				},
				skip,
				take,
			}),
			prismaClient.patient.count({
				where: {
					active: true,
					deleted_at: null,
					...filters,
				},
			}),
		])
		const pages = Math.ceil(total / take)
		const currentPage = Math.ceil(skip / take) + 1

		return {
			data,
			total,
			pages,
			currentPage,
		}
	}
}

const PatientsRepository = new Repository('patient')

export default PatientsRepository
