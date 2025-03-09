import { z } from 'zod'

export const bearerTokenSchema = z.string().min(1, 'Token inválido')

export const getUsersFiltersQuerySchema = z.object({
	name: z.string().optional(),
})

export const userParamsSchema = z.object({
	id: z.string().min(1, 'ID inválido'),
})

export const recoveryPasswordSchema = z.object({
	email: z.string().min(1, 'Email inválido'),
})

export const setNewPasswordSchema = z.object({
	new_psw: z.string().min(6, 'A senha deve conter no mínimo 6 caracteres'),
	confirm_new_psw: z.string().min(6, 'A senha deve conter no mínimo 6 caracteres'),
})

export const signInBodySchema = z.object({
	user_code: z.string().min(1, 'Login inválido'),
	password: z.string().min(1, 'Login inválido'),
})

export const signUpBodySchema = z.object({
	// USER
	name: z.string().min(1, 'Nome inválido'),
	email: z
		.string()
		.min(1, 'E-mail inválido')
		.refine((value) => value.endsWith('@hotmail.com'), {
			message: 'O e-mail deve conter um domínio @hotmail.com',
		}),
	contact: z
		.string()
		.nullable()
		.refine((val) => val == null || val.length < 11, {
			message: 'O número deve conter no mínio 11 caracteres.',
		}),
	user_code: z.string().min(6, 'O código deve conter no mínimo 6 caracteres'),
	password: z.string().min(6, 'A senha deve conter no mínimo 6 caracteres'),
	department_id: z.number().min(1, 'Perfil inválido'),
	profile_id: z.number().min(1, 'Perfil inválido'),

	// ADDRESS
	street: z.string().min(1, 'Endereço inválido'),
	number: z.number().min(1, 'Número inválido'),
	neighborhood: z.string().min(1, 'Bairro inválido'),
	city: z.string().min(1, 'Cidade inválida'),
	state: z.string().min(1, 'Estado inválido'),
	cep: z.string().min(8, 'O CEP deve conter no mínimo 8 caracteres'),
	complement: z.string().nullable(),
})

export const updateUserBodySchema = z.object({
	name: z.string().min(1, 'Nome inválido'),
	email: z
		.string()
		.min(1, 'E-mail inválido')
		.refine((value) => value.endsWith('@hotmail.com'), {
			message: 'O e-mail deve conter um domínio @hotmail.com',
		}),
	contact: z
		.string()
		.nullable()
		.refine((val) => val == null || val.length < 11, {
			message: 'O número deve conter no mínio 11 caracteres.',
		}),
	user_code: z.string().min(6, 'O código do usuário deve ter pelo menos 6 caracteres'),
	department_id: z.number().min(1, 'Perfil inválido'),
	profile_id: z.number().min(1, 'Perfil inválido'),
})

export const updateLoggedUserPswSchema = z.object({
	old_psw: z.string().min(6, 'A senha deve conter no mínimo 6 caracteres'),
	new_psw: z.string().min(6, 'A senha deve conter no mínimo 6 caracteres'),
	confirm_new_psw: z.string().min(6, 'A senha deve conter no mínimo 6 caracteres'),
})
