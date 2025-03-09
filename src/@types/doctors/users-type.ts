import type { Prisma } from '@prisma/client'

export interface GetDoctorsFilters {
	name?: string
}

export type DoctorBaseResponse = {
	id: number
	name: string
	email: string
	contact: string | null
	user_code: string
	password: string
	specialty_id: number
	address_id: number
	profile_id: number
	active: boolean
	avatar: string | null
	created_at: Date
	updated_at: Date
	deleted_at: Date | null
}

export type DoctorWithFKeyResponse = Prisma.DoctorGetPayload<{
	include: {
		specialty: true
		address: true
		profile: true
	}
}>

export interface GetDoctorsResponse {
	data: DoctorWithFKeyResponse[]
	total: number
	pages: number
	currentPage: number
}
