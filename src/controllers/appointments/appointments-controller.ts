import type { FastifyReply, FastifyRequest } from 'fastify'
import path from 'node:path'
import fs from 'node:fs'

import type {
	AppointmentsInterfaceRepository,
	AppointmentsStatusInterfaceRepository,
	PatientsInterfaceRepository,
	DoctorsInterfaceRepository,
} from '~/models/interfaces/index'

import { mailService } from '~/services/emails/index'
import { sendError, appointmentsStatus } from '~/helpers/index'
import type { AppointmentBaseResponse, GetAppointmentsResponse, GetAppointmentsSummaryResponse } from '~/@types/index'

import {
	env,
	getAppointmentsFiltersQuerySchema,
	getAppointmentsByPatientIdFiltersQuerySchema,
	createAppointmentBodySchema,
	patientParamsSchema,
} from '~/validators/index'

export class AppointmentsController {
	private readonly appointmentsRepository: AppointmentsInterfaceRepository
	private readonly appointmentsStatusRepository: AppointmentsStatusInterfaceRepository
	private readonly patientsRepository: PatientsInterfaceRepository
	private readonly doctorsRepository: DoctorsInterfaceRepository

	constructor(
		appointmentsRepository: AppointmentsInterfaceRepository,
		appointmentsStatusRepository: AppointmentsStatusInterfaceRepository,
		patientsRepository: PatientsInterfaceRepository,
		doctorsRepository: DoctorsInterfaceRepository,
	) {
		this.appointmentsRepository = appointmentsRepository
		this.appointmentsStatusRepository = appointmentsStatusRepository
		this.patientsRepository = patientsRepository
		this.doctorsRepository = doctorsRepository
	}

	async create(request: FastifyRequest, reply: FastifyReply): Promise<AppointmentBaseResponse | undefined> {
		try {
			const { patient_id, doctor_id, appointment, time } = createAppointmentBodySchema.parse(request.body)

			const appointmentDate = new Date(appointment)
			const [hours, minutes] = time.split(':').map(Number)

			appointmentDate.setHours(hours, minutes, 0, 0)
			appointmentDate.setDate(appointmentDate.getDate() + 1)

			const patientById = await this.patientsRepository.findOneBy('id', patient_id)
			if (!patientById) return sendError(reply, 404, 'O paciente informado não existe.')

			const doctorById = await this.doctorsRepository.findOneBy('id', doctor_id)
			if (!doctorById) return sendError(reply, 404, 'O doutor informado não existe.')

			const appointmentStatus = await this.appointmentsStatusRepository.findOneBy('name', appointmentsStatus.scheduled)

			const appointmentPayload = {
				patient_id,
				doctor_id,
				appointment: appointmentDate,
				status_id: appointmentStatus?.id,
			}
			const appointmentCreated = await this.appointmentsRepository.create(appointmentPayload)

			const [patientFirstName] = patientById.name.split(' ')
			const emailPath = path.resolve('src', 'services', 'emails', 'templates', 'new-appointment.html')

			const html = fs
				.readFileSync(emailPath, { encoding: 'utf-8' })
				.replace('{{ name }}', patientFirstName)
				.replace('{{ appointment }}', appointmentCreated.appointment.toString())
				.replace('{{ doctorName }}', doctorById.name)

			await mailService(patientById.email, 'Smile Sphere - Novo Agendamento', html)

			return reply.code(201).send({
				error: false,
				data: appointmentCreated,
			})
		} catch (err) {
			reply.code(500).send(`Algo saiu como não esperado: ${err}`)
		}
	}

	async getAll(request: FastifyRequest, reply: FastifyReply): Promise<GetAppointmentsResponse | undefined> {
		try {
			const { page = env.INITIAL_DATA_OFFSET, limit = env.LIST_PER_PAGE } = request.query as {
				page?: string
				limit?: string
			}
			const skip = (Number(page) - 1) * Number(limit)

			const { doctor_id, patient_id, appointment, status_id } = getAppointmentsFiltersQuerySchema.parse(request.query)
			const filters = { doctor_id, patient_id, appointment, status_id }

			const { data, total, pages, currentPage } = await this.appointmentsRepository.findAllAppointments(
				skip,
				Number(limit),
				filters,
			)

			const mappedAppointments = data?.map((appointment) => {
				return {
					id: appointment.id,
					appointment: appointment.appointment,
					doctor: {
						id: appointment.doctor_id,
						name: appointment.doctor.name,
						avatar: appointment.doctor.avatar,
					},
					patient: {
						id: appointment.patient_id,
						name: appointment.patient.name,
						history: {
							id: appointment.patient.patient_history_id,
							height: appointment.patient.patientsHistory.height,
							weight: appointment.patient.patientsHistory.weight,
							birth: appointment.patient.patientsHistory.birth,
							gender: appointment.patient.patientsHistory.gender,
							civil: appointment.patient.patientsHistory.civil,
							occupation: appointment.patient.patientsHistory.occupation,
							medicament: appointment.patient.patientsHistory.medicament,
							comorbidity: appointment.patient.patientsHistory.comorbidity,
							observation: appointment.patient.patientsHistory.observation,
						},
						avatar: appointment.patient.avatar,
					},
					status: {
						id: appointment.status_id,
						name: appointment.status.name,
					},
					active: appointment.active,
					created_at: appointment.created_at,
					updated_at: appointment.updated_at,
					deleted_at: appointment.deleted_at,
				}
			})

			return reply.code(200).send({
				error: false,
				data: mappedAppointments,
				limit: Number(limit),
				total,
				pages,
				currentPage,
			})
		} catch (err) {
			reply.code(500).send(`Algo saiu como não esperado: ${err}`)
		}
	}

