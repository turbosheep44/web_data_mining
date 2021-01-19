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
      <b-form-input type="range" min="5" max="10" step="0.5" number v-model="$store.sleep" @change="updateSleep"></b-form-input>
    </div>

    <!-- Pie Chart -->
    <PieChart :chart-data="activityData()" :options="options" style="height: 300px"></PieChart>

    <!-- Totals -->
    <div class="mt-3">.</div>
    <div v-for="activity in activitiesWithoutFree()" :key="activity.name" class="d-flex justify-content-between align-items-center">
      <span>{{ activity.name }}</span>
      <span class="text-right text-danger">{{ activity.hours }} hrs</span>
    </div>

    <hr class="my-2" />
    <div class="font-weight-bold">
      <div class="d-flex justify-content-between align-items-center">
        <span>Time Used</span>
        <span class="text-danger">{{ totalTime() }} hrs</span>
      </div>
      <div class="d-flex justify-content-between align-items-center">
        <span>Free Time</span>
        <span class="text-success">{{ 24 - totalTime() }} hrs</span>
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

  activityData() {
    return {
      labels: this.$store.activities.map((activity) => activity.name),
      datasets: [
        {
          data: this.$store.activities.map((activity) => activity.hours),
          backgroundColor: ({ dataIndex }: any) => {
            return this.$store.activities[dataIndex].name == 'Free' ? '#eee' : COLORS[dataIndex % COLORS.length]
          },
          borderColor: '#fff',
          borderWidth: 3,
        },
      ],
    }
  }

  totalTime() {
    return this.$store.activities.reduce((acc, act) => (act.name == 'Free' ? 0 : act.hours) + acc, 0)
  }

  activitiesWithoutFree() {
    return this.$store.activities.filter((act) => act.name != 'Free')
  }

  updateSleep() {
    // TODO: update logic for number of sleep hours changed
    //    what if there are not enough hours
    //    update free time
    const sleep = this.$store.activities.find((act) => act.name == 'Sleep') ?? { hours: 0 }
    sleep.hours = this.$store.sleep
  }
}
</script>

<style>
</style>