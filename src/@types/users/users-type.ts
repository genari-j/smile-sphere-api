import type { Prisma } from '@prisma/client'

export interface GetUsersFilters {
	name?: string
}

export interface SignInTokenResponse {
	token: string
}

export type UserBaseResponse = {
	id: number
	name: string
	user_code: string
	password: string
	email: string
	contact: string | null
	department_id: number
	address_id: number
	profile_id: number
	active: boolean
	avatar: string | null
	created_at: Date
	updated_at: Date
	deleted_at: Date | null
}

export type CreateUserBody = Omit<
	UserBaseResponse,
	'id' | 'active' | 'avatar' | 'created_at' | 'updated_at' | 'deleted_at'
>

export type UpdateUserBody = Partial<
	Omit<UserBaseResponse, 'id' | 'address_id' | 'created_at' | 'updated_at' | 'deleted_at'>
>

export type UserWithFKeyResponse = Prisma.UsersGetPayload<{
	include: {
		department: true
		address: true
		profile: true
	}
}>

export interface GetUsersResponse {
	data: UserWithFKeyResponse[]
	total: number
	pages: number
	currentPage: number
}

export type GetUserResponse = UserWithFKeyResponse
