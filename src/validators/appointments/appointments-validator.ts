import { z } from 'zod'

export const patientParamsSchema = z.object({
	id: z.string().min(1, 'ID inválido'),
})

export const getAppointmentsByPatientIdFiltersQuerySchema = z.object({
	doctor_id: z
		.string()
		.optional()
		.transform((str) => (str ? Number(str) : undefined)),
	status_id: z
		.string()
		.optional()
		.transform((str) => (str ? Number(str) : undefined)),
})

export const getAppointmentsFiltersQuerySchema = z.object({
	patient_id: z
		.string()
		.optional()
		.transform((str) => (str ? Number(str) : undefined)),
	doctor_id: z
		.string()
		.optional()
		.transform((str) => (str ? Number(str) : undefined)),
	appointment: z
		.string()
		.optional()
		.transform((str) => (str ? new Date(str) : undefined)),
	status_id: z
		.string()
		.optional()
		.transform((str) => (str ? Number(str) : undefined)),
})

export const createAppointmentBodySchema = z.object({
	patient_id: z.number().min(1, 'Paciente inválido'),
	doctor_id: z.number().min(1, 'Doutor inválido'),
	appointment: z
		.string()
		.min(1, 'Data agendamento inválida')
		.transform((date) => new Date(date)),
	time: z.string().min(1, 'Horário inválido'),
})
