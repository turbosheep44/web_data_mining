<template>
  <div>
    <Status />
    <Tabs />
    <DevTools />
  </div>
</template>




<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Tabs from '@/components/Tabs/Tabs.vue'
import Status from '@/components/Status/Status.vue'
import DevTools from '@/components/DevTools.vue'

@Component({
  components: { Tabs, Status, DevTools },
})
export default class Game extends Vue {
  private tick: number

  mounted() {
    this.tick = setInterval(() => {
      this.$store.events.$emit('tick')
    }, 1000)
  }

  beforeDestroy() {
    clearInterval(this.tick)
  }
}
</script>




<style lang="scss">
</style>
