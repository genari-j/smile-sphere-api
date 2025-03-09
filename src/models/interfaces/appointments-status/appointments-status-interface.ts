import type {
	AppointmentStatusBaseResponse,
	GetAppointmentsStatusFilters,
	GetAppointmentsStatusResponse,
} from '~/@types/index'

interface AppointmentsStatusInterfaceRepository {
	findAll(): Promise<AppointmentStatusBaseResponse[]>
	findOneBy(field: string | number, value: string | number | undefined): Promise<AppointmentStatusBaseResponse | null>
	findAllAppointmentsStatus(
		skip: number,
		limit: number,
		filters: GetAppointmentsStatusFilters,
	): Promise<GetAppointmentsStatusResponse>
}

export type { AppointmentsStatusInterfaceRepository }
