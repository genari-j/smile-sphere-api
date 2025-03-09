import type { FastifyReply, FastifyRequest } from 'fastify'

import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

import path from 'node:path'
import fs from 'node:fs'
import { mailService } from '~/services/emails/index'
import { cryptPassword, decodeRequestAuthToken, sendError } from '~/helpers/index'

import type {
	AddressesInterfaceRepository,
	DepartmentsInterfaceRepository,
	DoctorsInterfaceRepository,
	ProfilePermissionsInterfaceRepository,
	ProfilesInterfaceRepository,
	UsersInterfaceRepository,
} from '~/models/interfaces/index'

import type {
	ApiResponse,
	UserBaseResponse,
	GetUserResponse,
	GetUsersResponse,
	SignInTokenResponse,
	UpdateUserBody,
} from '~/@types/index'

import {
	env,
	userParamsSchema,
	getUsersFiltersQuerySchema,
	signInBodySchema,
	signUpBodySchema,
	updateUserBodySchema,
	recoveryPasswordSchema,
	setNewPasswordSchema,
	updateLoggedUserPswSchema,
} from '~/validators/index'

export class UsersController {
	private readonly usersRepository: UsersInterfaceRepository
	private readonly addressesRepository: AddressesInterfaceRepository
	private readonly departmentsRepository: DepartmentsInterfaceRepository
	private readonly doctorsRepository: DoctorsInterfaceRepository
	private readonly profilesRepository: ProfilesInterfaceRepository
	private readonly profilePermissionsRepository: ProfilePermissionsInterfaceRepository

	constructor(
		usersRepository: UsersInterfaceRepository,
		addressesRepository: AddressesInterfaceRepository,
		departmentsRepository: DepartmentsInterfaceRepository,
		doctorsRepository: DoctorsInterfaceRepository,
		profilesRepository: ProfilesInterfaceRepository,
		profilePermissionsRepository: ProfilePermissionsInterfaceRepository,
	) {
		this.usersRepository = usersRepository
		this.addressesRepository = addressesRepository
		this.departmentsRepository = departmentsRepository
		this.doctorsRepository = doctorsRepository
		this.profilesRepository = profilesRepository
		this.profilePermissionsRepository = profilePermissionsRepository
	}

	async verifyToken(request: FastifyRequest, reply: FastifyReply): Promise<ApiResponse | undefined> {
		try {
			const { authorization } = request.headers
			const user = await decodeRequestAuthToken(authorization)

			if (!user) return sendError(reply, 401, 'Não autorizado.')

			return reply.code(200).send({
				error: false,
				message: 'Requisição validada.',
			})
		} catch (err) {
			reply.code(500).send(`Algo saiu como não esperado: ${err}`)
		}
	}

	async userRecoveryPassword(request: FastifyRequest, reply: FastifyReply): Promise<ApiResponse | undefined> {
		try {
			const { email } = recoveryPasswordSchema.parse(request.body)

			const userByEmail = await this.usersRepository.findOneBy('email', email)
			if (!userByEmail) return sendError(reply, 404, 'O E-mail especificado não foi encontrado.')

			const token = jwt.sign({ sub: userByEmail?.id }, env.APP_SECRET as string, {
				expiresIn: env.EXP_RESET_PSW as string,
			})

			const emailPath = path.resolve('src', 'services', 'emails', 'templates', 'user-recovery-psw.html')
			const [userFirstName] = userByEmail.name.split(' ')

			const html = fs
				.readFileSync(emailPath, { encoding: 'utf-8' })
				.replace('{{ emailLink }}', `${env.URL_FRONTEND}?token=${token}`)
				.replace('{{ name }}', userFirstName)

			await mailService(email, 'Smile Sphere - Recuperação de Senha', html)

			return reply.code(200).send({
				error: false,
				message: 'Um e-mail de recuperação de senha foi enviado.',
			})
		} catch (err) {
			reply.code(500).send(`Algo saiu como não esperado: ${err}`)
		}
	}

	async updateUserPassword(request: FastifyRequest, reply: FastifyReply): Promise<ApiResponse | undefined> {
		try {
			const { authorization } = request.headers
			const { new_psw, confirm_new_psw } = setNewPasswordSchema.parse(request.body)

			const user = await decodeRequestAuthToken(authorization)

			if (!user) return sendError(reply, 404, 'O Usuário especificado não foi encontrado.')

			if (new_psw !== confirm_new_psw) return sendError(reply, 400, 'As senhas especificadas não conferem.')

			const encryptedPassword = await cryptPassword(new_psw)
			const payload = { password: encryptedPassword }
			await this.usersRepository.findByIdAndUpdate(Number(user.id), payload)

			return reply.code(200).send({
				error: false,
				message: 'A senha foi atualizada.',
			})
		} catch (err) {
			reply.code(500).send(`Algo saiu como não esperado: ${err}`)
		}
	}

