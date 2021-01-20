
<script lang="ts">
import { Pie, mixins } from 'vue-chartjs'
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component({
  extends: Pie,
  mixins: [mixins.reactiveProp],
})
export default class PieChart extends Vue {
  @Prop() options: object
  @Prop() chartData: object

  public renderChart!: (chartData: object, options: object) => void

  mounted() {
    this.renderChart(this.chartData, this.options)
  }

  @Watch('options')
  redraw() {
    this.renderChart(this.chartData, this.options)
  }
}

export const COLORS = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf']
</script>

<style lang="scss">
</style>