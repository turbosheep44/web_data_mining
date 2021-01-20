<template>
  <div>
    <h5 class="text-center">Country</h5>
    <hr class="wide-separator" />

    <!-- Country -->
    <div class="d-flex justify-content-between align-items-center mt-3">
      <b-dropdown v-model="selectedCountry" menu-class="w-100" block split variant="outline-dark" class="mr-4 flex-fill">
        <template #button-content>
          <div class="text-left">
            {{ selectedCountry }}
          </div>
        </template>
        <b-dropdown-item v-for="country of countries" :key="country" :value="country" @click="selectedCountry = country">
          {{ country }}
        </b-dropdown-item>
      </b-dropdown>

      <div id="relocate">
        <b-button variant="info" @click="relocate" :disabled="selectedCountry == $store.country">Relocate</b-button>
      </div>

      <b-tooltip target="relocate" triggers="hover" placement="rightbottom">
        Relocating to a new country costs €3000. Some of your belongings like you house will be automatically sold. In a new country, there
        are new oppotunities for employment and a different cost of living.
      </b-tooltip>
    </div>

    <div class="mt-4">
      <!-- header -->
      <transition name="fade">
        <b-row v-if="selectedCountry != $store.country" class="country-expenses-header">
          <b-col></b-col>
          <b-col class="text-right font-weight-bold">{{ selectedCountry }}</b-col>
          <b-col class="text-right font-weight-bold">{{ $store.country }}</b-col>
        </b-row>
      </transition>

      <!-- breakdown -->
      <b-row v-for="{ name, price, comparePrice } in allExpenses()" :key="name" align-v="center" align-content="between">
        <b-col>{{ name }}</b-col>
        <transition name="fade">
          <b-col
            :class="['text-right country-expense', comparePrice > price ? 'text-danger' : 'text-success']"
            v-if="selectedCountry != $store.country"
          >
            {{ comparePrice | money }}
          </b-col>
        </transition>
        <b-col class="text-right text-danger">{{ price | money }}</b-col>
      </b-row>

      <!-- total -->
      <hr class="my-2" />
      <b-row class="d-flex justify-content-between align-items-center">
        <b-col>Total</b-col>
        <b-col
          :class="['text-right font-weight-bold', totalExpenses(selectedCountry) > totalExpenses() ? 'text-danger' : 'text-success']"
          v-if="selectedCountry != $store.country"
        >
          {{ totalExpenses(selectedCountry) | money }}
        </b-col>
        <b-col class="text-right font-weight-bold text-danger">{{ totalExpenses() | money }}</b-col>
      </b-row>
    </div>
  </div>
</template>

<script lang = "ts">
import { Component, Vue } from 'vue-property-decorator'
import info from '@/assets/results.json'

@Component({})
export default class Country extends Vue {
  private countries: string[] = []
  private selectedCountry: string = this.$store.country

  private countryExpenses: { [country: string]: Expense[] } = {}

  created() {
    this.countries = Object.keys(info).sort()
    this.countries.forEach((country, i) => {
      this.countryExpenses[country] = [
        { name: 'Utilities', price: 10 + i },
        { name: 'Internet', price: 10 + i },
        { name: 'Clothing', price: 10 + i },
      ]
      // parseFloat(country['Utilities (Monthly)'][0][1]),
      // parseFloat(country['Utilities (Monthly)'][2][1]),
      // parseFloat(country['Clothing And Shoes'][0][1]) + parseFloat(country['Clothing And Shoes'][1][1]),
    })
  }

  relocate() {
    // TODO: ADD RELOCATE LOGIC HERE
    console.log(`relocate from ${this.$store.country} to ${this.selectedCountry}`)

    this.$store.country = this.selectedCountry
  }

  expenses(country: string = this.$store.country): Expense[] {
    return this.countryExpenses[country]
  }

  totalExpenses(country: string = this.$store.country): number {
    return this.expenses(country).reduce((acc, curr) => acc + curr.price, 0)
  }

  allExpenses() {
    const otherExpenses = this.expenses(this.selectedCountry)
    const expenses = this.expenses()
    expenses.forEach(function (e, i) {
      e['comparePrice'] = otherExpenses[i].price
    })
    return expenses
  }
}

interface Expense {
  name: string
  price: number
}
</script>

<style lang="scss">
.country-expenses-header,
.country-expense {
  max-height: 50px;

  &.fade-enter-active,
  &.fade-leave-active {
    transition: all 1s;
  }

  &.fade-enter,
  &.fade-leave-to {
    opacity: 0;
    max-height: 0px;
  }
}
</style>