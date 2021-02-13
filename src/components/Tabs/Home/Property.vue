<template>
  <div>
    <h5 class="text-center mt-3">Property</h5>
    <hr class="wide-separator" />

    <b-card v-for="(property, i) in $store.properties" :key="`property-${i}`" no-body :class="['my-3', i == $store.property ? 'owned-property' : '']">
      <!-- Header -->
      <b-card-header @click="toggleVisible(i)">
        <div class="d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center">
            <h6 class="mb-0">{{ property.name }}</h6>
            <b-badge class="ml-2" v-if="i == $store.property">Owned</b-badge>
          </div>
          <font-awesome-icon icon="chevron-down" :class="['chevron', visible[i] ? 'chevron-open' : '']" />
        </div>
      </b-card-header>

      <!-- Body -->
      <b-collapse v-model="visible[i]">
        <b-card-body>
          <div class="d-flex justify-content-between align-items-start">
            <p class="mb-0" style="white-space: pre">{{ property.description }}</p>
            <font-awesome-icon size="lg" :icon="icon(property.name)" class="mt-2 mr-2" />
          </div>
          <b-row align-content="between" align-v="center">
            <b-col cols="4">
              <b-btn v-if="$store.property != i" class="py-1" variant="success" @click="purchaseProperty(i)">{{ property.isRent ? 'Rent' : 'Purchase' }}</b-btn>
              <b-btn v-else class="py-1" disabled variant="outline-success">Owned</b-btn>
            </b-col>
            <b-col>
              <div class="d-flex justify-content-between align-items-start my-2">
                <span> <font-awesome-icon class="mr-1" size="sm" icon="smile" />{{ property.happiness * 100 }} </span>
                <span> <font-awesome-icon class="mr-1" size="sm" icon="hryvnia" /> {{ property.price | money }} {{ property.isRent ? ' p/m' : '' }}</span>
                <span> <font-awesome-icon class="mr-1" size="sm" icon="bicycle" /> {{ property.transportCostModifier }} </span>
              </div>
            </b-col>
          </b-row>
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class Property extends Vue {
  private visible: boolean[] = []

  mounted() {
    this.$store.events.$on('start-game', this.startGame)
  }

  startGame() {
    this.visible = Array(this.$store.properties.length).fill(false)
    this.$store.events.$on('relocate', this.relocated)
    this.setPrices()

    // start with the mose basic property
    this.$store.property = 0
    this.updateExpense()
  }

  updateExpense() {
    const rentIndex = this.$store.expenses.findIndex((expense) => expense.name == 'Rent')
    const ownedProperty = this.$store.properties[this.$store.property]

    // remove the rent expense if the property is not a rental
    if (!ownedProperty.isRent && rentIndex != -1) this.$store.expenses.splice(rentIndex, 1)
    // add or update the expense
    else if (ownedProperty.isRent) {
      if (rentIndex == -1) this.$store.expenses.push({ name: 'Rent', price: ownedProperty.price })
      else this.$store.expenses[rentIndex].price = ownedProperty.price
    }
  }

  setPrices() {
    const relocation = ['incityapRent', 'incityapRent', 'outcityapRent', 'outcityapBuy', 'incityapBuy', 'incityapBuy']
    this.$store.properties.forEach((property, i) => {
      property.price = this.$store.currentCountry[relocation[i]]
    })
  }

  relocated() {
    // sell your property for 80% of their price if not renting
    const currentProperty = this.$store.properties[this.$store.property]
    if (!currentProperty.isRent) this.$store.money += 0.8 * currentProperty.price

    // go back to renting the basic apartment
    this.setPrices()
    this.purchaseProperty(0)

    this.$forceUpdate()
  }

  toggleVisible(i: number) {
    this.visible[i] = !this.visible[i]
    this.$forceUpdate()
  }

  icon(buildingType: string) {
    const t = buildingType.toLowerCase()
    if (t.includes('apartment') || t.includes('penthouse')) return 'building'
    if (t.includes('house') || t.includes('mansion')) return 'home'

    return 'home'
  }

  purchaseProperty(p: number) {
    // check the player can afford the property
    const prop = this.$store.properties[p]
    if (prop.price > this.$store.money) {
      this.$notify({
        group: 'notification',
        title: prop.name + ' is too expensive',
        text: 'You cannot afford it. Please save up more money and try again later',
      })
      return
    }

    // check the player has enough time for their new transport
    const currentTransport = this.$store.transports[this.$store.transport]
    const proposedTransport = Math.round(currentTransport.time * prop.transportCostModifier * 4) / 4
    const freeTime = 24 - this.$store.totalTime()
    if (freeTime - currentTransport.time + proposedTransport <= 0) {
      this.$notify({
        group: 'notification',
        title: prop.name + ' is too far away from work to fit into your schedule',
        text: 'Allocate more free time and you will be able to purchase this property',
      })
      return
    }

    // update the property and collapse UI
    this.$store.property = p
    this.visible.fill(false)
    this.visible[p] = true

    this.$notify({
      group: 'notification',
      title: prop.name + ' purchased!',
      text: 'Congratulations on purchasing this new property!',
    })

    // update or remove cost of rent
    this.updateExpense()

    // update transport time
    const transportIndex = this.$store.activities.findIndex((activity) => activity.name == 'Transport')
    this.$store.activities[transportIndex].hours = proposedTransport
  }
}
</script>

<style lang="scss">
@import 'bootstrap/scss/_mixins.scss';
@import 'bootstrap/scss/_functions.scss';
@import 'bootstrap/scss/_variables.scss';

.owned-property {
  .card-header {
    background-color: lighten(map-get($theme-colors, info), 30);
  }
}
</style>