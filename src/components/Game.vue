<template>
  <div>
    <Status />
    <Tabs />
    <DevTools />

    <transition name="overlay-fade">
      <EventOverlay v-if="this.event != null" :event="this.event" @dismiss="nextEvent" />
    </transition>

    <transition name="overlay-fade">
      <Menu v-if="showMenu" />
    </transition>

    <transition name="overlay-fade">
      <GameOver v-if="gameOver" />
    </transition>
  </div>
</template>




<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Tabs from '@/components/Tabs/Tabs.vue'
import Status from '@/components/Status/Status.vue'
import DevTools from '@/components/DevTools.vue'
import EventOverlay from '@/components/EventOverlay.vue'
import Menu from '@/components/Menu.vue'
import GameOver from '@/components/GameOver.vue'

import { Event } from '@/store'
import { randomEvent } from '@/components/events'

@Component({
  components: { Tabs, Status, DevTools, EventOverlay, Menu, GameOver },
})
export default class Game extends Vue {
  private tick: number
  private tickInterval: number

  private event: Event | null = null
  private eventBacklog: Event[] = []

  private showMenu = true
  private gameOver = false
  private bailOutUsed = false

  mounted() {
    this.$store.events.$on('start-game', this.startGame)
    this.$store.events.$on('end-game', this.endGame)
  }

  startGame() {
    this.showMenu = false
    this.gameOver = false
    this.bailOutUsed = false

    this.tickInterval = this.tick = setInterval(() => {
      this.$store.events.$emit('tick')
    }, 1000)

    this.$store.events.$on('tick', this.checkGameOver)
    this.$store.events.$on('tick-month', () => randomEvent(this.$store))
    this.$store.events.$on('event', (e: Event) => {
      if (!this.event) this.event = e
      else this.eventBacklog.push(e)
    })
  }

  endGame() {
    this.event = null
    this.eventBacklog = []
    clearInterval(this.tickInterval)

    this.$store.events.$off('tick')
    this.$store.events.$off('tick-month')
    this.$store.events.$off('relocate')
    this.$store.events.$off('jobs-found')
    this.$store.events.$off('event')
  }

  checkGameOver() {
    // game over when no money remains
    if (this.$store.money > 0) return

    this.$store.events.$emit('end-game')
    this.gameOver = true
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

  .overlay-content,
  .menu {
    transition: transform 0.25s;
  }
}
.overlay-fade-enter,
.overlay-fade-leave-to {
  opacity: 0;

  .overlay-content,
  .menu {
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
