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
        text: 'Salary Invoice. $' + (this.$store.job.wage/12).toFixed(2)  + ' deposited into back account.',
      })
      this.$store.money += this.$store.job.wage/12
    }

    // expenses
    // transport expenses
    if(this.$store.transport != -1){
      const transport = this.$store.transports[this.$store.transport]
      this.$notify({
        group: 'expense',
        title: transport.name + " upkeep expense",
        text: '$' + transport.upkeep + " deducted from your account"
      })
    }
    // rent
    this.$store.money -= this.$store.rent
    const index = this.$store.expenses.findIndex((exp) => { return exp.name == 'Rent'})
    if(index == -1)    this.$store.expenses.push({ name:'Rent', price: this.$store.rent })
    else if(this.$store.expenses[index].price != this.$store.rent){
      this.$store.expenses[index].price = this.$store.rent
      this.$forceUpdate()
    }
    this.$forceUpdate()
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