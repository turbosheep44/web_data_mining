<template>
  <div class="text-center p-4">
    <transition name="fade">
      <b-container v-if="visible" class="tools">
        <b-row align-v="center" class="my-3">
          <b-col cols="4"><h4>Game</h4></b-col>
          <b-col cols="4"> <b-button block @click="$store.events.$emit('start-game')">Start Game</b-button> </b-col>
          <b-col cols="4"> <b-button block @click="$store.events.$emit('end-game')">End Game</b-button> </b-col>
        </b-row>

        <b-row align-v="center" class="my-3">
          <b-col cols="4"><h4>Ticks</h4></b-col>
          <b-col cols="2" class="text-left">{{ this.$store.tickCount }}</b-col>
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

        <b-row align-v="center" class="my-3">
          <b-col cols="4"><h4>Job</h4></b-col>
          <b-col cols="4"><b-btn block @click="createJobOffers">Create Job Offers</b-btn></b-col>
        </b-row>

        <b-row align-v="center" class="my-3">
          <b-col cols="4"><h4>Events</h4></b-col>
          <b-col cols="4"> <b-button block @click="simulateEvent">Fire Event</b-button> </b-col>
        </b-row>
      </b-container>
    </transition>
    <b-button @click="visible = !visible">{{ visible ? 'Hide' : 'Show' }} Dev Tools</b-button>
  </div>
</template>

<script lang = "ts">
import { Component, Vue } from 'vue-property-decorator'
import { randomEvent } from '@/components/events'

@Component({})
export default class DevTools extends Vue {
  private ticks: number = 0
  private visible: boolean = false

  simulateTicks() {
    for (let i = 0; i < this.ticks; i++) this.$store.events.$emit('tick')
  }

  simulateEvent() {
    randomEvent(this.$store, 0)
  }

  createJobOffers() {
    this.$store.events.$emit('jobs-found')
  }
}
</script>

<style lang="scss">
@import 'bootstrap/scss/_mixins.scss';
@import 'bootstrap/scss/_functions.scss';
@import 'bootstrap/scss/_variables.scss';

.tools {
  max-width: map-get($grid-breakpoints, sm) !important;
  text-align: right;

  &.fade-enter-active,
  &.fade-leave-active {
    transition: opacity 0.5s;
  }
  &.fade-enter,
  &.fade-leave-to {
    opacity: 0;
  }
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
