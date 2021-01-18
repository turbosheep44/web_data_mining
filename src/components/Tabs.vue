<template>
  <div>
    <b-card no-body>
      <b-tabs card>
        <b-tab title="Leisure" active>{{ this.$store.tickCount }} </b-tab>
        <b-tab title="Home"><p>I'm the home tab!</p></b-tab>
        <b-tab title="Work"><p>I'm the work tab!</p> <Work/> </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script lang="ts">
import Work from '@/components/Work.vue'

import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: { Work },
})
export default class Tabs extends Vue {}
</script>

<style>
</style>