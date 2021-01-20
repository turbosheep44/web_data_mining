<template>
  <div>
    <h5 class="text-center">Work</h5>
    <hr class="wide-separator" />

    <!-- Employment status -->
    <Employment v-bind="$store.job" :button-text="$store.isEmployed() ? 'Resign' : ''" @button-click="resign" />

    <!-- Job Offers -->
    <h6 class="my-3">Job Offers</h6>

    <Employment
      v-for="(job, i) of $store.jobOffers"
      :key="i"
      v-bind="job"
      collapse="true"
      class="my-3"
      button-text="Accept Job"
      @button-click="acceptJob(i)"
    />

    <b-btn @click="startJobSearch" block variant="info" :disabled="$store.jobSearching" style="overflow: hidden">
      <transition name="slide" mode="out-in">
        <p class="m-0" v-if="!$store.isJobSearching()">Search for Jobs</p>
        <div v-else class="d-flex justify-content-center align-items-center">
          <b-spinner small></b-spinner>
          <span class="ml-3">Searching</span>
        </div>
      </transition>
    </b-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Employment from '@/components/Tabs/Finances/Employment.vue'

@Component({
  components: { Employment },
})
export default class Work extends Vue {
  mounted() {
    this.$store.events.$on('tick', this.jobSearchUpdate)
    this.$store.events.$on('jobs-found', this.jobsFound)
  }

  startJobSearch() {
    this.$notify({
      group: 'notification',
      title: 'Job search started',
      text: 'You will receive shortlist in 1-3 months.',
    })

    const minTickDelay = 2,
      maxTickDelay = this.$store.jobSearchDuration
    const delay = Math.floor(Math.random() * (maxTickDelay - minTickDelay + 1)) + minTickDelay

    this.$store.jobOffers = []
    this.$store.jobSearchTargetTick = this.$store.tickCount + delay
  }

  jobSearchUpdate() {
    if (this.$store.tickCount == this.$store.jobSearchTargetTick) this.$store.events.$emit('jobs-found')
  }

  jobsFound() {
    this.$notify({
      group: 'notification',
      title: 'Jobs Found!',
      text: 'Open the work tab to see job offers.',
    })

    // create job offers
    this.$store.jobOffers = [
      { title: 'Teacher', wage: 15000, hours: 8 },
      { title: 'Programmer', wage: 25000, hours: 10 },
      { title: 'Security Guard', wage: 10000, hours: 6 },
    ]
    // no longer searching
    this.$store.jobSearchTargetTick = -1
  }

  resign() {
    this.$notify({
      group: 'notification',
      title: "Resigned from '" + this.$store.job.title + "'",
      text: 'Happy Unemployment!',
    })
    this.$store.job = { title: 'Unemployed', wage: 0, hours: 0 }
  }

  acceptJob(offer: number) {
    this.$store.job = this.$store.jobOffers[offer]
    this.$store.jobOffers = []
    this.$store.income = this.$store.job.wage/12
  }
}
</script>

<style lang="scss">
.slide {
  &-leave-active,
  &-enter-active {
    transition: 0.5s;
  }
  &-enter {
    transform: translate(0, -100%);
  }
  &-leave-to {
    transform: translate(0, 100%);
  }
}
</style>