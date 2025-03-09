export interface AddressesBaseResponse {
	id: number
	street: string
	number: number
	neighborhood: string
	city: string
	state: string
	cep: string
	complement: string | null
	active: boolean
	created_at: Date
	updated_at: Date
	deleted_at: Date | null
}

export type CreateAddressBody = Omit<
	AddressesBaseResponse,
	'id' | 'active' | 'created_at' | 'updated_at' | 'deleted_at'
>
