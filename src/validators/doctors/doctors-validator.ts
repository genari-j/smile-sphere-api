import { z } from 'zod'

export const getDoctorsFiltersQuerySchema = z.object({
	name: z.string().optional(),
})
