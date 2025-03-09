import type { GetPatientsTreatmentsFilters, GetPatientsTreatmentsResponse } from '~/@types/index'

export interface PatientsTreatmentsInterfaceRepository {
	findPatientsTreatments(
		skip: number,
		limit: number,
		filters: GetPatientsTreatmentsFilters,
	): Promise<GetPatientsTreatmentsResponse>
}
