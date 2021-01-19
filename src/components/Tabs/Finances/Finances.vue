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
    this.$store.events.$on('tick-month', this.calculateExpensesAndRevenues)
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
        text: 'Salary Invoice. $' + this.$store.job.wage + ' deposited into back account.',
      })
      this.$store.money += this.$store.job.wage
    }

    // expenses
    this.$store.money -= this.$store.rent
    this.$notify({
      group: 'expense',
      title: 'Rent',
      text: '$' + this.$store.rent + ' for Rent removed from account.',
    })
  }
}
</script>

<style lang="scss">
</style>