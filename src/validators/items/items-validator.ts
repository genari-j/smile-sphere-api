import { z } from 'zod'

export const getItemsFiltersQuerySchema = z.object({
	name: z.string().optional(),
})

export const createItemBodySchema = z.object({
	name: z.string().min(1, 'Nome inválido'),
	description: z.string().min(1, 'Descrição inválida'),
	quantity: z.number().min(1, 'Valor inválido'),
	price: z.coerce.number().min(1, 'Valor inválido'),
	category_id: z.number().min(1, 'Categoria inválida'),
})
