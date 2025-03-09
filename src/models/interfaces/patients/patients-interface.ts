import type { PatientBaseResponse, GetPatientsFilters, GetPatientsResponse } from '~/@types/index'

interface PatientsInterfaceRepository {
	findOneBy(field: string | number, value: string | number | undefined): Promise<PatientBaseResponse | null>
	findAllPatients(skip: number, limit: number, filters: GetPatientsFilters): Promise<GetPatientsResponse>
}

export type { PatientsInterfaceRepository }
