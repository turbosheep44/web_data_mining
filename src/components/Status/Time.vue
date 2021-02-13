<template>
  <div class="px-2">
    <div class="d-flex justify-content-between align-items-center">
      <font-awesome-icon icon="user" />
      {{ age() }}
    </div>
    <div class="my-2 d-flex justify-content-between align-items-center">
      <font-awesome-icon icon="calendar" />
      {{ date() }}
    </div>
    <div class="d-flex justify-content-between">
      <div v-for="(active, i) in weekCounters()" :key="i" :class="['counter', { active: active }]"></div>
    </div>
  </div>
</template>

<script lang= "ts">
import { Component, Vue } from 'vue-property-decorator'

const TICK_MONTH = 4
const TICK_YEAR = 12 * TICK_MONTH

@Component({})
export default class Time extends Vue {
  mounted() {
    this.$store.events.$on('start-game', this.startGame)
  }

  startGame() {
    this.$store.events.$on('tick', this.onTick)
  }

  onTick() {
    this.$store.tickCount++
    if (this.$store.tickCount % 4 == 0) this.$store.events.$emit('tick-month')
    if (this.currentWeek() % 4 == 0) {
      this.$store.events.$emit('month_passed')
    }

    if (this.$store.jobSearchTargetTick != -1 && this.$store.jobSearchTargetTick == this.$store.tickCount) this.$store.events.$emit('jobs_found')
  }

  currentWeek() {
    return this.$store.tickCount % 4
  }

  weekCounters() {
    const weeks = (this.$store.tickCount % 4) + 1
    const display: boolean[] = []
    for (let i = 0; i < 4; i++) {
      display[i] = i < weeks
    }
    return display
  }

  date() {
    const year = 2000 + this.age()
    const month = Math.floor((this.$store.tickCount % TICK_YEAR) / TICK_MONTH)
    return new Date(year, month).toLocaleDateString('default', { month: 'short', year: 'numeric' })
  }
  age() {
    return 18 + Math.floor(this.$store.tickCount / TICK_YEAR)
  }
}
</script>

<style lang="scss">
.counter {
  width: 10px;
  height: 10px;
  background-color: gray;

  &.active {
    background-color: darken(lightskyblue, 10);
    box-shadow: 0 0 5px 1px lightskyblue;
  }
}
</style>