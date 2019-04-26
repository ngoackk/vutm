import Vue from 'vue';
import Router from 'vue-router';

// Containers
import DefaultContainer from '../containers/DefaultContainer';

// Views

import Home from '../components/Home';
import Finance from '../components/Finance';
import StudyPlan from '../components/StudyPlan';
import TestPlan from '../components/TestPlan';
import Survey from '../components/Survey';
import OneGate from '../components/OneGate';
import Messenger from '../components/Messenger';
import Login from '../components/Login';
import Profile from '../components/Profile';
import News from '../components/News';
import Inform from '../components/inform';
import ChangePass from '../components/ChangePass';
import Result from '../components/Result';
// import Sales from '../components/Sales';


// Views - Pages
import Page404 from '../views/pages/Page404';
import Page500 from '../views/pages/Page500';

import Register from '../views/pages/Register';
import {
  Session
} from "../apis/auth.js";

// Users

Vue.use(Router);

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: [{
      path: '/',
      redirect: '/home',
      name: 'Main',
      beforeEnter: Session.validate,
      component: DefaultContainer,
      children: [{
          path: 'home',
          name: 'Home',
          component: Home
        },

        {
          path: 'messenger',
          name: 'Messenger',
          component: Messenger
        },
        {
          path: 'one-gate',
          name: 'OneGate',
          component: OneGate
        },
        {
          path: 'studyplan',
          name: 'StudyPlan',
          component: StudyPlan
        },
        {
          path: 'testplan',
          name: 'TestPlan',
          component: TestPlan,

        },
        {
          path: 'finance',
          name: 'Finance',
          component: Finance
        },
        {
          path: 'news/:id?',
          name: 'News',
          component: News
        },
        {
          path: 'inform',
          name: 'Inform',
          component: Inform
        },
        {
          path: 'survey',
          name: 'Survey',
          component: Survey
        },
        {
          path: 'profile',
          name: 'Profile',
          component: Profile
        },
        {
          path: 'change-pass',
          name: 'ChangePass',
          component: ChangePass
        },

        {
          path: 'result',
          name: 'Result',
          component: Result
        },

      ]
    },
    {
      path: '/pages',
      redirect: '/pages/404',
      name: 'Pages',
      component: {
        render(c) {
          return c('router-view');
        }
      },
      children: [{
          path: '404',
          name: 'Page404',
          component: Page404
        },
        {
          path: '500',
          name: 'Page500',
          component: Page500
        },
        {
          path: 'login',
          name: 'Login',
          component: Login
        },
        {
          path: 'register',
          name: 'Register',
          component: Register
        }
      ]
    }
  ]
});