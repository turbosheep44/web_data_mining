<template>
  <div>
    <h5 class="text-center">Stocks</h5>
    <hr class="wide-separator" />

    <b-card v-for="(stock, i) in stocks()" :key="i" no-body class="my-3">
      <!-- Header -->
      <b-card-header @click="toggleVisible(i)">
        <div class="d-flex justify-content-between align-items-center toggle-header">
          <h6 class="mb-0">{{ stock.risk }} Risk</h6>
          <span class="text-right font-italic">Profit: €{{((stock.owned * stock.value[stock.value.length - 1]) - stock.invested).toFixed(2)}}</span>
        </div>
      </b-card-header>

      <!-- Body -->
      <b-collapse :id="`stock-${i}`" v-model="stock.visible">
        <b-card-body>
          <!-- Graph -->
          <LineChart
            :chart-data="chartData(stock.value)"
            :options="chartOptions(stock.value)"
            class="mb-2"
            style="max-height: 150px"
          ></LineChart>

          <!-- Controls -->
          <div class="d-flex justify-content-center align-items-center">
            <b-button squared variant="outline-danger" class="mx-1 px-2" @click="sellStock(i, 5)">Sell 5</b-button>
            <b-button squared variant="outline-danger" class="mx-1 px-2" @click="sellStock(i, 1)">Sell 1</b-button>
            <span class="mx-1 text-center">
              {{ stock.owned }} <br />
              €{{ (stock.owned * stock.value[stock.value.length - 1]).toFixed(2) }}
            </span>
            <b-button squared variant="outline-success" class="mx-1 px-2" @click="buyStock(i, 1)">Buy 1</b-button>
            <b-button squared variant="outline-success" class="mx-1 px-2" @click="buyStock(i, 5)">Buy 5</b-button>
          </div>
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import LineChart from '@/components/Tabs/Finances/LineChart.vue'

const HISTORY_LENGTH = 12

@Component({
  components: { LineChart },
})
export default class Stocks extends Vue {
  private startMonth: number



  mounted() {
    this.$store.events.$on('tick-month', this.updateStocks)
    this.$store.stocks = [
      {
        risk: 'Low',
        value: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        owned: 0,
        visible: true,
        invested:0
      },
      {
        risk: 'Medium',
        value: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        owned: 0,
        visible: false,
        invested:0

      },
      {
        risk: 'High',
        value: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        owned: 0,
        visible: false,
        invested:0

      },
    ]
    this.updateStocks()
  }

  buyStock(stockId:number, amount:number){
    const value = this.$store.stocks[stockId].value[this.$store.stocks[stockId].value.length - 1] * amount
    if(value > this.$store.money){
       this.$notify({
        group: 'notification',
        title: 'Not enough money!',
        text: 'You cannot afford '+amount+' of Stock ' + stockId +' ($ ' +value.toFixed(2)+ ')'
      })
    }else{
      this.$store.stocks[stockId].owned += amount
      this.$store.stocks[stockId].invested += value
      this.$store.money -= value
    }

  }

  sellStock(stockId:number, amount:number){
    if(this.$store.stocks[stockId].owned < amount){
      this.$notify({
        group: 'notification',
        title: 'You do not own ' + amount + ' stocks of Stock ' + stockId,
        text: 'Note: You currently own ' + this.$store.stocks[stockId].owned + ' of this stock.'
      })
    }else{
      const oldValue = this.$store.stocks[stockId].value[this.$store.stocks[stockId].value.length - 1] * this.$store.stocks[stockId].owned
      const newValue = this.$store.stocks[stockId].value[this.$store.stocks[stockId].value.length - 1] * (this.$store.stocks[stockId].owned-amount)
      const ratio = newValue / oldValue
      this.$store.stocks[stockId].owned -= amount
      this.$store.stocks[stockId].invested *= ratio
      this.$store.money += (oldValue - newValue)

      this.$notify({
        group: 'notification',
        title: 'Sold Stock ' + stockId,
        text: ':)'
      })
    }
  }

  toggleVisible(i: number) {
    this.$store.stocks[i].visible = !this.$store.stocks[i].visible
  }

  updateStocks() {
    this.startMonth = Math.floor((this.$store.tickCount % (12 * 4)) / 4)
    this.startMonth -= HISTORY_LENGTH
    if (this.startMonth < 0) {
      this.startMonth += 12
    }

    for (let i = 0; i < this.$store.stocks.length; i++) {

      const lastValue = this.$store.stocks[i].value[11]
      const range = this.$store.risk[i] * lastValue
      const change = Math.random() * range

      this.$store.stocks[i].value.push(lastValue + change - (range/2))
      this.$store.stocks[i].value.shift()
      console.log("---")
    }
  }

  chartOptions(data: number[]) {
    return {
      maintainAspectRatio: false,
      legend: { display: false },
      tooltips: {
        callbacks: {
          label: (item: any, data: any) => {
            const value = data.datasets[item.datasetIndex].data[item.index]
            return `€${value.toFixed(2)}`
          },
        },
        displayColors: false,
      },
      animation: { duration: 0 },
      scales: {
        yAxes: [
          {
            ticks: {
              min: Math.max(Math.min(...data) - 2, 0),
              max: Math.max(...data) + 2,
              stepSize: 5,
            },
          },
        ],
      },
    }
  }

  stocks() {
    return this.$store.stocks
  }

  chartData(data: number[]) {
    return {
      labels: data.map((_, i: number) => {
        let month = this.startMonth + i
        if (month > 11) month -= 12
        return new Date(2000, month).toLocaleDateString('default', { month: 'short' })
      }),
      datasets: [
        {
          data,
          lineTension: 0.2,
        },
      ],
    }
  }
}
</script>

<style>
.toggle-header {
  outline: none !important;
}
.hide {
  display: none;
}
</style>