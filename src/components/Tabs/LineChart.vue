
<script lang="ts">
import { mixins, Line } from 'vue-chartjs'
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component({
  extends: Line,
  mixins: [mixins.reactiveProp],
})
export default class LineChart extends Vue {
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