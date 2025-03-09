import type { FastifyReply, FastifyRequest } from 'fastify'

import type { ItemsInterfaceRepository, CategoriesInterfaceRepository } from '~/models/interfaces/index'
import { sendError } from '~/helpers/index'

import type { GetItemsResponse, ItemBaseResponse } from '~/@types/index'
import Decimal from 'decimal.js'

import { env, getItemsFiltersQuerySchema, createItemBodySchema } from '~/validators/index'

export class ItemsController {
	private readonly itemsRepository: ItemsInterfaceRepository
	private readonly categoriesRepository: CategoriesInterfaceRepository

	constructor(itemsRepository: ItemsInterfaceRepository, categoriesRepository: CategoriesInterfaceRepository) {
		this.itemsRepository = itemsRepository
		this.categoriesRepository = categoriesRepository
	}

	async getAll(request: FastifyRequest, reply: FastifyReply): Promise<GetItemsResponse | undefined> {
		try {
			const { page = env.INITIAL_DATA_OFFSET, limit = env.LIST_PER_PAGE } = request.query as {
				page?: string
				limit?: string
			}
			const skip = (Number(page) - 1) * Number(limit)

			const { name } = getItemsFiltersQuerySchema.parse(request.query)
			const filters = { name }

			const { data, total, pages, currentPage } = await this.itemsRepository.findAllItems(skip, Number(limit), filters)

			const mappedItems = data?.map((item) => {
				return {
					id: item.id,
					name: item.name,
					description: item.description,
					quantity: item.quantity,
					price: item.price,
					category: {
						id: item.category_id,
						name: item.category.name,
						description: item.category.created_at,
					},
					active: item.active,
					created_at: item.created_at,
					updated_at: item.updated_at,
					deleted_at: item.deleted_at,
				}
			})

			return reply.code(200).send({
				error: false,
				data: mappedItems,
				limit: Number(limit),
				total,
				pages,
				currentPage,
			})
		} catch (err) {
			reply.code(500).send(`Algo saiu como não esperado: ${err}`)
		}
	}

	async create(request: FastifyRequest, reply: FastifyReply): Promise<ItemBaseResponse | undefined> {
		try {
			const { name, description, quantity, price, category_id } = createItemBodySchema.parse(request.body)

			const itemByName = await this.itemsRepository.findOneBy('name', name)
			if (itemByName) return sendError(reply, 400, 'O nome informado já existe.')

			const categoryById = await this.categoriesRepository.findOneBy('id', category_id)
			if (!categoryById) return sendError(reply, 404, 'A categoria informada não existe.')

			const convertPriceToDecimal = new Decimal(price)

			const itemPayload = {
				name,
				description,
				quantity,
				price: convertPriceToDecimal,
				category_id,
			}
			const itemCreated = await this.itemsRepository.create(itemPayload)

			return reply.code(201).send({
				error: false,
				data: itemCreated,
			})
		} catch (err) {
			reply.code(500).send(`Algo saiu como não esperado: ${err}`)
		}
	}
}
