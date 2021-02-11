import _Vue, { PluginObject } from 'vue'

export class Store {
  tickCount: number = 0

  //Country
  currentCountry: Country = {
    fastfood: 0,
    inexpensiveRest: 0,
    expensiveRest: 0,
    water: 0,
    soda: 0,
    coffee: 0,
    beer: 0,
    milk: 0,
    wine: 0,
    bread: 0,
    rice: 0,
    eggs: 0,
    cheese: 0,
    chicken: 0,
    beef: 0,
    apples: 0,
    banana: 0,
    oranges: 0,
    tomato: 0,
    potato: 0,
    onion: 0,
    lettuce: 0,
    onewaybus: 0,
    monthlybus: 0,
    gas: 0,
    car1: 0,
    car2: 0,
    basic: 0,
    mobiletariff: 0,
    internet: 0,
    monthlygym: 0,
    tennis: 0,
    cinema: 0,
    jeans: 0,
    dress: 0,
    runshoes: 0,
    leathershoes: 0,
    incityapRent: 0,
    outcityapRent: 0,
    incityapBuy: 0,
    outcityapBuy: 0
  }

  // Happiness
  happiness: number = 0.75
  constantHappinessDecay:number = 5
  happinessFactors: HappinessFactor[] = []

  // Money
  money: number = 10000
  expenses: Expense[] = []
  income: number = 1000
  rent: number = 300

  // Stocks
  stocks: Stock[] = []
  risk: number[] = [0.1, 0.2, 0.4]

  // Job
  job: Job = { title: 'Unemployed', wage: 0, hours: 0 }
  isEmployed = () => this.job.title !== 'Unemployed'
  jobOffers: Job[] = []
  jobSearchDuration: number = 12
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
  currentTransportTime:number = 0
  transport: number = -1
  transports: Transport[]

  // Luxuries
  luxuryTime: number = 3
  standardLuxuryTime: number = 3
  currentLuxuryHappiness:number = 0
  luxuries: Luxury[]

  events: _Vue = new _Vue()
}

interface Country{
  fastfood: number,
    inexpensiveRest: number,
    expensiveRest: number,
    water: number,
    soda: number,
    coffee: number,
    beer: number,
    milk: number,
    wine: number,
    bread: number,
    rice: number,
    eggs: number,
    cheese: number,
    chicken: number,
    beef: number,
    apples: number,
    banana: number,
    oranges: number,
    tomato: number,
    potato: number,
    onion: number,
    lettuce: number,
    onewaybus: number,
    monthlybus: number,
    gas: number,
    car1: number,
    car2: number,
    basic: number,
    mobiletariff: number,
    internet: number,
    monthlygym: number,
    tennis: number,
    cinema: number,
    jeans: number,
    dress: number,
    runshoes: number,
    leathershoes: number,
    incityapRent: number,
    outcityapRent: number,
    incityapBuy: number,
    outcityapBuy: number
}

interface HappinessFactor {
  name:string
  factor:number
}

interface Luxury {
  name: string
  description: string
  tier: number
  basePrice: number
  baseHappiness: number 
  currentHappiness :number
  multiplier : number
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
