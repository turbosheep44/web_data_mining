<template>
  <div>
    <b-card no-body>
      <b-tabs card>
        <b-tab title="Leisure"><Leisure /></b-tab>
        <b-tab title="Home" active><Home /></b-tab>
        <b-tab title="Finances"><Finances /></b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Finances from '@/components/Tabs/Finances/Finances.vue'
import Home from '@/components/Tabs/Home/Home.vue'
import Leisure from '@/components/Tabs/Leisure/Leisure.vue'

@Component({
  components: { Finances, Home, Leisure },
})
export default class Tabs extends Vue {}
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