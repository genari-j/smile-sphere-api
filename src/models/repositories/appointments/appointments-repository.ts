import prismaClient from '~/config/prisma-client'

import { RestRepository } from '~/models/repositories/index'

import type { GetAppointmentsFilters, GetAppointmentsResponse } from '~/@types/index'

class Repository extends RestRepository {
	async findAllAppointments(
		skip: number,
		take: number,
		filters: GetAppointmentsFilters,
	): Promise<GetAppointmentsResponse> {
		const [data, total] = await prismaClient.$transaction([
			prismaClient.appointment.findMany({
				orderBy: {
					appointment: 'desc',
				},
				where: {
					active: true,
					deleted_at: null,
					...filters,
				},
				include: {
					doctor: true,
					patient: {
						include: {
							patientsHistory: true,
						},
					},
					status: true,
				},
				skip,
				take,
			}),
			prismaClient.appointment.count({
				where: {
					active: true,
					deleted_at: null,
					...filters,
				},
			}),
		])
		const pages = Math.ceil(total / take)
		const currentPage = Math.ceil(skip / take) + 1

		return {
			data,
			total,
			pages,
			currentPage,
		}
	}

	async findAllAppointmentsByPatientId(
		skip: number,
		take: number,
		filters: GetAppointmentsFilters,
		patientId: number,
	): Promise<GetAppointmentsResponse> {
		const [data, total] = await prismaClient.$transaction([
			prismaClient.appointment.findMany({
				orderBy: {
					created_at: 'desc',
				},
				where: {
					patient_id: patientId,
					...filters,
				},
				include: {
					doctor: true,
					patient: {
						include: {
							patientsHistory: true,
						},
					},
					status: true,
				},
				skip,
				take,
			}),
			prismaClient.appointment.count({
				where: {
					patient_id: patientId,
					...filters,
				},
			}),
		])
		const pages = Math.ceil(total / take)
		const currentPage = Math.ceil(skip / take) + 1

		return {
			data,
			total,
			pages,
			currentPage,
		}
	}
}

const AppointmentsRepository = new Repository('appointment')

export default AppointmentsRepository
