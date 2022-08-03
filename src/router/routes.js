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
      {
        path: 'resume',
        component: () => import('pages/ResumeContainer'),
        name: 'resume',
      },
      {
        path: 'applications',
        component: () => import('pages/JobApplications'),
        name: 'app',
      },
      {
        path: 'interviews',
        component: () => import('pages/TeacherInterviews'),
        name: 'interviews',
      },
    ],
  },
  {
    path: '/org',
    redirect: '/org/dashboard',
    component: () => import('../layouts/OrgPanel'),
    children: [
      { path: 'dashboard', component: () => import('pages/DashboardPage'), name: 'dashboard' },
      {
        path: 'search',
        component: () => import('pages/TeacherSearch'),
        name: 't-search',
      },
      {
        path: 'applications',
        component: () => import('pages/JobApplicationsOrg'),
        name: 'o-app',
      },
      {
        path: 'interviews',
        component: () => import('pages/OrgInterviews'),
        name: 'o-interviews',
      },
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
