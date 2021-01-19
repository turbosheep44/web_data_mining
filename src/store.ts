import _Vue, { PluginObject } from 'vue'

export class Store {
  tickCount: number = 0

  // Stats
  happiness: number = 0.75
  money: number = 3000
  rent:number = 300

  // Job searching variables
  jobSearchDuration:number = 4
  jobSearchTargetTick:number = -1
  potentialJobs:{}[];

  // Current job variables
  currentJob:{}
  employed:boolean = false

  // Money
  expenses: { name: string; price: number }[] = []
  income: number = 1000
  rent: number = 300

  // Stocks
  stocks: Stock[] = []

  // Job
  job: Job = { title: 'Unemployed', wage: 0, hours: 0 }
  isEmployed = () => this.job.title !== 'Unemployed'
  jobOffers: Job[] = []
  jobSearchDuration: number = 4
  jobSearchTargetTick: number = -1
  isJobSearching = () => this.jobSearchTargetTick != -1

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
