<template>
  <div>
    <div id="credit-score"></div>
  </div>
</template>

<script>
import * as creditUtil from 'assets/creditUtil'
import { credit } from 'assets/reader'

export default {
  name: 'Credit',
  data() {
    return {
      oldChart: {
        creditScore: undefined,
      },
    }
  },
  mounted() {
    this.renderAllCharts()
  },
  methods: {
    renderAllCharts(charts = ['credit-score']) {
      if (charts.includes('credit-score')) {
        this.oldChart.creditScore = creditUtil.renderChartForCredit(
          this,
          credit
        )
      }
      // Chart 都是 autoFit 的，所以强制触发一次 resize 就可以了
      window.dispatchEvent(new Event('resize'))
    },
  },
}
</script>
