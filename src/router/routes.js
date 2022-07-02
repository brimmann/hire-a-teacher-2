const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: 'login', component: () => import('pages/LoginForm') },
      { path: 'register', component: () => import('pages/RegisterPage') },
    ],
  },
  {
    path: '/teacher',
    redirect: '/teacher/search',
    component: () => import('layouts/TeacherPanel.vue'),
    children: [
      { path: 'search', component: () => import('pages/JobSearch'), name: 'search' },
      { path: 'resume', component: () => import('pages/ResumePage'), name: 'resume' },
      { path: 'applications', component: () => import('pages/JobApplications') },
      { path: 'offers', component: () => import('pages/JobOffers') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