	async getAppointmentsByPatientId(
		request: FastifyRequest,
		reply: FastifyReply,
	): Promise<GetAppointmentsResponse | undefined> {
		try {
			const { id } = patientParamsSchema.parse(request.params)

			const { page = env.INITIAL_DATA_OFFSET, limit = env.LIST_PER_PAGE } = request.query as {
				page?: string
				limit?: string
			}
			const skip = (Number(page) - 1) * Number(limit)

			const patientById = await this.patientsRepository.findOneBy('id', Number(id))
			if (!patientById) return sendError(reply, 404, 'O paciente informado não existe.')

			const { doctor_id, status_id } = getAppointmentsByPatientIdFiltersQuerySchema.parse(request.query)
			const filters = { doctor_id, status_id }

			const { data, total, pages, currentPage } = await this.appointmentsRepository.findAllAppointmentsByPatientId(
				skip,
				Number(limit),
				filters,
				patientById.id,
			)

			const mappedAppointmentsByPatientId = data?.map((appointment) => {
				return {
					id: appointment.id,
					appointment: appointment.appointment,
					doctor: {
						id: appointment.doctor_id,
						name: appointment.doctor.name,
						avatar: appointment.doctor.avatar,
					},
					patient: {
						id: appointment.patient_id,
						name: appointment.patient.name,
						history: {
							id: appointment.patient.patient_history_id,
							height: appointment.patient.patientsHistory.height,
							weight: appointment.patient.patientsHistory.weight,
							birth: appointment.patient.patientsHistory.birth,
							gender: appointment.patient.patientsHistory.gender,
							civil: appointment.patient.patientsHistory.civil,
							occupation: appointment.patient.patientsHistory.occupation,
							medicament: appointment.patient.patientsHistory.medicament,
							comorbidity: appointment.patient.patientsHistory.comorbidity,
							observation: appointment.patient.patientsHistory.observation,
						},
						avatar: appointment.patient.avatar,
					},
					status: {
						id: appointment.status_id,
						name: appointment.status.name,
					},
					active: appointment.active,
					created_at: appointment.created_at,
					updated_at: appointment.updated_at,
					deleted_at: appointment.deleted_at,
				}
			})

			return reply.code(200).send({
				error: false,
				data: mappedAppointmentsByPatientId,
				limit: Number(limit),
				total,
				pages,
				currentPage,
			})
		} catch (err) {
			reply.code(500).send(`Algo saiu como não esperado: ${err}`)
		}
	}

	async getAppointmentsSummary(
		_request: FastifyRequest,
		reply: FastifyReply,
	): Promise<GetAppointmentsSummaryResponse | undefined> {
		try {
			const appointments = await this.appointmentsRepository.findAll()
			const appointmentsStatus = await this.appointmentsStatusRepository.findAll()

			const today = new Date()
			today.setHours(0, 0, 0, 0)
			const todayUtc = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()))

			const allAppointmentsToday = appointments.filter((appointment) => {
				const appointmentDate = new Date(appointment.appointment)
				const appointmentUtc = new Date(
					Date.UTC(appointmentDate.getUTCFullYear(), appointmentDate.getUTCMonth(), appointmentDate.getUTCDate()),
				)
				return appointmentUtc.getTime() === todayUtc.getTime()
			})

			const appointmentsStatusCount = appointmentsStatus.reduce((acc: { [key: string]: number }, status) => {
				acc[status.name] = appointments.filter((appointment) => appointment.status_id === status.id).length
				return acc
			}, {})

			const appointmentsSummary = {
				appointments: {
					'Agendados hoje': allAppointmentsToday.length,
				},
				appointmentsStatus: appointmentsStatusCount,
			}

			return reply.code(200).send({
				error: false,
				data: appointmentsSummary,
			})
		} catch (err) {
			reply.code(500).send(`Algo saiu como não esperado: ${err}`)
		}
	}
}
