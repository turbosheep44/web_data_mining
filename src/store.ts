import _Vue, { PluginObject } from 'vue'

export class Store {
  tickCount: number = 0

  happiness: number = 0.75
  money: number = 3000
  expenses: { name: string; price: number }[] = []
  income: number = 1000

  stocks: Stock[] = []

  job: Job = { title: 'Unemployed', wage: 0, hours: 0 }
  jobSearching: boolean = false
  jobOffers: Job[] = []

  events: _Vue = new _Vue()
}

interface Stock {
  risk: string
  value: number[]
  owned: number
  visible: boolean
}

interface Job {
  title: string
  wage: number
  hours: number
}

export class StorePlugin implements PluginObject<void> {
  install(Vue: typeof _Vue): void {
    Vue.prototype.$store = _Vue.observable(new Store())
  }
}

const SimpleStore = new StorePlugin()
export default SimpleStore

declare module 'vue/types/vue' {
  interface Vue {
    $store: Store
  }
}
