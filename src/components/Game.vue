<template>
  <div>
    <b-card no-body>
      <b-tabs card>
        <b-tab title="Leisure" active><p>I'm the leisure tab!</p></b-tab>
        <b-tab title="Home"><p>I'm the home tab!</p></b-tab>
        <b-tab title="Work"><p>I'm the work tab!</p></b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>




<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class Game extends Vue {
  private age: number = 2
}
</script>




<style lang="scss">
</style>
