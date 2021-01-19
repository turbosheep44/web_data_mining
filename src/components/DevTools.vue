<template>
  <div class="text-center p-4">
    <transition name="fade">
      <b-container v-if="visible" class="tools">
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
          <b-col cols="4"><h4>Expenses</h4></b-col>
          <b-col cols="6"> <b-form-textarea type="number" v-model="expenses" no-resize size="sm" rows="3"></b-form-textarea></b-col>
          <b-col cols="2"> <b-button @click="updateExpenses">Update</b-button> </b-col>
        </b-row>

        <b-row align-v="center" class="my-3">
          <b-col cols="4"><h4>Income</h4></b-col>
          <b-col cols="6"> <b-form-input type="number" v-model="$store.income" number></b-form-input></b-col>
        </b-row>

        <b-row align-v="center" class="my-3">
          <b-col cols="4"><h4>Job</h4></b-col>
          <b-col cols="4"><b-btn block @click="createJobOffers">Create Job Offers</b-btn></b-col>
        </b-row>

        <b-row align-v="center" class="my-3">
          <b-col cols="4"><h4>Activities</h4></b-col>
          <b-col cols="6"> <b-form-textarea type="number" v-model="activities" no-resize size="sm" rows="3"></b-form-textarea></b-col>
          <b-col cols="2"> <b-button @click="updateActivities">Update</b-button> </b-col>
        </b-row>
      </b-container>
    </transition>
    <b-button @click="visible = !visible">{{ visible ? 'Hide' : 'Show' }} Dev Tools</b-button>
  </div>
</template>

<script lang = "ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class DevTools extends Vue {
  private ticks: number = 0
  private expenses: string = 'School:25 Electricity:130 Water:80 Taxes:350 Mortgage:250 Basics:80'
  private activities: string = 'Sleep:8 Luxuries:3 Work:10 Free:3'
  private visible: boolean = false

  created() {
    this.$on('tick', () => console.log('tick'))
    this.updateExpenses()
    this.updateActivities()
  }

  simulateTicks() {
    for (let i = 0; i < this.ticks; i++) this.$store.events.$emit('tick')
  }

  updateExpenses() {
    this.$store.expenses = []
    for (const expense of this.expenses.split(' ')) {
      const [name, price] = expense.split(':')
      this.$store.expenses.push({ name, price: parseFloat(price) })
    }
  }
  updateActivities() {
    this.$store.activities = []
    for (const activity of this.activities.split(' ')) {
      const [name, price] = activity.split(':')
      this.$store.activities.push({ name, hours: parseFloat(price) })
    }
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