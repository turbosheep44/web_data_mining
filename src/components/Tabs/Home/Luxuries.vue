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
      <b-form-input type="range" min="0" :max="maxLuxuryTime()" step="0.5" number v-model="$store.luxuryTime" @change="updateLuxuryTime"></b-form-input>
    </div>

    <!-- Luxury cards -->
    <b-card v-for="(luxury, i) in $store.luxuries" :key="luxury.name" class="my-2">
      <!-- description -->
      <font-awesome-icon :icon="icon(luxury.name)" class="mr-2" />
      <b>{{ luxury.name }}</b>
      <br />
      {{ luxury.description }}

      <!-- stats and purchase buttons -->
      <div class="d-flex justify-content-end align-items-center my-2">
        <div class="ml-3">
          <font-awesome-icon icon="smile" class="mr-1" />
          {{ luxury.happiness }}
        </div>
        <div class="ml-3">
          <font-awesome-icon icon="hryvnia" class="mr-1" />
          {{ getUpgradePrice (i) == -1 ? "---" : getUpgradePrice(i) }}
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
  created() {
    this.$store.luxuries = [
      { name: 'Television', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', tier: 0, basePrice: 150, happiness: 5, multiplier:4},
      { name: 'Pool', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', tier: 0, basePrice: 10000, happiness: 5, multiplier:3},
      { name: 'Computer', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', tier: 0, basePrice: 1000, happiness: 5, multiplier:2},
      { name: 'Air Conditioning', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', tier: 0, basePrice: 100, happiness: 5, multiplier:8},
      { name: 'Coffee Machine', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', tier: 0, basePrice: 20, happiness: 5, multiplier:4 },
    ]
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

  upgradeLuxury(i: number) {
    const luxury = this.$store.luxuries[i]
    if(luxury.tier == 4) return

    const newPrice = this.getUpgradePrice(i)
    if(this.$store.money < newPrice){
      this.$notify({
        group: 'notification',
        title: luxury.name + ' is too expensive',
        text: 'You cannot afford it. Please save up more money and try again later',
      })

      return
    }

    this.$store.luxuries[i].tier++
    this.$store.money -= newPrice
    this.$forceUpdate()
  }

  getUpgradePrice(i: number):number{
    const luxury = this.$store.luxuries[i]
    if(luxury.tier == 4){
      return -1
    }

    const mult = Math.pow(luxury.multiplier, luxury.tier+1)
    return luxury.basePrice*mult
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