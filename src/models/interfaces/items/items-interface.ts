import type { CreateItemBody, ItemBaseResponse, GetItemsFilters, GetItemsResponse } from '~/@types/index'

interface ItemsInterfaceRepository {
	create(data: CreateItemBody): Promise<ItemBaseResponse>
	findOneBy(field: string | number, value: string | number | undefined): Promise<ItemBaseResponse | null>
	findAllItems(skip: number, limit: number, filters: GetItemsFilters): Promise<GetItemsResponse>
}

export type { ItemsInterfaceRepository }
