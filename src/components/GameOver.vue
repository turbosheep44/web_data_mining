<template>
  <div class="overlay d-flex justify-content-center align-items-center">
    <b-card class="menu p-3">
      <div class="emitter" ref="emitter">
        <img src="@/assets/game_over.png" class="w-100" />
      </div>
      <h3 class="text-center" v-if="$store.money <= 0">You went bankrupt!</h3>
      <h3 class="text-center" v-else>You ended the game with {{ pension() | money(true, true) }} per month for your retirement.</h3>
      <hr />
      <div class="d-flex justify-content-center align-items-center">
        <b-button variant="outline-dark" class="px-5 mx-2" @click="restart"> Restart </b-button>
      </div>
    </b-card>
  </div>
</template>

<script lang="ts">
import { Store } from '@/store'
import { Component, Ref, Vue } from 'vue-property-decorator'

@Component({})
export default class GameOver extends Vue {
  @Ref() emitter: HTMLDivElement
  private createIconInterval: number

  mounted() {
    this.createIconInterval = setInterval(this.createIcon, 250)
  }

  restart() {
    // reset the game by reinitialising the store (but keep the events bus)
    const newStore = new Store()
    newStore.events = this.$store.events
    Object.keys(this.$store).forEach((e) => {
      this.$store[e] = newStore[e]
    })

    clearInterval(this.createIconInterval)
    this.$store.events.$emit('start-game')
  }

  createIcon() {
    const SIZES = ['fa-sm', 'fa-lg', 'fa-2x']
    const ICONS = ['fa-smile', 'fa-hryvnia', 'fa-clock']

    // create the icon
    const icon = document.createElement('i')
    icon.classList.add('icon-bubble', 'fa', ICONS[Math.floor(Math.random() * ICONS.length)], SIZES[Math.floor(Math.random() * SIZES.length)])
    icon.style.left = `${Math.random() * this.emitter.getBoundingClientRect().width}px`

    // add the icon to the emitter area and schedule removal
    this.emitter.appendChild(icon)
    setTimeout(() => {
      if (this.emitter) this.emitter.removeChild(this.emitter.children[1])
    }, 4000)
  }

  pension() {
    return this.$store.money / (20 * 12)
  }
}
</script>

<style>
</style>