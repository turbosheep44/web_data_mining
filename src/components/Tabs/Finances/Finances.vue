<template>
  <b-container fluid="sm">
    <b-row align-v="start" align-h="center">
      <b-col xl="4" md="6" sm="10" class="mb-4"><Work /></b-col>
      <b-col xl="4" md="6" sm="10" class="mb-4"><Stocks /></b-col>
      <b-col xl="4" md="6" sm="10" class="mb-4"><Expenses /></b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Expenses from '@/components/Tabs/Finances/Expenses.vue'
import Stocks from '@/components/Tabs/Finances/Stocks.vue'
import Work from '@/components/Tabs/Finances/Work.vue'

@Component({
  components: { Expenses, Stocks, Work },
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
@import 'bootstrap/scss/_mixins.scss';
@import 'bootstrap/scss/_functions.scss';
@import 'bootstrap/scss/_variables.scss';

.wide-separator {
  width: 95%;
  // margin-left: -10%;
  background-color: #999;

  margin-bottom: ($spacer * 0.5);
  margin-top: 0;
}
</style>