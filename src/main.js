import Vue from 'vue'
import App from '@/App.vue'
import vuetify from '@/plugins/vuetify'
import router from '@/router.js'
import PerfectScrollbar from 'vue2-perfect-scrollbar'

import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'
import 'normalize.css'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(PerfectScrollbar)
// Globally register the computed variable to obtain the layout status
Vue.mixin({
  computed: {
    isMobile: function () {
      const desktop = this.$vuetify.breakpoint.md || this.$vuetify.breakpoint.lg || this.$vuetify.breakpoint.xl
      return !desktop
    }
  }
})

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#mountTarget')
