import { RestRepository } from '~/models/repositories/index'

class Repository extends RestRepository {}

const ProfilePermissionsRepository = new Repository('profilePermission')

export default ProfilePermissionsRepository
