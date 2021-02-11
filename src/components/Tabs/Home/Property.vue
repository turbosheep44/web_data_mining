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
              <b-btn v-if="$store.property != i" class="py-1" variant="success" @click="purchaseProperty(i)">Purchase</b-btn>
              <b-btn v-else class="py-1" disabled variant="outline-success">Owned</b-btn>
            </b-col>
            <b-col>
              <div class="d-flex justify-content-between align-items-start my-2">
                <span> <font-awesome-icon class="mr-1" size="sm" icon="smile" />{{ property.happiness }} </span>
                <span> <font-awesome-icon class="mr-1" size="sm" icon="hryvnia" /> {{ property.price | money }} </span>
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
  private visible: boolean[]

  created() {
    this.$store.properties = [
      {
        name: 'Apartment',
        description: 'Central location \n100 m²',
        isRent: true,
        price: 1000,
        transportCostModifier: 0.5,
        happiness: 10,
      },
      {
        name: 'Penthouse',
        description: 'Central location\n250 m²',
        isRent: true,
        price: 2100,
        transportCostModifier: 0.4,
        happiness: 20,
      },
      {
        name: 'Apartment',
        description: 'Suburban neighbourhood\n130 m²',
        isRent: true,
        price: 600,
        transportCostModifier: 1,
        happiness: 15,
      },
      {
        name: 'Apartment',
        description: 'Quiet neighbourhood\n100 m²',
        isRent: false,
        price: 120000,
        transportCostModifier: 1,
        happiness: 16,
      },
      {
        name: 'House',
        description: 'Quiet location\n250 m²',
        isRent: false,
        price: 200000,
        transportCostModifier: 1,
        happiness: 10,
      },
      {
        name: 'Mansion',
        description: 'Beautiful scenery\nFar from town\n500 m²',
        isRent: false,
        price: 200000,
        transportCostModifier: 1.4,
        happiness: 10,
      },
    ]
    this.visible = Array(this.$store.properties.length).fill(false)
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
    const prop = this.$store.properties[p]
    if (prop.price > this.$store.money) {
      this.$notify({
        group: 'notification',
        title: prop.name + ' is too expensive',
        text: 'You cannot afford it. Please save up more money and try again later',
      })
    } else {
      const currentTransport = this.$store.transports[this.$store.transport]
      const proposedTransport = Math.round(currentTransport.time * prop.transportCostModifier * 4) / 4
      const freeTime = 24 - this.$store.totalTime()
      if (freeTime - currentTransport.time + proposedTransport  <= 0) {
        this.$notify({
          group: 'notification',
          title: prop.name + ' is too far away from work to fit into your schedule',
          text: 'Allocate more free time and you will be able to purchase this property',
        })
      } else {
        this.$store.property = p
        this.visible.fill(false)
        this.visible[p] = true

        this.$notify({
          group: 'notification',
          title: prop.name + ' purchased!',
          text: 'Congratulations on purchasing this new property!',
        })

        const transportIndex = this.$store.activities.findIndex((activity) => activity.name == "Transport")
        this.$store.activities[transportIndex].hours = proposedTransport
      }
    }
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