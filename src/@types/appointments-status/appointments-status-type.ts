export interface GetAppointmentsStatusFilters {
	name?: string
}

export type AppointmentStatusBaseResponse = {
	id: number
	name: string
	active: boolean
	created_at: Date
	updated_at: Date
	deleted_at: Date | null
}

export interface GetAppointmentsStatusResponse {
	data: AppointmentStatusBaseResponse[]
	total: number
	pages: number
	currentPage: number
}
