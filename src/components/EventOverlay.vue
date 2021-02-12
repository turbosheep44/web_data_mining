<template>
  <div class="overlay d-flex justify-content-center align-items-center" @click="barrierDismiss">
    <b-card class="overlay-content">
      <b-card-text>{{ this.event.text }}</b-card-text>

      <div class="d-flex justify-content-start" v-if="Object.entries(this.event.effects).length > 0">
        <div v-for="[effect, value] in Object.entries(this.event.effects)" :key="effect" class="mr-4">
          <font-awesome-icon :icon="effectIcon(effect)" />
          {{ value }}
        </div>
      </div>

      <hr />

      <div class="d-flex justify-content-end">
        <b-button
          v-for="(action, i) in this.event.actions"
          :key="i"
          :id="`event-action-${i}`"
          variant="outline-info"
          class="ml-2"
          @click="callbackAndDismiss(i)"
        >
          {{ action.text }}

          <b-tooltip v-if="action.tooltip != ''" :target="`event-action-${i}`" triggers="hover" placement="bottom">
            {{ action.tooltip }}
          </b-tooltip>
        </b-button>
      </div>
    </b-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Event } from '@/store'

const EFFECTS = { happiness: 'smile', money: 'hryvnia' }

@Component({})
export default class EventOverlay extends Vue {
  @Prop({ required: true }) event: Event

  dismiss() {
    this.applyEffects()
    if (this.event.callback) this.event.callback(this.$store)
    this.$emit('dismiss')
  }

  barrierDismiss() {
    if (!this.event.isBarrierDismissable) return
    this.dismiss()
  }

  callbackAndDismiss(i: number) {
    ;(this.event.actions[i].callback || (() => true))(this.$store)
    this.dismiss()
  }

  effectIcon(effect: string) {
    return EFFECTS[effect]
  }

  applyEffects() {
    const effects = this.event.effects
    if (effects.happiness) this.$store.happiness += effects.happiness / 100
    if (effects.money) this.$store.money += effects.money
  }
}
</script>

<style lang="scss">
.overlay {
  background-color: #111111aa;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  .overlay-content {
    max-width: 400px;
  }
}
</style>