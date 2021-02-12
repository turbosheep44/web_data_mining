import _Vue, { PluginObject } from 'vue'

export class Store {
  tickCount: number = 0

  // Happiness
  happiness: number = 0.75
  constantHappinessDecay: number = -5
  happinessFactors: HappinessFactor[] = []
  propertyHappinessCap: number

  // Money
  money: number = 10000
  expenses: Expense[] = []
  income: number = 1000
  rent: number = 300
  totalExpenses = () => this.expenses.reduce((sum, expense) => sum + expense.price, 0)

  // Stocks
  stocks: Stock[] = []
  risk: number[] = [0.1, 0.2, 0.4]

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
  totalTime = () => {
    return this.activities.reduce((acc, act) => act.hours + acc, 0)
  }

  // Transport
  currentTransportTime: number = 0
  transport: number = -1
  transports: Transport[]

  // Luxuries
  luxuryTime: number = 3
  standardLuxuryTime: number = 3
  currentLuxuryHappiness: number = 0
  luxuries: Luxury[]

  events: _Vue = new _Vue()
}

interface HappinessFactor {
  name: string
  factor: number
  description: string
}

interface Luxury {
  name: string
  description: string
  tier: number
  basePrice: number
  baseHappiness: number
  currentHappiness: number
  multiplier: number
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
  invested: number
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

export class Event {
  text: string = 'Event'

  effects: { happiness?: number; money?: number } = {}

  actions: { text: string; callback: () => void }[] = [
    {
      text: 'OK',
      callback: () => {
        null
      },
    },
  ]
  isBarrierDismissable: boolean = true

  constructor(data: Partial<Event>) {
    Object.assign(this, data)
  }
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
