import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/pages/Main.vue'
// import Experiences from '@/pages/Experiences.vue'
// import Projects from '@/pages/Projects.vue'
// import MOOCs from '@/pages/Moocs.vue'
// import Contact from '@/pages/Contact.vue'

Vue.use(VueRouter)

// const routes = [{
//   path: '/',
//   name: 'Main',
//   component: Main
// }, {
//   path: '/experiences',
//   name: 'Experiences',
//   component: Experiences
// }, {
//   path: '/projects',
//   name: 'Projects',
//   component: Projects
// }, {
//   path: '/moocs',
//   name: 'MOOCs',
//   component: MOOCs
// }, {
//   path: '/contact',
//   name: 'Contact',
//   component: Contact
// }]

const routes = [{
  path: '/',
  name: 'Main',
  component: Main
}]

const router = new VueRouter({
  history: false,
  routes
})

export default router
