import Vue from 'vue'

// BOOTSTRAP
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import '@/assets/app.scss'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

// NOTIFICATIONS
import Notifications from 'vue-notification'
Vue.use(Notifications)

// SIMPLE STORE
import SimpleStore from '@/store'
Vue.use(SimpleStore)

// FONT AWESOME
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHryvnia, faSmile, faCalendar, faUser, faChevronDown, faHome, faBuilding, faBicycle } from '@fortawesome/free-solid-svg-icons'
import { faClock, faTv, faSwimmingPool, faCoffee, faLaptop, faFan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faHryvnia, faSmile, faCalendar, faUser, faChevronDown, faHome, faBuilding, faBicycle)
library.add(faClock, faTv, faSwimmingPool, faCoffee, faLaptop, faFan)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

// COMMON FILTERS
Vue.filter('money', function(value) {
  if (typeof value != typeof 0) {
    console.log(value)
    return value
  }
  return `€${value.toFixed(2)}`
})

import App from './App.vue'
new Vue({
  render: h => h(App),
}).$mount('#app')
