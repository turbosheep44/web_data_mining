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
import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHryvnia, faSmile, faCalendar, faUser, faChevronDown, faHome, faBuilding, faBicycle } from '@fortawesome/free-solid-svg-icons'
import { faClock, faTv, faSwimmingPool, faCoffee, faLaptop, faFan, faFilm, faGamepad, faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import { faHamburger, faUtensils, faConciergeBell, faFutbol, faTableTennis, faDumbbell, faPlus } from '@fortawesome/free-solid-svg-icons'
library.add(faHryvnia, faSmile, faCalendar, faUser, faChevronDown, faHome, faBuilding, faBicycle)
library.add(faClock, faTv, faSwimmingPool, faCoffee, faLaptop, faFan, faFilm, faGamepad, faShoppingBag)
library.add(faHamburger, faUtensils, faConciergeBell, faFutbol, faTableTennis, faDumbbell, faPlus)
Vue.component('font-awesome-icon', FontAwesomeIcon)
dom.watch()

// COMMON FILTERS
Vue.filter('money', function(value, showCents = false, currencySymbol = false) {
  if (typeof value != typeof 0) {
    console.log(value)
    return value
  }
  return `${currencySymbol ? '€' : ''}${value.toFixed(showCents ? 2 : 0)}`
})

Vue.config.productionTip = false
import App from './App.vue'
new Vue({
  render: h => h(App),
}).$mount('#app')
