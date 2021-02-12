<template>
  <div>
    <h5 class="text-center">Transport</h5>
    <hr class="wide-separator" />
    <b-card v-for="(transport, i) in $store.transports" :key="`transport-${i}`" no-body :class="['my-3', i == $store.transport ? 'active-transport' : '']">
      <!-- Header -->
      <b-card-header @click="toggleVisible(i)">
        <div class="d-flex justify-content-between align-items-center toggle-header">
          <div class="d-flex align-items-center">
            <h6 class="mb-0">{{ transport.name }}</h6>
            <b-badge class="ml-2" v-if="i == $store.transport">Active</b-badge>
          </div>
          <font-awesome-icon icon="chevron-down" :class="['chevron', visible[i] ? 'chevron-open' : '']" />
        </div>
      </b-card-header>

      <!-- Body -->
      <b-collapse v-model="visible[i]">
        <b-card-body>
          <p>{{ transport.description }}</p>

          <b-row align-v="center" align-h="between">
            <!-- actions -->
            <b-col cols="4">
              <b-btn class="mr-3" block variant="success" v-if="!transport.purchased" @click="purchaseTransport(i)">Purchase</b-btn>
              <b-btn class="mr-3" block variant="info" v-else-if="i != $store.transport" @click="useTransport(i)"> Use </b-btn>
              <b-btn class="mr-3" block variant="outline-info" disabled v-else> In Use </b-btn>
            </b-col>

            <!-- stats -->
            <b-col cols="7" class="d-flex justify-content-between align-items-center">
              <div>
                <font-awesome-icon icon="hryvnia" class="mr-1" />
                <span>{{ transport.price | money }}</span>
              </div>
              <div>
                <font-awesome-icon icon="calendar" class="mr-1" />
                <span>{{ transport.upkeep | money }}</span>
              </div>
              <div>
                <font-awesome-icon icon="clock" class="mr-1" />
                <span>{{ getTime(transport.time) }}</span>
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
export default class Transport extends Vue {
  private visible: boolean[] = []

  mounted() {
    // Setting the default transport
    this.visible = Array(this.$store.transports.length).fill(false)
    this.visible[this.$store.transport] = true

    // adding it as an activity
    const roundedTime =
      Math.round(this.$store.properties[this.$store.property].transportCostModifier * this.$store.transports[this.$store.transport].time * 4) / 4
    this.$store.activities.push({ name: 'Transport', hours: roundedTime })

    this.$store.events.$on('relocate', this.setPrices)
    this.setPrices()
  }

  setPrices() {
    this.$store.transports[2].upkeep = this.$store.currentCountry.monthlybus

    this.$store.transports[3].price = this.$store.currentCountry.car1
    this.$store.transports[3].upkeep = this.$store.currentCountry.gas * 30
  }

  toggleVisible(i) {
    this.visible[i] = !this.visible[i]
    this.$forceUpdate()
  }

  // Calculate time given the property cost multiplier, rounded to the next
  // half hour
  getTime(transportTime: number) {
    const time = this.$store.properties[this.$store.property].transportCostModifier * transportTime
    const rounded = Math.round(time * 4) / 4
    return rounded
  }

  purchaseTransport(i: number) {
    const toBuy = this.$store.transports[i]
    if (toBuy.price > this.$store.money) {
      this.$notify({
        group: 'notification',
        title: toBuy.name + ' is too expensive',
        text: 'You cannot afford it. Please save up more money and try again later',
      })
    } else {
      this.$store.transports[i].purchased = true
      this.$store.money -= toBuy.price

      this.$forceUpdate()
    }
  }

  useTransport(i: number) {
    const toUse = this.$store.transports[i]
    const currentTransportTime = this.$store.transports[this.$store.transport].time
    if (toUse.time + this.$store.totalTime() - currentTransportTime > 24) {
      this.$notify({
        group: 'notification',
        title: 'You do not have enough free time to use the ' + toUse.name,
        text: 'Please allocate enough free time and try again later',
      })
    } else {
      // Update the transport activity
      // Note: I only made it default to another transport activity because typescript was flagging as a
      // possible undefined. When this function runs, it is impossible for it not to find a transport
      // activity since the walking would have been set by default.

      // Make the transport an expense
      const transportIndex = this.$store.expenses.findIndex((item) => item.name == 'Transport')
      if (transportIndex == -1) {
        this.$store.expenses.push({ name: 'Transport', price: toUse.upkeep })
      } else {
        this.$store.expenses[transportIndex].price = toUse.upkeep
        console.log('Price ', toUse.upkeep)
      }

      const transport = this.$store.activities.find((act) => {
        return act.name == 'Transport'
      }) || { name: 'Transport', hours: 1 }
      transport.hours = toUse.time

      this.$store.transport = i
      this.visible.fill(false)
      this.visible[i] = true

      this.$forceUpdate()
    }
  }
}
</script>

<style lang="scss">
@import 'bootstrap/scss/_mixins.scss';
@import 'bootstrap/scss/_functions.scss';
@import 'bootstrap/scss/_variables.scss';

.active-transport {
  .card-header {
    background-color: lighten(map-get($theme-colors, info), 30);
  }
}
</style>