<template>
  <b-container class="p-4 tools">
    <b-row align-v="center" class="my-3">
      <b-col cols="4"><h4>Ticks</h4></b-col>
      <b-col cols="2">{{ this.$store.tickCount }}</b-col>
      <b-col cols="4"> <b-form-input type="number" v-model="ticks"></b-form-input></b-col>
      <b-col cols="2"> <b-button @click="simulateTicks"> Simulate</b-button> </b-col>
    </b-row>

    <b-row align-v="center" class="my-3">
      <b-col cols="4"><h4>Happiness</h4></b-col>
      <b-col cols="8" class="justify-content-between d-flex">
        <b-button
          v-for="amount in [-5, -10, +10, +5]"
          :key="amount"
          @click="$store.happiness += amount / 100"
          pill
          :variant="amount < 0 ? 'outline-danger' : 'outline-success'"
        >
          {{ `${amount > 0 ? '+' : ''}${amount}` }}
        </b-button>
      </b-col>
    </b-row>

    <b-row align-v="center" class="my-3">
      <b-col cols="4"><h4>Money</h4></b-col>
      <b-col cols="8" class="justify-content-between d-flex">
        <b-button
          v-for="amount in [-1000, -10000, 10000, 1000]"
          :key="amount"
          @click="$store.money += amount"
          pill
          :variant="amount < 0 ? 'outline-danger' : 'outline-success'"
        >
          {{ `${amount > 0 ? '+' : ''}${Number(amount).toLocaleString()}` }}
        </b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang = "ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class DevTools extends Vue {
  private ticks: number = 0

  created() {
    this.$on('tick', () => console.log('tick'))
  }

  simulateTicks() {
    for (let i = 0; i < this.ticks; i++) this.$store.events.$emit('tick')
  }
}
</script>

<style lang="scss">
@import 'bootstrap/scss/_mixins.scss';
@import 'bootstrap/scss/_functions.scss';
@import 'bootstrap/scss/_variables.scss';

.tools {
  max-width: map-get($grid-breakpoints, sm) !important;
}

h4 {
  margin: 0;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>