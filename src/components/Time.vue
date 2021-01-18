<template>
  <div>
    {{ age() }}
    <br />
    {{ date() }}
    <br />
    <div class="d-flex justify-content-between">
      <div ref="counters" class="counter active"></div>
      <div ref="counters" class="counter active"></div>
      <div ref="counters" class="counter"></div>
      <div ref="counters" class="counter"></div>
    </div>
  </div>
</template>

<script lang= "ts">
import { Component, Ref, Vue } from 'vue-property-decorator'

const TICK_MONTH = 4
const TICK_YEAR = 12 * TICK_MONTH

@Component({})
export default class Time extends Vue {
  @Ref('counters') readonly counters!: HTMLDivElement[]

  created() {
    this.$store.events.$on('tick', this.onTick)
    this.$store.events.$on('tick', this.weekCounter)
  }

  onTick() {
    this.$store.tickCount++
  }

  weekCounter() {
    console.log(this.counters)
    console.log(this.$refs.counters)
    const i = this.counters.findIndex((counter) => {
      return !counter.classList.contains('active')
    })

    if (i != -1) this.counters[i].classList.add('active')
    else this.counters.forEach((counter) => counter.classList.remove('active'))
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
  background-color: lightskyblue;

  &.active {
    background-color: darken(lightskyblue, 10);
    box-shadow: 0 0 5px 1px lightskyblue;
  }
}
</style>