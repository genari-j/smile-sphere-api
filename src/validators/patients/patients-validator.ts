import { z } from 'zod'

export const getPatientsFiltersQuerySchema = z.object({
	name: z.string().optional(),
})
