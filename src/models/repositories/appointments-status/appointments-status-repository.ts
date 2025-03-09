import prismaClient from '~/config/prisma-client'

import { RestRepository } from '~/models/repositories/index'

import type { GetAppointmentsStatusFilters, GetAppointmentsStatusResponse } from '~/@types/index'

class Repository extends RestRepository {
	async findAllAppointmentsStatus(
		skip: number,
		take: number,
		filters: GetAppointmentsStatusFilters,
	): Promise<GetAppointmentsStatusResponse> {
		const [data, total] = await prismaClient.$transaction([
			prismaClient.appointmentStatus.findMany({
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
			prismaClient.appointmentStatus.count({
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

const DoctorsRepository = new Repository('appointmentStatus')

export default DoctorsRepository
