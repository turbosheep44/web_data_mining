<template>
  <div>
    <Status />
    <Tabs />
    <DevTools />

    <transition name="overlay-fade">
      <EventOverlay v-if="this.event != null" :event="this.event" @dismiss="nextEvent" />
    </transition>
  </div>
</template>




<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Tabs from '@/components/Tabs/Tabs.vue'
import Status from '@/components/Status/Status.vue'
import DevTools from '@/components/DevTools.vue'
import EventOverlay from '@/components/EventOverlay.vue'

import { Event } from '@/store'
import { randomEvent } from '@/components/events'

@Component({
  components: { Tabs, Status, DevTools, EventOverlay },
})
export default class Game extends Vue {
  private tick: number

  private event: Event | null = null
  private eventBacklog: Event[] = []

  mounted() {
    this.tick = setInterval(() => {
      this.$store.events.$emit('tick')
    }, 1000)

    this.$store.events.$on('event', (e: Event) => {
      if (!this.event) this.event = e
      else this.eventBacklog.push(e)
    })
    this.$store.events.$on('tick-month', () => randomEvent(this.$store))
  }

  nextEvent() {
    this.event = null

    // if there is a next event, wait until the overlay has faded out and then bring it back in with the new event
    const nextEvent = this.eventBacklog.pop() || null
    if (nextEvent) setTimeout(() => (this.event = nextEvent), 250)
  }

  beforeDestroy() {
    clearInterval(this.tick)
  }
}
</script>




<style lang="scss">
.overlay-fade-enter-active,
.overlay-fade-leave-active {
  transition: opacity 0.25s;

  .overlay-content {
    transition: transform 0.25s;
  }
}
.overlay-fade-enter,
.overlay-fade-leave-to {
  opacity: 0;

  .overlay-content {
    transform: translateY(15%);
  }
}

@import 'bootstrap/scss/_mixins.scss';
@import 'bootstrap/scss/_functions.scss';
@import 'bootstrap/scss/_variables.scss';

.fa-smile {
  color: darken(map-get($theme-colors, warning), 4);
}
.fa-hryvnia {
  color: map-get($theme-colors, success);
}
.fa-bicycle {
  color: map-get($theme-colors, info);
}
</style>
