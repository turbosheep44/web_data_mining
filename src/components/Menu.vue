<template>
  <div class="overlay d-flex justify-content-center align-items-center">
    <b-card class="menu p-3">
      <div class="emitter" ref="emitter">
        <img src="@/assets/logo.png" class="w-100" />
      </div>
      <hr />
      <div class="d-flex justify-content-center align-items-center">
        <b-button variant="outline-dark" class="px-5 mx-2" @click="play"> Play </b-button>
        <b-button variant="outline-dark" class="px-5 mx-2"> Help </b-button>
      </div>
    </b-card>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'vue-property-decorator'

@Component({})
export default class Menu extends Vue {
  @Ref() emitter: HTMLDivElement
  private createIconInterval: number

  mounted() {
    this.createIconInterval = setInterval(this.createIcon, 250)
  }

  play() {
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
}
</script>

<style lang="scss">
.overlay {
  .menu {
    max-width: 50vw;
    max-height: 50vh;

    .emitter {
      position: relative;
      margin: 15px;

      .icon-bubble {
        position: absolute;
        animation: bubble 4s linear infinite;
        pointer-events: none;
      }

      @keyframes bubble {
        0% {
          transform: translateY(-200%);
          opacity: 0;
        }
        18% {
          transform: translateY(0%);
          opacity: 1;
        }
        100% {
          transform: translateY(900%);
          opacity: 0;
        }
      }
    }

    .btn {
      font-size: 2rem;
      font-weight: bold;
    }
  }
}
</style>