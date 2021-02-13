<template>
  <div>
    <h5 class="text-center">Happiness Factors</h5>
    <hr class="wide-separator" />

    <div class="px-5">
      <div
        class="d-flex justify-content-between align-items-center mb-5 px-1"
        v-b-tooltip.hover.rightbottom
        title="Your property will stop your happiness from ever going below this value."
      >
        <div>Property Cap</div>
        <div>{{ $store.propertyHappinessCap * 100 }}</div>
      </div>

      <div v-for="(factor, i) in $store.happinessFactors" :key="`factor-${i}`">
        <div class="d-flex justify-content-between align-items-center px-1" v-b-tooltip.hover.rightbottom :title="factor.description">
          <div>{{ factor.name }}</div>
          <div :class="colourText(factor.factor)">{{ factor.factor }}</div>
        </div>
      </div>

      <hr />
      <div class="d-flex justify-content-between align-items-center px-1">
        <strong>Total</strong>
        <strong :class="colourText(deltaHappiness())">{{ deltaHappiness() }}</strong>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({
  components: {},
})
export default class Happiness extends Vue {
  mounted() {
    this.$store.events.$on('start-game', this.startGame)
  }

  startGame() {
    // Set the happiness factors initially.
    this.$store.happinessFactors = [
      { name: 'Constant Factor', factor: this.$store.constantHappinessDecay, description: 'Happiness will always decrase by this much every month.' },
      { name: 'Sleep Factor', factor: 0, description: '8 hours of sleep is optimal. Sleeping less than this will cause you to become unhappy.' },
      { name: 'Work Factor', factor: 0, description: 'Working long hours takes it toll. The more hours you work the more unhappy you will be.' },
      { name: 'Luxury Factor', factor: 0, description: 'Luxuries provide some happiness every month, upgrade them in the Home tab.' },
      {
        name: 'Money Factor',
        factor: 0,
        description: 'Having expenses which your wage cannot cover will make you stressed and unhappy while surplus income will grant you peace of mind.',
      },
    ]
    this.calculateHappiness()

    // recalculate happiness monthly
    this.$store.events.$on('tick-month', this.calculateHappiness)
  }

  // Set the value of all of the factors
  calculateHappiness() {
    const sleepFactor = Math.ceil(Math.abs(this.$store.sleep - 8)) * 4
    this.setHappinessFactor('Sleep Factor', -sleepFactor)

    let workFactor = 0
    if (this.$store.job.hours > 8) workFactor = Math.ceil(Math.abs(this.$store.job.hours - 8)) * -4
    else workFactor = -2

    this.setHappinessFactor('Work Factor', workFactor)

    const luxuryFactor = this.$store.currentLuxuryHappiness
    this.setHappinessFactor('Luxury Factor', luxuryFactor)

    // Monthly wage over expenses, rounded to nearest 0.25, with 1 subtracted to make 1:1 ratio give 0 happiness
    let moneyRatio: number = 0
    if (this.$store.totalExpenses() == 0) moneyRatio = 0
    else moneyRatio = Math.round((this.$store.job.wage / (12 * this.$store.totalExpenses())) * 4) / 4 - 1
    this.setHappinessFactor('Money Factor', moneyRatio)

    this.$store.propertyHappinessCap = this.$store.properties[this.$store.property].happiness

    // calculate new happiness score
    this.$store.happiness += this.deltaHappiness() / 100
    this.$store.happiness = Math.min(1, Math.max(this.$store.propertyHappinessCap, this.$store.happiness))

    // sort the happiness factors for displaying
    this.$store.happinessFactors.sort((a, b) => {
      // zeros will always be at the end
      if (a.factor == 0) return 1
      else if (b.factor == 0) return -1

      // positive values should always come before negative values (if opposing signs)
      if (a.factor * b.factor < 0) {
        if (a.factor > 0) return -1
        return 1
      }

      // compare values with the same sign
      return (b.factor - a.factor) * (a.factor > 0 ? 1 : -1)
    })
  }

  setHappinessFactor(name: string, value: number) {
    const index = this.$store.happinessFactors.findIndex((luxury) => luxury.name == name)
    if (index != -1) {
      this.$store.happinessFactors[index].factor = value
    }
  }

  deltaHappiness() {
    return this.$store.happinessFactors.reduce((acc: number, factor) => acc + factor.factor, 0)
  }

  colourText(value) {
    if (value > 0) return 'text-success'
    else if (value == 0) return 'text-warning'
    return 'text-danger'
  }
}
</script>

<style>
</style>