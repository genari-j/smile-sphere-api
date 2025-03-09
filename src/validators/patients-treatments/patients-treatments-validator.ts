import { z } from 'zod'

export const getPatientsTreatmentsFiltersQuerySchema = z.object({
	name: z.string().optional(),
})