	async updateLoggedUserPassword(request: FastifyRequest, reply: FastifyReply): Promise<ApiResponse | undefined> {
		try {
			const { id } = userParamsSchema.parse(request.params)
			const { old_psw, new_psw, confirm_new_psw } = updateLoggedUserPswSchema.parse(request.body)

			const userById = await this.usersRepository.findUserById(Number(id))

			const payload: UpdateUserBody = {}

			if (!userById) return sendError(reply, 404, 'O usuário especificado não existe.')

			const compareUserPassword = await bcryptjs.compare(String(old_psw), String(userById.password))
			if (!compareUserPassword || new_psw !== confirm_new_psw) return sendError(reply, 400, 'As senhas não conferem.')

			const encryptedPassword = await cryptPassword(confirm_new_psw)
			if (confirm_new_psw) {
				payload.password = encryptedPassword
			}

			if (Object.keys(payload).length) {
				await this.usersRepository.findByIdAndUpdate(Number(id), payload)
			}

			return reply.code(200).send({
				error: false,
				message: 'Sua senha foi alterada.',
			})
		} catch (err) {
			reply.code(500).send(`Algo saiu como não esperado: ${err}`)
		}
	}

	async create(request: FastifyRequest, reply: FastifyReply): Promise<UserBaseResponse | undefined> {
		try {
			const {
				street,
				number,
				neighborhood,
				city,
				state,
				cep,
				complement,
				name,
				email,
				contact,
				user_code,
				password,
				department_id,
				profile_id,
			} = signUpBodySchema.parse(request.body)

			const addressPayload = {
				street,
				number,
				neighborhood,
				city,
				state,
				cep,
				complement,
			}
			const addressCreated = await this.addressesRepository.create(addressPayload)

			const userByCode = await this.usersRepository.findOneBy('user_code', user_code)
			if (userByCode) return sendError(reply, 400, 'Erro ao utilizar esta matrícula.')

			const userByEmail = await this.usersRepository.findOneBy('email', email)
			if (userByEmail) return sendError(reply, 400, 'Erro ao utilizar este email.')

			const doctorByCode = await this.doctorsRepository.findOneBy('user_code', user_code)
			if (doctorByCode) return sendError(reply, 400, 'Erro ao utilizar esta matrícula.')

			const doctorByEmail = await this.doctorsRepository.findOneBy('email', email)
			if (doctorByEmail) return sendError(reply, 400, 'Erro ao utilizar este email.')

			const departmentById = await this.departmentsRepository.findOneBy('id', department_id)
			if (!departmentById) return sendError(reply, 404, 'O departamento informado não existe.')

			const profileById = await this.profilesRepository.findOneBy('id', profile_id)
			if (!profileById) return sendError(reply, 404, 'O perfil informado não existe.')

			const cryptUserPassword = await cryptPassword(password)

			const userPayload = {
				name,
				email,
				contact,
				user_code,
				password: cryptUserPassword,
				department_id,
				address_id: addressCreated.id,
				profile_id,
			}
			const userCreated = await this.usersRepository.create(userPayload)

			return reply.code(201).send({
				error: false,
				data: userCreated,
			})
		} catch (err) {
			reply.code(500).send(`Algo saiu como não esperado: ${err}`)
		}
	}

	async signIn(request: FastifyRequest, reply: FastifyReply): Promise<SignInTokenResponse | undefined> {
		try {
			const { user_code, password } = signInBodySchema.parse(request.body)

			const user = await this.usersRepository.findOneBy('user_code', user_code)
			if (!user || user.active !== true || user.deleted_at !== null) return sendError(reply, 401, 'Não autorizado.')

			const compareUserPassword = await bcryptjs.compare(String(password), String(user.password))
			if (!compareUserPassword) sendError(reply, 401, 'Não autorizado.')

			const address = await this.addressesRepository.findOneBy('id', user.address_id)
			const department = await this.departmentsRepository.findOneBy('id', user.department_id)
			const profiles = await this.profilePermissionsRepository.findOneBy('id', user.profile_id)

			const token = jwt.sign(
				{
					sub: user.id,
					name: user.name,
					email: user.email,
					contact: user.contact,
					address,
					department,
					profiles,
					active: user.active,
					avatar: user.avatar,
					created_at: user.created_at,
					updated_at: user.updated_at,
				},
				env.APP_SECRET as string,
				{ expiresIn: '12h' },
			)

			return reply.code(200).send({
				error: false,
				data: { token },
			})
		} catch (err) {
			reply.code(500).send(`Algo saiu como não esperado: ${err}`)
		}
	}

