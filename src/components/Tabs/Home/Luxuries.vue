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
      <b-form-input type="range" min="0" max="10" step="0.5" number v-model="$store.luxuryTime" @change="updateLuxuryTime"></b-form-input>
    </div>

    <!-- Luxury cards -->
    <b-card v-for="luxury in $store.luxuries" :key="luxury.name" class="my-2">
      <font-awesome-icon :icon="icon(luxury.name)" class="mr-2" />
      <b>{{ luxury.name }}</b>
      <br />
      {{ luxury.description }}

      <div class="d-flex justify-content-end align-items-center">
        <div class="ml-3">
          <font-awesome-icon icon="smile" class="mr-1 text-warning" />
          10
        </div>
        <div class="ml-3">
          <font-awesome-icon icon="hryvnia" class="mr-1 text-success" />
          10
        </div>
        <b-btn variant="success" class="ml-3 py-1">Upgrade</b-btn>
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
      { name: 'Television', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
      { name: 'Pool', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
      { name: 'Computer', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
      { name: 'Air Conditioning', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
      { name: 'Coffee Machine', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    ]
  }

  icon(luxury: string) {
    return LUXURY_ICONS[luxury.toLowerCase()]
  }

  updateLuxuryTime() {
    // TODO: update logic for number of luxury hours changed
    const luxuries = this.$store.activities.find((act) => act.name == 'Luxuries') ?? { hours: 0 }
    luxuries.hours = this.$store.luxuryTime
  }
}
</script>

<style>
</style>