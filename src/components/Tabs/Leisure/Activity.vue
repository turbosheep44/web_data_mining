<template>
  <b-card class="my-2 activity">
    <!-- description -->
    <font-awesome-icon :icon="activity.icon" class="mr-2 icon-width" />
    <b>{{ activity.name }}</b>
    <br />

    <!-- stats and purchase buttons -->
    <div class="d-flex justify-content-end align-items-center my-2">
      <div class="ml-3 stat">
        <font-awesome-icon icon="smile" class="mr-1" />
        {{ activity.happiness }}
      </div>
      <div class="ml-3 stat">
        <font-awesome-icon icon="hryvnia" class="mr-1" />
        {{ activity.cost | money }}
      </div>
      <div class="ml-3 stat">
        <font-awesome-icon icon="clock" class="mr-1" />
        {{ activity.time }}
      </div>
      <b-btn variant="success" class="ml-3 py-1" @click="$emit('purchase')">Purchase</b-btn>
    </div>
  </b-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Activity as Act } from '@/components/Tabs/Leisure/activity'

@Component({ components: {} })
export default class Activity extends Vue {
  @Prop({ required: true }) activity: Act
}
</script>

<style lang="scss">
.activity {
  .icon-width {
    width: 1rem;
  }
  .stat {
    width: 25%;
    max-width: 50px;
  }
}
</style>