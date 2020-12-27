import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#2176FF',
        secondary: '#FDCA40',
        accent: '#82B1FF',
        error: '#FF6C6C',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
        black: '#333333'
      }
    }
  }
})
