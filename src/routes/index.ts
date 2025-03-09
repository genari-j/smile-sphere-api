import appointmentsRoutes from './appointments'
import appointmentsStatusRoutes from './appointments-status'
import baseRoute from './base'
import doctorsRoutes from './doctors'
import itemsRoutes from './items'
import patientsRoutes from './patients'
import patientsTreatmentsRoutes from './patients-treatments'
import usersRoutes from './users'

export const appRoutes = [
	appointmentsRoutes,
	appointmentsStatusRoutes,
	baseRoute,
	doctorsRoutes,
	itemsRoutes,
	patientsRoutes,
	patientsTreatmentsRoutes,
	usersRoutes,
]
