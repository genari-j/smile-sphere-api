import type { Prisma } from '@prisma/client'

export interface GetAppointmentsFilters {
	patient_id?: number
	doctor_id?: number
	appointment?: Date
	status_id?: number
}

export type AppointmentBaseResponse = {
	id: number
	patient_id: number
	doctor_id: number
	appointment: Date
	status_id: number | undefined
	active: boolean
	created_at: Date
	updated_at: Date
	deleted_at: Date | null
}

export type CreateAppointmentBody = Omit<
	AppointmentBaseResponse,
	'id' | 'active' | 'created_at' | 'updated_at' | 'deleted_at'
>

export type AppointmentWithFKeyResponse = Prisma.AppointmentGetPayload<{
	include: {
		doctor: true
		patient: {
			include: {
				patientsHistory: true
			}
		}
		status: true
	}
}>

export interface GetAppointmentsResponse {
	data: AppointmentWithFKeyResponse[]
	total: number
	pages: number
	currentPage: number
}

export type GetAppointmentResponse = AppointmentWithFKeyResponse

export interface GetAppointmentsSummaryResponse {
	appointments: number
	appointmentsStatus: {
		agendado: number
		atrasado: number
		cancelado: number
		concluido: number
		'em-atendimento': number
		'em-espera': number
		'tratamento-pausado': number
	}
}
