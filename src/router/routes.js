import { useUserStore } from 'stores/user';

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/auth',
    beforeEnter: () => {
      const user = useUserStore();
      if (user.userType === 'teacher') {
        return '/teacher';
      } else if (user.userType === 'org') {
        return '/org';
      } else {
        return true;
      }
    },
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: 'login', component: () => import('pages/LoginForm') },
      { path: 'register', component: () => import('pages/RegisterPage') },
    ],
  },
  {
    path: '/teacher',
    redirect: '/teacher/search',
    name: 'teacher-in',
    beforeEnter: () => {
      const user = useUserStore();
      if (user.userType === 'org' || user.token === null) {
        return '/forbid';
      } else {
        return true;
      }
    },
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
    name: 'org-in',
    beforeEnter: () => {
      const user = useUserStore();
      if (user.userType === 'teacher' || user.token === null) {
        return '/forbid';
      } else {
        return true;
      }
    },
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
      {
        path: 'tokens',
        component: () => import('pages/FeedbackTokens'),
        name: 'tokens',
      },
    ],
  },
  {
    path: '/forbid',
    name: 'forbid',
    component: () => import('pages/PageForbidden'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
