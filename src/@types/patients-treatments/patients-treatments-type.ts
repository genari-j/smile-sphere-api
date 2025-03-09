export interface GetPatientsTreatmentsFilters {
	name?: string
}

export interface GetPatientsTreatmentsBaseResponse {
	id: number
	name: string
	description: string
	active: boolean
	created_at: Date
	updated_at: Date
	deleted_at: Date | null
}

export interface GetPatientsTreatmentsResponse {
	data: GetPatientsTreatmentsBaseResponse[]
	total: number
	pages: number
	currentPage: number
}
