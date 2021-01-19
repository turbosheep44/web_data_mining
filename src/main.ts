import Vue from 'vue'

// BOOTSTRAP
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

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
import { faHryvnia, faSmile, faCalendar, faUser, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faHryvnia, faSmile, faCalendar, faUser, faChevronDown)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

import App from './App.vue'
new Vue({
  render: h => h(App),
}).$mount('#app')
