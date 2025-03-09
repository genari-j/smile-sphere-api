import prismaClient from '~/config/prisma-client'

import { RestRepository } from '~/models/repositories/index'

import type { GetPatientsTreatmentsFilters, GetPatientsTreatmentsResponse } from '~/@types/index'

class Repository extends RestRepository {
	async findPatientsTreatments(
		skip: number,
		take: number,
		filters: GetPatientsTreatmentsFilters,
	): Promise<GetPatientsTreatmentsResponse> {
		const [data, total] = await prismaClient.$transaction([
			prismaClient.patientTreatment.findMany({
				orderBy: {
					created_at: 'desc',
				},
				where: {
					active: true,
					deleted_at: null,
					...filters,
				},
				skip,
				take,
			}),
			prismaClient.patientTreatment.count({
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

const PatientsTreatmentsRepository = new Repository('patient_treatments')

export default PatientsTreatmentsRepository
