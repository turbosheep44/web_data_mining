
<template>
  <div>
    <!-- Title -->
    <h5 class="text-center">Expenses</h5>
    <hr class="wide-separator" />

    <!-- Pie Chart -->
    <div class="d-flex justify-content-center">
      <div ref="chartContainer" style="width: 100%; height: 100%">
        <PieChart :chart-data="expenses()" :options="options()"></PieChart>
      </div>
    </div>

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
import { Component, Ref, Vue } from 'vue-property-decorator'
import PieChart from '@/components/Tabs/Finances/PieChart.vue'

const COLORS = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf']

@Component({
  components: { PieChart },
})
export default class Expenses extends Vue {
  private showLegend: boolean = true
  @Ref()
  private chartContainer: HTMLDivElement

  mounted() {
    this.showLegend = this.chartContainer.getBoundingClientRect().width > 200
  }

  options() {
    return {
      aspectRatio: 1,
      onResize: (_: Chart, { width }: { width: number }) => {
        this.showLegend = width > 200
      },

      legend: {
        display: this.showLegend,
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
  }

  expenses() {
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
