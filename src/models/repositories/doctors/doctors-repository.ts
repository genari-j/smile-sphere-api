import prismaClient from '~/config/prisma-client'

import { RestRepository } from '~/models/repositories/index'

import type { GetDoctorsFilters, GetDoctorsResponse } from '~/@types/index'

class Repository extends RestRepository {
	async findAllDoctors(skip: number, take: number, filters: GetDoctorsFilters): Promise<GetDoctorsResponse> {
		const [data, total] = await prismaClient.$transaction([
			prismaClient.doctor.findMany({
				orderBy: {
					created_at: 'desc',
				},
				where: {
					active: true,
					deleted_at: null,
					...filters,
				},
				include: {
					specialty: true,
					address: true,
					profile: true,
				},
				skip,
				take,
			}),
			prismaClient.doctor.count({
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

const DoctorsRepository = new Repository('doctor')

export default DoctorsRepository
