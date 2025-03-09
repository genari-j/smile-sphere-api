import { RestRepository } from '~/models/repositories/index'

class Repository extends RestRepository {}

const DepartmentsRepository = new Repository('department')

export default DepartmentsRepository
