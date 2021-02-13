<template>
  <div>
    <h5 class="text-center">Time</h5>
    <hr class="wide-separator" />

    <!-- Sleep Slider -->
    <div class="my-3">
      <div class="d-flex align-items-center justify-content-between">
        <h6 class="font-weight-bold">Sleep</h6>
        <h6 class="mt-2">{{ $store.sleep }} hrs</h6>
      </div>
      <b-form-input type="range" min="5" :max="maxSleep()" step="0.5" number v-model="$store.sleep" @change="updateSleep"></b-form-input>
    </div>

    <!-- Pie Chart -->
    <PieChart :chart-data="activityData()" :options="options" style="height: 300px"></PieChart>

    <!-- Totals -->
    <div class="mt-3" style="color: transparent; user-select: none">.</div>
    <div v-for="activity in activitiesWithFree()" :key="activity.name" class="d-flex justify-content-between align-items-center">
      <span>{{ activity.name }}</span>
      <span class="text-right text-danger">{{ activity.hours }} hrs</span>
    </div>

    <hr class="my-2" />
    <div class="font-weight-bold">
      <div class="d-flex justify-content-between align-items-center">
        <span>Time Used</span>
        <span class="text-danger">{{ this.$store.totalTime() }} hrs</span>
      </div>
      <div class="d-flex justify-content-between align-items-center">
        <span>Free Time</span>
        <span class="text-success">{{ 24 - this.$store.totalTime() }} hrs</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PieChart, { COLORS } from '@/components/Tabs/Charts/PieChart.vue'

@Component({
  components: { PieChart },
})
export default class Time extends Vue {
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
          const hours = data.datasets[item.datasetIndex].data[item.index]
          return `${label}: ${hours}hrs`
        },
      },
    },
  }

  mounted() {
    // register the sleep activity when game start
    this.$store.events.$on('start-game', () => {
      this.$store.activities.push({ name: 'Sleep', hours: this.$store.sleep })
    })
  }

  activityData() {
    return {
      labels: this.activitiesWithFree().map((activity) => activity.name),
      datasets: [
        {
          data: this.activitiesWithFree().map((activity) => activity.hours),
          backgroundColor: ({ dataIndex }: any) => {
            return this.activitiesWithFree()[dataIndex].name == 'Free Time' ? '#eee' : COLORS[dataIndex % COLORS.length]
          },
          borderColor: '#fff',
          borderWidth: 3,
        },
      ],
    }
  }

  maxSleep() {
    return Math.min(24 - this.$store.totalTime() + this.currentSleepTime(), 10)
  }

  currentSleepTime() {
    const sleep = this.$store.activities.find((act) => act.name == 'Sleep') ?? { hours: 0 }
    return sleep.hours
  }

  activitiesWithFree() {
    const timeUsed = this.$store.totalTime()
    if (timeUsed == 24) return this.$store.activities

    const withFree = this.$store.activities.slice()
    withFree.push({ name: 'Free Time', hours: 24 - timeUsed })
    // console.log("with free", withFree)
    return withFree
  }

  updateSleep() {
    const sleep = this.$store.activities.find((act) => act.name == 'Sleep') ?? { hours: 0 }
    sleep.hours = this.$store.sleep
  }
}
</script>

<style>
</style>