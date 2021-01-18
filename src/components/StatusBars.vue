<template>
  <div>
    <b-row align-v="center" v-for="bar in bars()" :key="bar.icon">
      <b-col cols="1" class="d-flex justify-content-end">
        <font-awesome-icon size="lg" :icon="bar.icon" />
      </b-col>
      <b-col cols="9" class="px-0">
        <b-progress class="m-3" :value="bar.value" :max="bar.max" :variant="bar.variant" />
      </b-col>
      <b-col cols="1 p-0">
        <p class="font-italic m-0">{{ bar.label }}</p>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class StatusBars extends Vue {
  bars() {
    return [
      {
        value: this.$store.happiness,
        max: 1,
        label: `${(this.$store.happiness * 100).toFixed(0)}%`,
        variant: 'warning',
        icon: 'smile',
      },
      {
        value: this.$store.money,
        max: 10000,
        label: `€${this.$store.money}`,
        variant: 'success',
        icon: 'hryvnia',
      },
    ]
  }
}
</script>

<style>
</style>