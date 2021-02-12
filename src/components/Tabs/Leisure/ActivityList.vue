<template>
  <div class="activity-list">
    <h5 class="text-center">{{ this.title }}</h5>
    <hr class="wide-separator" />

    <b-progress
      class="my-3 position-relative"
      :max="1"
      ref="enjoyment"
      v-b-tooltip.hover.bottomright
      title="Repeating the same leisure activity in a short time frame will yield diminishing returns on happiness. The enjoyment level indicates what percentage of the base happiness this category of leisure activity will restore."
    >
      <b-progress-bar :value="enjoyment"></b-progress-bar>

      <div
        v-for="label in ['back', 'front']"
        :key="label"
        :ref="`enjoyment-label-${label}`"
        :class="['justify-content-center align-items-center d-flex w-100 h-100 enjoyment-label', label]"
      >
        <strong>Enjoyment</strong>
        <div style="width: 5pt"></div>
        {{ (enjoyment * 100).toFixed(0) }}%
      </div>
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
  @Ref('enjoyment-label-front') enjoymentLabelFront: HTMLDivElement[]
  @Ref('enjoyment-label-back') enjoymentLabelBack: HTMLDivElement[]
  private enjoyment: number = 1
  private maxEnjoyment = [94, 185, 94]
  private minEnjoyment = [27, 37, 85]

  mounted() {
    this.$store.events.$on('relocate', this.relocate)
    this.progressBarColour()

    // set initial prices
    this.relocate()
  }

  purchase(i: number) {
    // TODO: perform activity logic

    const old = this.enjoyment

    // decay enjoyment value
    if (this.enjoyment == 1) this.enjoyment = 0.95
    this.enjoyment = Math.pow(this.enjoyment, 2)
    if (this.enjoyment < 0.1) this.enjoyment = 0

    console.log(`${this.activities[i].name}     ${old.toFixed(2)} --> ${this.enjoyment.toFixed(2)}`)
  }

  relocate() {
    // TODO: relocating changes the price of entertainment

    const country = CountryPrices[this.$store.country] // get new country
    this.activities.forEach((activity) => {
      if (!activity.relocationKey) return // cant update without a relocation key
      activity.cost = country[activity.relocationKey] * (activity.priceMultiplier || 1) // update price
    })
  }

  @Watch('enjoyment')
  progressBarColour() {
    // dynamically change progress bar colour
    const r = Math.round(this.minEnjoyment[0] + (this.maxEnjoyment[0] - this.minEnjoyment[0]) * this.enjoyment)
    const g = Math.round(this.minEnjoyment[1] + (this.maxEnjoyment[1] - this.minEnjoyment[1]) * this.enjoyment)
    const b = Math.round(this.minEnjoyment[2] + (this.maxEnjoyment[2] - this.minEnjoyment[2]) * this.enjoyment)

    ;(this.enjoymentProgressBar.$el.firstElementChild as HTMLDivElement).style.backgroundColor =
      '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)

    // also change the label clipping for colour difference
    this.enjoymentLabelFront[0].style.clipPath = `inset(0 ${(1 - this.enjoyment) * 100}% 0 0)`
    this.enjoymentLabelBack[0].style.clipPath = `inset(0 0 0 ${this.enjoyment * 100}%)`
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

  .enjoyment-label {
    position: absolute;
    transition: clip-path 0.6s ease;

    &.front {
      color: white;
    }
    &.back {
      color: black;
    }
  }
}
</style>