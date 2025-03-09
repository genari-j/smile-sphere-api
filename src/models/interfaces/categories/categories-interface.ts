import type { CategoryBaseResponse } from '~/@types/index'

interface CategoriesInterfaceRepository {
	findOneBy(field: string | number, value: string | number | undefined): Promise<CategoryBaseResponse | null>
}

export type { CategoriesInterfaceRepository }
