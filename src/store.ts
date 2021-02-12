import _Vue, { PluginObject } from 'vue'
import { LUXURIES, PROPERTIES, TRANSPORTS } from './defaults'
import countryPrices from '@/assets/countries.json'

export class Store {
  tickCount: number = 0

  // Country
  country: string = 'Malta'
  currentCountry: Country = countryPrices['Malta']

  // Happiness
  happiness: number = 0.75
  constantHappinessDecay: number = -5
  happinessFactors: HappinessFactor[] = []
  propertyHappinessCap: number

  // Money
  money: number = 10000
  expenses: Expense[] = []
  income: number = 1000
  totalExpenses = () => this.expenses.reduce((sum, expense) => sum + expense.price, 0)

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

  // Property
  property: number = 0
  properties: Property[] = PROPERTIES

  // Time
  activities: Activity[] = []
  sleep: number = 8
  totalTime = () => {
    return this.activities.reduce((acc, act) => act.hours + acc, 0)
  }

  // Transport
  currentTransportTime: number = 0
  transport: number = 0
  transports: Transport[] = TRANSPORTS

  // Luxuries
  luxuryTime: number = 3
  standardLuxuryTime: number = 3
  currentLuxuryHappiness: number = 0
  luxuries: Luxury[] = LUXURIES

  events: _Vue = new _Vue()
}

interface Country {
  fastfood: number
  inexpensiveRest: number
  expensiveRest: number
  water: number
  soda: number
  coffee: number
  beer: number
  milk: number
  wine: number
  bread: number
  rice: number
  eggs: number
  cheese: number
  chicken: number
  beef: number
  apples: number
  banana: number
  oranges: number
  tomato: number
  potato: number
  onion: number
  lettuce: number
  onewaybus: number
  monthlybus: number
  gas: number
  car1: number
  car2: number
  basic: number
  mobiletariff: number
  internet: number
  monthlygym: number
  tennis: number
  cinema: number
  jeans: number
  dress: number
  runshoes: number
  leathershoes: number
  incityapRent: number
  outcityapRent: number
  incityapBuy: number
  outcityapBuy: number
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

////////////////////////////////////////////////////////////////////////
////////////////////////      EVENT     ////////////////////////////////
////////////////////////////////////////////////////////////////////////

export class Event {
  text: string = 'Event'

  effects: EventEffects = {}
  callback?: (Store) => void
  checkPrerequisites?: (Store) => boolean

  actions: { text: string; callback?: ($store: Store) => void; tooltip: string }[] = [
    {
      text: 'OK',
      tooltip: '',
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

export interface EventEffects {
  happiness?: number
  money?: number
}

////////////////////////////////////////////////////////////////////////
///////////////////////      PLUGIN     ////////////////////////////////
////////////////////////////////////////////////////////////////////////

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
