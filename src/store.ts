import _Vue, { PluginObject } from 'vue'

export class Store {
  tickCount: number = 0

  // Stats
  happiness: number = 0.75
  money: number = 3000

  // Money
  expenses: Expense[] = []
  income: number = 1000
  rent: number = 300

  // Stocks
  stocks: Stock[] = []
  risk:number[] = [0.1, 0.2, 0.4]

  // Free time
  totalTime = () =>{
    return this.activities.reduce((acc, act) => (act.hours) + acc, 0)
  }

  // Job
  job: Job = { title: 'Unemployed', wage: 0, hours: 0 }
  isEmployed = () => this.job.title !== 'Unemployed'
  jobOffers: Job[] = []
  jobSearchDuration: number = 4
  jobSearchTargetTick: number = -1
  isJobSearching = () => this.jobSearchTargetTick != -1

  // Country
  country: string = 'Malta'

  // Property
  property: number = 0
  properties: Property[] = []

  // Time
  activities: Activity[] = []
  sleep: number = 8

  // Transport
  transport: number = -1
  transports: Transport[]

  // Luxuries
  luxuryTime: number = 3
  luxuries: Luxury[]

  events: _Vue = new _Vue()
}

interface Luxury {
  name: string
  description: string
}

interface Expense {
  name: string
  price: number
}

interface Activity {
  name: string
  hours: number
}

interface Stock {
  risk: string
  value: number[]
  owned: number
  visible: boolean
  invested:number
}

interface Job {
  title: string
  wage: number
  hours: number
}

interface Property {
  name: string
  description: string
  price: number
  isRent: boolean
  transportCostModifier: number
  happiness: number
}

interface Transport {
  name: string
  description: string
  purchased: boolean
  price: number
  upkeep: number
  time: number
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
