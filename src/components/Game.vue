<template>
  <div>
    <Status />
    <Tabs />
    <DevTools />

    <transition name="overlay-fade">
      <EventOverlay v-if="this.event != null" :event="this.event" @dismiss="nextEvent" />
    </transition>
  </div>
</template>




<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Tabs from '@/components/Tabs/Tabs.vue'
import Status from '@/components/Status/Status.vue'
import DevTools from '@/components/DevTools.vue'
import EventOverlay from '@/components/EventOverlay.vue'

import { Event } from '@/store'

@Component({
  components: { Tabs, Status, DevTools, EventOverlay },
})
export default class Game extends Vue {
  private tick: number

  private event: Event | null = null
  private eventBacklog: Event[] = []

  mounted() {
    this.tick = setInterval(() => {
      this.$store.events.$emit('tick')
    }, 1000)

    this.$store.events.$on('tick-month', this.calculateHappiness)

    this.$store.events.$on('event', (e: Event) => {
      if (!this.event) this.event = e
      else this.eventBacklog.push(e)
    })


    // Set the happiness factors initially.
    this.$store.happinessFactors = [
      {name:'Constant Factor', factor:this.$store.constantHappinessDecay},
      {name:'Sleep Factor', factor:0},
      {name:'Work Factor', factor:0},
      {name:'Luxury Factor', factor:0},
      {name:'Money Factor', factor:0},
      {name:'Property Cap', factor:0},
    ]
  }

  // Set the value of all of the factors
  calculateHappiness(){
    const sleepFactor = Math.ceil(Math.abs(this.$store.sleep-8)) * 4
    this.setHappinessFactor("Sleep Factor", sleepFactor)

    let workFactor = this.$store.job.hours > 8 ? Math.ceil(Math.abs(this.$store.job.hours - 8)) * 4 : 0
    workFactor = this.$store.job.hours == 0 ? 2 : workFactor
    this.setHappinessFactor("Work Factor", workFactor)
    
    const luxuryFactor = this.$store.currentLuxuryHappiness
    this.setHappinessFactor("Luxury Factor", luxuryFactor)

    const totalExpenses = this.$store.expenses.reduce((sum, expense) => sum + expense.price,0)
    // Monthly wage over expenses, rounded to nearest 0.25, with 1 subtracted to make 1:1 ratio give 0 happiness
    const moneyRatio = Math.round((this.$store.job.wage+1)/(12*totalExpenses* 4)) / 4-1   
    this.setHappinessFactor("Money Factor", moneyRatio)

    const tempHappiness = (moneyRatio + luxuryFactor - sleepFactor - workFactor - this.$store.constantHappinessDecay)/100 + this.$store.happiness
    const propertyCapped = Math.min(1,Math.max(this.$store.properties[this.$store.property].happiness/100, tempHappiness))
    this.setHappinessFactor("Property Cap", propertyCapped)

    this.$store.happiness = propertyCapped
  }

  setHappinessFactor(name:string, value:number){
    const index = this.$store.happinessFactors.findIndex((luxury) => luxury.name==name)
    if(index != -1){
      this.$store.happinessFactors[index].factor = value
    }
  }



  nextEvent() {
    this.event = null

    // if there is a next event, wait until the overlay has faded out and then bring it back in with the new event
    const nextEvent = this.eventBacklog.pop() || null
    if (nextEvent) setTimeout(() => (this.event = nextEvent), 250)
  }

  beforeDestroy() {
    clearInterval(this.tick)
  }
}
</script>




<style lang="scss">
.overlay-fade-enter-active,
.overlay-fade-leave-active {
  transition: opacity 0.25s;

  .overlay-content {
    transition: transform 0.25s;
  }
}
.overlay-fade-enter,
.overlay-fade-leave-to {
  opacity: 0;

  .overlay-content {
    transform: translateY(15%);
  }
}

@import 'bootstrap/scss/_mixins.scss';
@import 'bootstrap/scss/_functions.scss';
@import 'bootstrap/scss/_variables.scss';

.fa-smile {
  color: darken(map-get($theme-colors, warning), 4);
}
.fa-hryvnia {
  color: map-get($theme-colors, success);
}
.fa-bicycle {
  color: map-get($theme-colors, info);
}
</style>
