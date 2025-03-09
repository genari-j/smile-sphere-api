import { RestRepository } from '~/models/repositories/index'

class Repository extends RestRepository {}

const CategoriesRepository = new Repository('itemCategory')

export default CategoriesRepository
