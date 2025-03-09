import type { Prisma } from '@prisma/client'
import type { Decimal } from '@prisma/client/runtime/library'

export interface GetItemsFilters {
	name?: string
}

export type ItemBaseResponse = {
	id: number
	name: string
	description: string
	quantity: number
	price: Decimal
	category_id: number
	active: boolean
	created_at: Date
	updated_at: Date
	deleted_at: Date | null
}

export type CreateItemBody = Omit<ItemBaseResponse, 'id' | 'active' | 'created_at' | 'updated_at' | 'deleted_at'>

export type ItemWithFKeyResponse = Prisma.ItemGetPayload<{
	include: {
		category: true
	}
}>

export interface GetItemsResponse {
	data: ItemWithFKeyResponse[]
	total: number
	pages: number
	currentPage: number
}
