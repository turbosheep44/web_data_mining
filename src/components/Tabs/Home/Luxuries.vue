<template>
  <div>
    <h5 class="text-center">Luxuries</h5>
    <hr class="wide-separator" />

    <!-- Time Slider -->
    <div class="my-3">
      <div class="d-flex align-items-center justify-content-between">
        <h6 class="font-weight-bold">Time spent on Luxuries</h6>
        <h6 class="mt-2">{{ $store.luxuryTime }} hrs</h6>
      </div>
      <div class="d-flex align-items-center justify-content-between">
        <h6 class="font-weight-bold">Happiness Gained p/w</h6>
        <h6 class="mt-2">{{ getTotalHappiness() }} {{ getHappinessPerWeek() }} <font-awesome-icon icon="smile" class="mr-1" /></h6>
      </div>
      <b-form-input type="range" min="0" :max="maxLuxuryTime()" step="0.5" number v-model="$store.luxuryTime" @change="updateLuxuryTime"></b-form-input>
    </div>

    <!-- Luxury cards -->
    <b-card v-for="(luxury, i) in $store.luxuries" :key="luxury.name" class="my-2">
      <!-- description -->
      <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex justify-content-start align-items-center">
          <font-awesome-icon :icon="icon(luxury.name)" class="mr-2" />
          <b>{{ luxury.name }}</b>
        </div>
        <div class="ml-3" v-b-tooltip.hover.bottomright title="This is the amount of happiness you are currently receiving from this luxury.">
          <font-awesome-icon icon="smile" class="mr-1" />
          {{ getCurrentHappiness(i) }}
        </div>
      </div>
      <br />
      {{ luxury.description }}

      <!-- stats and purchase buttons -->
      <div class="d-flex justify-content-end align-items-center my-2">
        <div
          class="ml-3 d-flex align-items-center my-2"
          v-b-tooltip.hover.bottomright
          title="This is the additional happiness you will receive from this luxury once you upgrade it."
        >
          <font-awesome-icon icon="plus" class="mr-1" size="xs" />
          <font-awesome-icon icon="smile" class="mr-1" size="sm" />
          <div>{{ luxury.baseHappiness - luxury.tier - 1 }}</div>
        </div>

        <div class="ml-3">
          <font-awesome-icon icon="hryvnia" class="mr-1" />
          {{ luxury.tier != 4 ? getUpgradePrice(i) : '-' | money }}
        </div>

        <b-btn v-if="luxury.tier < 4" variant="success" class="ml-3 py-1" @click="upgradeLuxury(i)">{{ luxury.tier == 0 ? 'Purchase' : 'Upgrade' }}</b-btn>
        <b-btn v-else variant="outline-dark" disabled class="ml-3 py-1">Max Tier</b-btn>
      </div>

      <!-- tier indicator -->
      <div class="d-flex justify-content-end align-items-center indicator-group">
        <div v-for="e in 4" :key="e" :class="['indicator', { 'indicator-active': e <= luxury.tier }]"></div>
      </div>
    </b-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

const LUXURY_ICONS = {
  television: 'tv',
  pool: 'swimming-pool',
  computer: 'laptop',
  'air conditioning': 'fan',
  'coffee machine': 'coffee',
}

@Component({})
export default class Luxuries extends Vue {
  mounted() {
    this.$store.events.$on('start-game', this.startGame)
  }

  startGame() {
    this.$store.activities.push({ name: 'Luxuries', hours: this.$store.luxuryTime })
    this.$store.events.$on('relocate', this.relocated)

    this.setPrices()
  }

  setPrices() {
    const base = this.$store.currentCountry['basic']
    const multipliers = [1.5, 100.0, 10.0, 1.0, 0.2]
    this.$store.luxuries.forEach((luxury, i) => {
      luxury.basePrice = multipliers[i] * base
    })
  }

  relocated() {
    this.setPrices()
    this.$forceUpdate()
  }

  icon(luxury: string) {
    return LUXURY_ICONS[luxury.toLowerCase()]
  }

  maxLuxuryTime() {
    return 24 - this.$store.totalTime() + this.currentLuxuryTime()
  }

  currentLuxuryTime() {
    const luxuries = this.$store.activities.find((act) => act.name == 'Luxuries') ?? { hours: 0 }
    return luxuries.hours
  }

  updateLuxuryTime() {
    const luxuries = this.$store.activities.find((act) => act.name == 'Luxuries') ?? { hours: 0 }
    luxuries.hours = this.$store.luxuryTime
  }

  getCurrentHappiness(i: number) {
    const luxury = this.$store.luxuries[i]

    let total = 0
    for (let j = 0; j < luxury.tier; j++) total += luxury.baseHappiness - j - 1

    return total
  }

  getHappinessPerWeek() {
    let hpw = this.getTotalHappiness()

    const multiplier = this.$store.luxuryTime / this.$store.standardLuxuryTime
    hpw = Math.round(hpw * multiplier * 4) / 4

    this.$store.currentLuxuryHappiness = hpw

    return hpw
  }

  getTotalHappiness() {
    return this.$store.luxuries.reduce((pv, cv) => {
      return pv + cv.currentHappiness
    }, 0)
  }

  upgradeLuxury(i: number) {
    const luxury = this.$store.luxuries[i]
    if (luxury.tier == 4) return

    const newPrice = this.getUpgradePrice(i)
    if (this.$store.money < newPrice) {
      this.$notify({
        group: 'notification',
        title: luxury.name + ' is too expensive',
        text: 'You cannot afford it. Please save up more money and try again later',
      })

      return
    }

    this.$store.luxuries[i].tier++
    this.$store.money -= newPrice
    this.$store.luxuries[i].currentHappiness += luxury.baseHappiness - luxury.tier
    this.$forceUpdate()
  }

  getUpgradePrice(i: number) {
    const luxury = this.$store.luxuries[i]
    const mult = Math.pow(luxury.multiplier, luxury.tier + 1)
    return luxury.basePrice * mult
  }
}
</script>

<style lang="scss">
@import 'bootstrap/scss/_mixins.scss';
@import 'bootstrap/scss/_functions.scss';
@import 'bootstrap/scss/_variables.scss';

.indicator-group {
  margin: 0 (-$spacer * 1.25) (-$spacer * 1.25) (-$spacer * 1.25);

  .indicator {
    width: 25%;
    height: 0.25em;
    background-color: lightgray;
    transition: background-color 0.4s;

    &-active {
      background-color: darken($color: lightblue, $amount: 10);
    }

    &:not(:first-child) {
      margin-left: 1%;
    }
    &:not(:last-child) {
      margin-right: 1%;
    }
  }
}
</style>