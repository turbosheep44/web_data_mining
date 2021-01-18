<template>
  <b-container fluid="sm">
    <b-row align-v="start" align-h="center">
      <b-col xl="4" md="6" sm="10" class="mb-4"><Work /></b-col>
      <b-col xl="4" md="6" sm="10" class="mb-4"><Stocks /></b-col>
      <b-col xl="4" md="6" sm="10" class="mb-4"><Expenses /></b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Expenses from '@/components/Tabs/Expenses.vue'
import Stocks from '@/components/Tabs/Stocks.vue'
import Work from '@/components/Tabs/Work.vue'

@Component({
  components: { Expenses, Stocks, Work },
})
export default class Finances extends Vue {}
</script>

<style lang="scss">
@import 'bootstrap/scss/_mixins.scss';
@import 'bootstrap/scss/_functions.scss';
@import 'bootstrap/scss/_variables.scss';

.wide-separator {
  width: 95%;
  // margin-left: -10%;
  background-color: #999;

  margin-bottom: ($spacer * 0.5);
  margin-top: 0;
}
</style>