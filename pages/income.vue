<template>
  <div>
    <Alert type="info">
      {{ $t('income.currency') }}
      <i-switch
        v-model="currency"
        size="large"
        :true-value="true"
        :false-value="false"
      >
        <span slot="open">{{ $t('income.open') }}</span>
        <span slot="close">{{ $t('income.close') }}</span>
      </i-switch>
    </Alert>
    <!--    <Divider>{{ $t('income.basic-accumulated') }}</Divider>-->
    <!--    <div id="basic-accumulated"></div>-->
    <Divider>{{ $t('income.basic-year') }}</Divider>
    <div id="basic-year"></div>
    <Divider>{{ $t('income.basic-category') }}</Divider>
    <div id="basic-category"></div>
    <Divider>{{ $t('income.advanced-year') }}</Divider>
    <div id="advanced-year"></div>
    <Divider>{{ $t('income.advanced-platform') }}</Divider>
    <div id="advanced-platform"></div>
  </div>
</template>

<script>
import * as incomeUtil from 'assets/incomeUtil'
import { income, advancedIncome } from 'assets/reader'

export default {
  name: 'Income',
  data() {
    return {
      currency: true,
      oldChart: {
        incomeChartForYearAndType: undefined,
        incomeChartForBasicCategory: undefined,
        advancedIncomeChartForYearAndType: undefined,
        advancedIncomeChartForAdvancedPlatform: undefined,
      },
    }
  },
  watch: {
    currency() {
      this.renderAllCharts()
    },
  },
  mounted() {
    this.renderAllCharts()
  },
  methods: {
    renderAllCharts() {
      for (const chart in this.oldChart) {
        if (this.oldChart[chart]) {
          this.oldChart[chart].destroy()
        }
      }
      this.oldChart.incomeChartForYearAndType = incomeUtil.renderChartForYearAndType(
        this,
        income,
        'basic-year',
        undefined,
        this.currency
      )
      this.oldChart.incomeChartForBasicCategory = incomeUtil.renderChartForBasicCategory(
        this,
        income,
        this.currency
      )
      // incomeUtil.renderChartForBasicAccumulated(this, income)
      this.oldChart.advancedIncomeChartForYearAndType = incomeUtil.renderChartForYearAndType(
        this,
        advancedIncome,
        'advanced-year',
        undefined,
        this.currency
      )
      this.oldChart.advancedIncomeChartForAdvancedPlatform = incomeUtil.renderChartForAdvancedPlatform(
        this,
        advancedIncome
      )
      // Chart 都是 autoFit 的，所以强制触发一次 resize 就可以了
      window.dispatchEvent(new Event('resize'))
    },
  },
}
</script>
