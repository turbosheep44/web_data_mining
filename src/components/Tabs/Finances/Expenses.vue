
<template>
  <div>
    <!-- Title -->
    <h5 class="text-center">Expenses</h5>
    <hr class="wide-separator" />

    <!-- Pie Chart -->
    <PieChart :chart-data="expenseData()" :options="options" style="height: 300px"></PieChart>

    <!-- Totals -->
    <div class="mt-4 d-flex justify-content-between align-items-center">
      <span>Expenses</span>
      <span class="text-right font-weight-bold text-danger">€{{ totalExpenses().toFixed(2) }}</span>
    </div>

    <div class="d-flex justify-content-between align-items-center">
      <span>Income</span>
      <span class="text-right font-weight-bold text-success">€{{ totalIncome().toFixed(2) }}</span>
    </div>
    <hr class="my-2" />
    <div class="d-flex justify-content-between align-items-center">
      <span>Total</span>
      <span :class="['text-right font-weight-bold', `text-${totalIncome() - totalExpenses() > 0 ? 'success' : 'danger'}`]">
        €{{ Math.abs(totalIncome() - totalExpenses()).toFixed(2) }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PieChart, { COLORS } from '@/components/Tabs/Charts/PieChart.vue'

@Component({
  components: { PieChart },
})
export default class Expenses extends Vue {
  private options = {
    maintainAspectRatio: false,
    responsive: true,
    legend: {
      position: 'left',
      labels: { boxWidth: 15, fontSize: 14 },
    },
    tooltips: {
      displayColors: false,
      callbacks: {
        label: (item: any, data: any) => {
          const label = data.labels[item.index] || ''
          const value = data.datasets[item.datasetIndex].data[item.index]
          return `${label}: €${value.toFixed(2)}`
        },
      },
    },
  }

  expenseData() {
    return {
      labels: this.$store.expenses.map((expense) => expense.name),
      datasets: [
        {
          data: this.$store.expenses.map((expense) => expense.price),
          backgroundColor: ({ dataIndex }: any) => {
            return COLORS[dataIndex % COLORS.length]
          },
          borderColor: '#fff',
          borderWidth: 3,
        },
      ],
    }
  }

  totalExpenses(): number {
    return this.$store.expenses.reduce((acc, expense) => acc + expense.price, 0)
  }
  totalIncome(): number {
    return this.$store.income
  }
}
</script>

<style lang="scss">
</style>
