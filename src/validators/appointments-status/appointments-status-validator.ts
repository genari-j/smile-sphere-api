import { z } from 'zod'

export const getAppointmentsStatusFiltersQuerySchema = z.object({
	name: z.string().optional(),
})
