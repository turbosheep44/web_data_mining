<template>
  <b-container :fluid="items > 3 ? true : 'xl'">
    <b-row align-v="start" align-h="center">
      <b-col :xl="xlCols" md="6" sm="10" class="mb-4"><slot name="first">First</slot></b-col>
      <b-col :xl="xlCols" md="6" sm="10" class="mb-4"><slot name="second">Second</slot></b-col>
      <b-col :xl="xlCols" md="6" sm="10" class="mb-4"><slot name="third">Third</slot></b-col>
      <b-col :xl="xlCols" md="6" sm="10" class="mb-4" v-if="items > 3"><slot name="fourth"></slot></b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class ColumnView extends Vue {
  private xlCols: number = 4
  private items: number = 3

  mounted() {
    this.items = Object.keys(this.$slots).length
    this.xlCols = Math.floor(12 / this.items)
  }
}
</script>

<style lang="scss">
</style>