	async getAll(request: FastifyRequest, reply: FastifyReply): Promise<GetUsersResponse | undefined> {
		try {
			const { page = env.INITIAL_DATA_OFFSET, limit = env.LIST_PER_PAGE } = request.query as {
				page?: string
				limit?: string
			}
			const skip = (Number(page) - 1) * Number(limit)

			const { name } = getUsersFiltersQuerySchema.parse(request.query)
			const filters = { name }

			const { data, total, pages, currentPage } = await this.usersRepository.findAllUsers(skip, Number(limit), filters)

			const mappedUsers = data?.map((user) => {
				return {
					id: user.id,
					name: user.name,
					user_code: user.user_code,
					email: user.email,
					contact: user.contact,
					department: {
						id: user.department_id,
						name: user.department.name,
						created_at: user.department.created_at,
					},
					address: {
						id: user.address_id,
						street: user.address.street,
						neighborhood: user.address.number,
						city: user.address.city,
						state: user.address.state,
						cep: user.address.cep,
						complement: user.address.complement,
						active: user.address.active,
						created_at: user.address.created_at,
					},
					profile: {
						id: user.profile_id,
						name: user.profile.name,
						description: user.profile.description,
						active: user.profile.active,
						created_at: user.profile.created_at,
					},
					avatar: user.avatar,
					active: user.active,
					created_at: user.created_at,
					updated_at: user.updated_at,
					deleted_at: user.deleted_at,
				}
			})

			return reply.code(200).send({
				error: false,
				data: mappedUsers,
				limit: Number(limit),
				total,
				pages,
				currentPage,
			})
		} catch (err) {
			reply.code(500).send(`Algo saiu como não esperado: ${err}`)
		}
	}

	async getById(request: FastifyRequest, reply: FastifyReply): Promise<GetUserResponse | undefined> {
		try {
			const { id } = userParamsSchema.parse(request.params)

			const userById = await this.usersRepository.findUserById(Number(id))
			if (!userById) return sendError(reply, 404, 'O usuário especificado não existe.')

			const user = {
				id: userById.id,
				name: userById.name,
				user_code: userById.user_code,
				email: userById.email,
				contact: userById.contact,
				department: {
					id: userById.department_id,
					name: userById.department.name,
					active: userById.department.active,
					created_at: userById.department.created_at,
				},
				address: {
					id: userById.address_id,
					street: userById.address.street,
					neighborhood: userById.address.number,
					city: userById.address.city,
					state: userById.address.state,
					cep: userById.address.cep,
					complement: userById.address.complement,
					active: userById.address.active,
					created_at: userById.address.created_at,
				},
				profile: {
					id: userById.profile_id,
					name: userById.profile.name,
					description: userById.profile.description,
					active: userById.profile.active,
					created_at: userById.profile.created_at,
				},
				avatar: userById.avatar,
				active: userById.active,
				created_at: userById.created_at,
				updated_at: userById.updated_at,
				deleted_at: userById.deleted_at,
			}

			return reply.code(200).send({
				error: false,
				data: user,
			})
		} catch (err) {
			reply.code(500).send(`Algo saiu como não esperado: ${err}`)
		}
	}

	async update(request: FastifyRequest, reply: FastifyReply): Promise<UserBaseResponse | undefined> {
		try {
			const { id } = userParamsSchema.parse(request.params)
			const { name, email, contact, user_code, department_id, profile_id } = updateUserBodySchema.parse(request.body)

			const userById = await this.usersRepository.findUserById(Number(id))
			if (!userById) return sendError(reply, 404, 'O usuário informado não existe.')

			const payload: UpdateUserBody = {}

			if (name) payload.name = name

			if (email) {
				const userByEmail = await this.usersRepository.findUserByFieldExcludingCurrent(Number(id), 'email', email)
				if (userByEmail) return sendError(reply, 400, 'O email informado já existe.')
				payload.email = email
			}

			if (contact) payload.contact = contact

			const userByCode = await this.usersRepository.findUserByFieldExcludingCurrent(Number(id), 'user_code', user_code)
			if (userByCode) return sendError(reply, 400, 'Erro ao utilizar este código.')

			if (!department_id) {
				payload.department_id = userById.department.id
			} else {
				if (userById.profile.name !== 'Admin')
					return sendError(reply, 400, 'Somente administradores podem alterar o Departamento.')

				const departmentById = await this.departmentsRepository.findOneBy('id', department_id)
				if (!departmentById) return sendError(reply, 404, 'O departamento informado não existe.')
				payload.department_id = department_id
			}

			if (!profile_id) {
				payload.profile_id = userById.profile.id
			} else {
				if (userById.profile.name !== 'Admin')
					return sendError(reply, 400, 'Somente administradores podem alterar o Tipo de Perfil.')

				const profileById = await this.profilesRepository.findOneBy('id', profile_id)
				if (!profileById) return sendError(reply, 404, 'O perfil informado não existe.')
				payload.profile_id = profile_id
			}

			if (Object.keys(payload).length) {
				await this.usersRepository.findByIdAndUpdate(Number(id), payload)
			}

			return reply.code(200).send({
				error: false,
				message: 'O usuário foi atualizado.',
			})
		} catch (err) {
			return reply.code(500).send(`Algo saiu como não esperado: ${err}`)
		}
	}

	async disable(request: FastifyRequest, reply: FastifyReply): Promise<UserBaseResponse | undefined> {
		try {
			const { id } = userParamsSchema.parse(request.params)

			if (!id) return sendError(reply, 400, 'ID do usuário não informado.')

			const user = await this.usersRepository.findOneBy('id', Number(id))
			if (!user) return sendError(reply, 404, 'O usuário informado não existe.')

			const payload = {
				active: false,
			}

			await this.usersRepository.findByIdAndUpdate(Number(id), payload)

			return reply.code(204).send()
		} catch (err) {
			reply.code(500).send(`Algo saiu como não esperado: ${err}`)
		}
	}
}
