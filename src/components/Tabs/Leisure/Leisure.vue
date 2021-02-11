<template>
  <ColumnView>
    <template #first><ActivityList title="Entertainment" :activities="entertainment" /></template>
    <template #second><ActivityList title="Food" :activities="food" /></template>
    <template #third><ActivityList title="Sport" :activities="sport" /></template>
    <template #fourth>Happiness</template>
  </ColumnView>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ColumnView from '@/components/Tabs/ColumnView.vue'
import ActivityList from '@/components/Tabs/Leisure/ActivityList.vue'
import { Activity } from '@/components/Tabs/Leisure/activity'

@Component({
  components: { ColumnView, ActivityList },
})
export default class Leisure extends Vue {
  private entertainment: Activity[] = [
    { name: 'Cinema Ticket', icon: 'film', relocationKey: 'cinema', time: 2, happiness: 2, cost: this.$store.currentCountry.cinema } as Activity,
    { name: 'Video Game', icon: 'gamepad', relocationKey: 'dress', time: 5, happiness: 6, cost: this.$store.currentCountry.dress } as Activity,
    { name: 'Shopping', icon: 'shopping-bag', relocationKey: 'leathershoes', time: 3, happiness: 8, cost: this.$store.currentCountry.leathershoes } as Activity,
  ]

  private food: Activity[] = [
    { name: 'Fast Food', icon: 'hamburger', relocationKey: 'fastfood', happiness: 1, time: 0.5, cost: this.$store.currentCountry.fastfood } as Activity,
    { name: 'Restaurant', icon: 'utensils', relocationKey: 'inexpensiveRest', happiness: 4, time: 1.5, cost: this.$store.currentCountry.inexpensiveRest } as Activity,
    { name: 'Fancy Restaurant', icon: 'concierge-bell', relocationKey: 'expensiveRest', happiness: 10, time: 3, cost: this.$store.currentCountry.expensiveRest } as Activity,
  ]

  private sport: Activity[] = [
    { name: 'Watch Football Game', icon: 'futbol', relocationKey: 'beer', priceMultiplier: 5, happiness: 1, time: 2, cost: this.$store.currentCountry.beer } as Activity,
    { name: 'Rent Tennis Court', icon: 'table-tennis', relocationKey: 'tennis', happiness: 4, time: 1, cost: this.$store.currentCountry.tennis } as Activity,
    { name: 'Gym One-Day Membership', icon: 'dumbbell', relocationKey: 'monthlygym', happiness: 10, time: 4, cost: this.$store.currentCountry.monthlygym / 8} as Activity,
  ]
}
</script>

<style lang="scss">
</style>