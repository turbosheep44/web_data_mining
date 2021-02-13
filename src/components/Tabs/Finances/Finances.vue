<template>
  <ColumnView>
    <template #first> <Work /> </template>
    <template #second> <Stocks /> </template>
    <template #third> <Expenses /> </template>
  </ColumnView>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import ColumnView from '@/components/Tabs/ColumnView.vue'
import Expenses from '@/components/Tabs/Finances/Expenses.vue'
import Stocks from '@/components/Tabs/Finances/Stocks.vue'
import Work from '@/components/Tabs/Finances/Work.vue'

@Component({
  components: { ColumnView, Expenses, Stocks, Work },
})
export default class Finances extends Vue {
  mounted() {
    this.$store.events.$on('start-game', this.startGame)
  }

  startGame() {
    this.$store.expenses.push({ name: 'Food', price: 0 })
    this.$store.expenses.push({ name: 'Basic Utilities', price: 0 })

    this.$store.events.$on('relocate', this.updatePrices)
    this.$store.events.$on('tick-month', this.calculateExpensesAndRevenues)

    this.updatePrices()
  }

  updatePrices() {
    const update = (expenseName, newPrice) => {
      const expense = this.$store.expenses.find((expense) => expense.name == expenseName)
      if (expense) expense.price = newPrice
    }

    update('Food', 50 * this.$store.currentCountry['water'] + 50 * this.$store.currentCountry['bread'])
    update('Basic Utilities', this.$store.currentCountry['basic'] * 2)
  }

  calculateExpensesAndRevenues() {
    // clear notifications
    this.$notify({ group: 'expense', clean: true })
    this.$notify({ group: 'revenue', clean: true })

    // wage income
    if (this.$store.isEmployed()) {
      this.$notify({
        group: 'revenue',
        title: 'Salary!',
        text: 'Salary Invoice. $' + (this.$store.job.wage / 12).toFixed(2) + ' deposited into back account.',
      })
      this.$store.money += this.$store.job.wage / 12
    }

    // expenses
    this.$store.money -= this.$store.totalExpenses()

    this.$forceUpdate()
  }
}
</script>

<style lang="scss">
</style>