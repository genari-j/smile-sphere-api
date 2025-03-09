import type { Prisma } from '@prisma/client'

export interface GetPatientsFilters {
	name?: string
}

export type PatientBaseResponse = {
	id: number
	name: string
	email: string
	contact: string | null
	patient_treatment_id: number
	patient_history_id: number
	address_id: number
	avatar: string | null
	active: boolean
	created_at: Date
	updated_at: Date
	deleted_at: Date | null
}

export type PatientWithFKeyResponse = Prisma.PatientGetPayload<{
	include: {
		patientsTreatment: true
		patientsHistory: true
		address: true
	}
}>

export interface GetPatientsResponse {
	data: PatientWithFKeyResponse[]
	total: number
	pages: number
	currentPage: number
}
