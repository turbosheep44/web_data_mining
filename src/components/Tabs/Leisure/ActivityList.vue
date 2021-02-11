<template>
  <div class="activity-list">
    <h5 class="text-center">{{ this.title }}</h5>
    <hr class="wide-separator" />

    <b-progress
      class="my-3"
      :max="1"
      ref="enjoyment"
      v-b-tooltip.hover.bottomright
      title="Repeating the same leisure activity in a short time frame will yield diminishing returns on happiness. The enjoyment level indicates what percentage of the base happiness this category of leisure activity will restore."
    >
      <b-progress-bar :value="enjoyment">
        <div class="justify-content-center align-items-center d-flex position-absolute w-100">
          <strong>Enjoyment</strong>
          <div style="width: 5pt"></div>
          {{ (enjoyment * 100).toFixed(0) }}%
        </div>
      </b-progress-bar>
    </b-progress>

    <ActivityCard v-for="(activity, i) in activities" :key="activity.name" :activity="activity" @purchase="purchase(i)" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue, Watch } from 'vue-property-decorator'
import ActivityCard from '@/components/Tabs/Leisure/Activity.vue'
import { Activity } from '@/components/Tabs/Leisure/activity'
import CountryPrices from '@/assets/countries.json'

@Component({ components: { ActivityCard } })
export default class ActivityList extends Vue {
  @Prop({ required: true }) title: string
  @Prop({ required: true }) activities: Activity[]

  @Ref('enjoyment') enjoymentProgressBar: Vue
  private enjoyment: number = 1
  private maxEnjoyment = [94, 185, 94]
  private minEnjoyment = [27, 37, 85]

  refill(){
    if (this.enjoyment < 0.1)
      this.enjoyment += 0.2
    else if (this.enjoyment < 0.5)
      this.enjoyment += 0.4
    else
      this.enjoyment = 1

  }

  mounted() {
    this.$store.events.$on('relocate', this.relocate)
    this.$store.events.$on('tick-month', this.refill)
    this.progressBarColour()

    // set initial prices
    this.relocate()
  }

  purchase(i: number) {
    this.$store.money -= this.activities[i].cost

    const old = this.enjoyment

    // decay enjoyment value
    if (this.enjoyment == 1) this.enjoyment = 0.95
    this.enjoyment = Math.pow(this.enjoyment, 2)
    if (this.enjoyment < 0.1) this.enjoyment = 0

    // If I have time I will need to work on improving this
    this.$store.happiness += this.enjoyment/20
    console.log(`${this.activities[i].name}     ${old.toFixed(2)} --> ${this.enjoyment.toFixed(2)}`)
  }

  relocate() {
    const country = CountryPrices[this.$store.country] // get new country
    this.activities.forEach((activity) => {
      if (!activity.relocationKey) return // cant update without a relocation key
      activity.cost = country[activity.relocationKey] * (activity.priceMultiplier || 1) // update price
    })
  }

  @Watch('enjoyment')
  progressBarColour() {
    const r = Math.round(this.minEnjoyment[0] + (this.maxEnjoyment[0] - this.minEnjoyment[0]) * this.enjoyment)
    const g = Math.round(this.minEnjoyment[1] + (this.maxEnjoyment[1] - this.minEnjoyment[1]) * this.enjoyment)
    const b = Math.round(this.minEnjoyment[2] + (this.maxEnjoyment[2] - this.minEnjoyment[2]) * this.enjoyment)

    ;(this.enjoymentProgressBar.$el.firstElementChild as HTMLDivElement).style.backgroundColor =
      '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
    console.log('#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1))
  }
}
</script>

<style lang='scss'>
.activity-list {
  .progress {
    width: 100%;
    height: 1.5em;
    font-size: 1em;
  }
}
</style>