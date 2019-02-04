import Vue from 'vue'
import Router from 'vue-router'
import ResumeLayout from '../components/ResumeLayout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ResumeLayout',
      component: ResumeLayout
    }
  ]
})
