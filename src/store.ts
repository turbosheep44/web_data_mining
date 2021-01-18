import _Vue, { PluginObject } from 'vue'

export class Store {
  tickCount: number = 0

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

  events: _Vue = new _Vue()
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
