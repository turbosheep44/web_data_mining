<template>
  <ColumnView>
    <template #first><Country /> <Property /></template>
    <template #second><Luxuries /></template>
    <template #third><Transport /></template>
    <template #fourth><Time /></template>
  </ColumnView>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import ColumnView from '@/components/Tabs/ColumnView.vue'
import Country from '@/components/Tabs/Home/Country.vue'
import Property from '@/components/Tabs/Home/Property.vue'
import Transport from '@/components/Tabs/Home/Transport.vue'
import Luxuries from '@/components/Tabs/Home/Luxuries.vue'
import Time from '@/components/Tabs/Home/Time.vue'

@Component({
  components: { ColumnView, Country, Property, Transport, Luxuries, Time },
})
export default class Home extends Vue {}
</script>

<style lang="scss">
</style>