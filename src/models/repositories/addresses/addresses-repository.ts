import { RestRepository } from '~/models/repositories/index'

class Repository extends RestRepository {}

const AddressesRepository = new Repository('addresses')

export default AddressesRepository
