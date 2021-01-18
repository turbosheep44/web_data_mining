<template>
  <div>
    <h5 class="text-center">Work</h5>
    <hr class="wide-separator" />

    <!-- Employment status -->
    <Employment v-bind="$store.job" />

    <!-- Job Offers -->
    <h6 class="my-3">Job Offers</h6>

    <Employment v-for="(job, i) of $store.jobOffers" :key="i" v-bind="job" collapse="true" class="my-3" />

    <b-btn
      @click="$store.jobSearching = !$store.jobSearching"
      block
      variant="info"
      :disabled="$store.jobSearching"
      style="overflow: hidden"
    >
      <transition name="slide" mode="out-in">
        <p class="m-0" v-if="!$store.jobSearching">Search for Jobs</p>
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
import Employment from '@/components/Tabs/Employment.vue'

@Component({
  components: { Employment },
})
export default class Work extends Vue {}
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