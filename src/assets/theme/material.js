/**
 * Created by century on 2017/7/17.
 */
import Vue from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
Vue.use(VueMaterial)
Vue.material.registerTheme({
  default: {
    primary: {
      color: 'red',
      hue: 700
    },
    accent: 'red'
  },

})
