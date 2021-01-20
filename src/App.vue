<template>
  <div id="app">
    <Game />
    <!-- <notifications group="revenue" />
    <notifications group="expense" position="top left" />
    <notifications group="notification" position="bottom left" /> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Game from '@/components/Game.vue'

@Component({
  components: {
    Game,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 60px;
}
</style>


