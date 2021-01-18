<template>
  <b-card no-body>
    <b-card-header @click="toggleCollapse" :class="['toggle-header', { 'employment-header': title === 'Unemployed' }]">
      <div class="d-flex justify-content-between align-items-center">
        <span>{{ title }}</span>
        <font-awesome-icon icon="chevron-down" :class="['chevron', visible ? 'chevron-open' : '', collapse ? '' : 'chevron-hide']" />
      </div>
    </b-card-header>

    <b-collapse :visible="visible">
      <b-card-body>
        <div class="d-flex justify-content-between align-items-center">
          <span>
            <span>Wage</span>
            <font-awesome-icon size="sm" icon="hryvnia" class="ml-2" />
          </span>
          <span :class="['font-weight-bold font-italic', { 'text-success': wage > 0 }]">€{{ wage.toLocaleString() }} </span>
        </div>
        <div class="d-flex justify-content-between align-items-center">
          <span>
            <span>Hours</span>
            <font-awesome-icon size="sm" icon="smile" class="ml-2" />
          </span>
          <span :class="['font-weight-bold font-italic', { 'text-danger': hours > 0 }]"> {{ hours }}hrs </span>
        </div>
      </b-card-body>
    </b-collapse>
  </b-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({})
export default class Employment extends Vue {
  @Prop() collapseID: string
  @Prop() title: string
  @Prop() wage: number
  @Prop() hours: number
  @Prop() collapse: boolean

  private visible: boolean = true

  mounted() {
    if (this.collapse) this.visible = false
  }

  toggleCollapse() {
    if (this.collapse) this.visible = !this.visible
  }
}
</script>

<style lang="scss">
.employment-header {
  background-color: #882525;
  color: white;
}

.chevron {
  transition: transform 300ms linear;

  &-open {
    transform: rotate(180deg);
  }
  &-hide {
    display: none;
  }
}
</style>