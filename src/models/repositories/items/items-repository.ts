import prismaClient from '~/config/prisma-client'

import { RestRepository } from '~/models/repositories/index'

import type { GetItemsFilters, GetItemsResponse } from '~/@types/index'

class Repository extends RestRepository {
	async findAllItems(skip: number, take: number, filters: GetItemsFilters): Promise<GetItemsResponse> {
		const [data, total] = await prismaClient.$transaction([
			prismaClient.item.findMany({
				orderBy: {
					created_at: 'desc',
				},
				where: {
					active: true,
					deleted_at: null,
					...filters,
				},
				include: {
					category: true,
				},
				skip,
				take,
			}),
			prismaClient.item.count({
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

const ItemsRepository = new Repository('item')

export default ItemsRepository
