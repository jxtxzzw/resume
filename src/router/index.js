import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: require('@/components/Welcome').default
    },
    {
      path: '/CareerTimeline',
      name: 'CareerTimeline',
      component: require('@/components/CareerTimeline').default
    },
    {
      path: '/ExamCertification',
      name: 'ExamCertification',
      component: require('@/components/ExamCertification').default
    },
    {
      path: '/Fiction',
      name: 'Fiction',
      component: require('@/components/Fiction').default
    },
    {
      path: '/FootPrint',
      name: 'FootPrint',
      component: require('@/components/FootPrint').default
    },
    {
      path: '/Game',
      name: 'Game',
      component: require('@/components/Game').default
    },
    {
      path: '/Honor',
      name: 'Honor',
      component: require('@/components/Honor').default
    },
    {
      path: '/Movie',
      name: 'Movie',
      component: require('@/components/Movie').default
    },
    {
      path: '/OJ',
      name: 'OJ',
      component: require('@/components/OJ').default
    },
    {
      path: '/OnlineCourse',
      name: 'OnlineCourse',
      component: require('@/components/OnlineCourse').default
    },
    {
      path: '/ProfessionalBook',
      name: 'ProfessionalBook',
      component: require('@/components/ProfessionalBook').default
    },
    {
      path: '/Projects',
      name: 'Projects',
      component: require('@/components/Projects').default
    },
    {
      path: '/Reserved',
      name: 'Reserved',
      component: require('@/components/Reserved').default
    },
    {
      path: '/StudyTimeline',
      name: 'StudyTimeline',
      component: require('@/components/StudyTimeline').default
    },
    {
      path: '/TStack',
      name: 'TStack',
      component: require('@/components/TStack').default
    },
    {
      path: '/Welcome',
      name: 'Welcome',
      component: require('@/components/Welcome').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

export default router
