import type {
	CreateAppointmentBody,
	AppointmentBaseResponse,
	GetAppointmentsFilters,
	GetAppointmentsResponse,
} from '~/@types/index'

interface AppointmentsInterfaceRepository {
	findAll(): Promise<AppointmentBaseResponse[]>
	findOneBy(field: string | number, value: string | number | undefined): Promise<AppointmentBaseResponse | null>
	create(data: CreateAppointmentBody): Promise<AppointmentBaseResponse>
	findAllAppointments(skip: number, limit: number, filters: GetAppointmentsFilters): Promise<GetAppointmentsResponse>
	findAllAppointmentsByPatientId(
		skip: number,
		take: number,
		filters: GetAppointmentsFilters,
		patientId: number,
	): Promise<GetAppointmentsResponse>
}

export type { AppointmentsInterfaceRepository }
