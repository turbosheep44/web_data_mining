<template>
  <b-container class="status">
    <b-row>
      <!-- status bars -->
      <b-col cols="8">
        <StatusBars />
      </b-col>
      <b-col cols="1"></b-col>
      <!-- current time/date and age -->
      <b-col cols="3">
        <Time />
      </b-col>
    </b-row>
  </b-container>

  
</template>

<script lang = "ts">
import { Component, Vue } from 'vue-property-decorator'
import StatusBars from '@/components/StatusBars.vue'
import Time from '@/components/Time.vue'

@Component({
  components: { StatusBars, Time},
})
export default class Status extends Vue {}
</script>

<style lang="scss">
@import 'bootstrap/scss/_mixins.scss';
@import 'bootstrap/scss/_functions.scss';
@import 'bootstrap/scss/_variables.scss';

.status {
  max-width: map-get($grid-breakpoints, sm) !important;
}
</style>