import type { DoctorBaseResponse, GetDoctorsFilters, GetDoctorsResponse } from '~/@types/index'

interface DoctorsInterfaceRepository {
	findOneBy(field: string | number, value: string | number | undefined): Promise<DoctorBaseResponse | null>
	findAllDoctors(skip: number, limit: number, filters: GetDoctorsFilters): Promise<GetDoctorsResponse>
}

export type { DoctorsInterfaceRepository }
