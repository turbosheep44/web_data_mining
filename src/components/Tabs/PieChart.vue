
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
</script>

<style lang="scss">
</style>