import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const List = React.lazy(() => import('./views/pages/job-applications/list/List'))
const ApplicantForm = React.lazy(() => import('./views/pages/job-applications/form/Form'))

const routes = [
  { path: '/admin/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/job-applications', name: 'Job Applications', element: List },
  { path: '/job-application/edit/:id', name: 'Job Applications', element: ApplicantForm },
]

export default routes
