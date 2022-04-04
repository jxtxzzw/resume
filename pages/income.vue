<template>
  <div>
    <Divider>{{ $t('income.basic-year') }}</Divider>
    <Alert type="info">
      {{ $t('income.currency') }}
      <i-switch
        v-model="currencyBasicYear"
        size="large"
        :true-value="true"
        :false-value="false"
      >
        <span slot="open">{{ $t('income.open') }}</span>
        <span slot="close">{{ $t('income.close') }}</span>
      </i-switch>
    </Alert>
    <div id="basic-year"></div>

    <Divider>{{ $t('income.basic-category') }}</Divider>
    <Alert type="info">
      {{ $t('income.currency') }}
      <i-switch
        v-model="currencyBasicCategory"
        size="large"
        :true-value="true"
        :false-value="false"
      >
        <span slot="open">{{ $t('income.open') }}</span>
        <span slot="close">{{ $t('income.close') }}</span>
      </i-switch>
    </Alert>
    <div id="basic-category"></div>

    <Divider>{{ $t('income.advanced-year') }}</Divider>
    <Alert type="info">
      {{ $t('income.currency') }}
      <i-switch
        v-model="currencyAdvancedYear"
        size="large"
        :true-value="true"
        :false-value="false"
      >
        <span slot="open">{{ $t('income.open') }}</span>
        <span slot="close">{{ $t('income.close') }}</span>
      </i-switch>
    </Alert>
    <div id="advanced-year"></div>

    <Divider>{{ $t('income.advanced-platform') }}</Divider>
    <Alert type="info">
      {{ $t('income.currency') }}
      <i-switch
        v-model="currencyAdvancedPlatform"
        size="large"
        :true-value="true"
        :false-value="false"
        disabled
      >
        <span slot="open">{{ $t('income.open') }}</span>
        <span slot="close">{{ $t('income.close') }}</span>
      </i-switch>
    </Alert>
    <div id="advanced-platform"></div>

    <Divider>{{ $t('income.all-accumulated') }}</Divider>
    <Alert type="info">
      {{ $t('income.currency') }}
      <i-switch
        v-model="currencyAllAccumulated"
        size="large"
        :true-value="true"
        :false-value="false"
        disabled
      >
        <span slot="open">{{ $t('income.open') }}</span>
        <span slot="close">{{ $t('income.close') }}</span>
      </i-switch>
    </Alert>
    <div id="all-accumulated"></div>

    <Divider>{{ $t('income.balance') }}</Divider>
    <Alert type="info">
      {{ $t('income.currency') }}
      <i-switch
        v-model="currencyBalance"
        size="large"
        :true-value="true"
        :false-value="false"
        disabled
      >
        <span slot="open">{{ $t('income.open') }}</span>
        <span slot="close">{{ $t('income.close') }}</span>
      </i-switch>
    </Alert>
    <div id="balance"></div>
  </div>
</template>

<script>
import * as incomeUtil from 'assets/incomeUtil'
import { income, advancedIncome, balance } from 'assets/reader'

export default {
  name: 'Income',
  data() {
    return {
      currencyBasicYear: true,
      currencyBasicCategory: true,
      currencyAdvancedYear: true,
      currencyAdvancedPlatform: false,
      currencyAllAccumulated: true,
      currencyBalance: true,
      oldChart: {
        allAccumulated: undefined,
        incomeChartForYearAndType: undefined,
        incomeChartForBasicCategory: undefined,
        advancedIncomeChartForYearAndType: undefined,
        advancedIncomeChartForAdvancedPlatform: undefined,
        balance: undefined,
      },
    }
  },
  watch: {
    currencyBasicYear() {
      this.renderAllCharts(['basic-year'])
    },
    currencyBasicCategory() {
      this.renderAllCharts(['basic-category'])
    },
    currencyAdvancedYear() {
      this.renderAllCharts(['advanced-year'])
    },
  },
  mounted() {
    this.renderAllCharts()
  },
  methods: {
    renderAllCharts(
      charts = [
        'basic-year',
        'basic-category',
        'advanced-year',
        'advanced-platform',
        'all-accumulated',
        'balance',
      ]
    ) {
      if (charts.includes('basic-year')) {
        if (this.oldChart.incomeChartForYearAndType) {
          this.oldChart.incomeChartForYearAndType.destroy()
        }
        this.oldChart.incomeChartForYearAndType = incomeUtil.renderChartForYearAndType(
          this,
          income,
          'basic-year',
          undefined,
          this.currencyBasicYear
        )
      }

      if (charts.includes('basic-category')) {
        if (this.oldChart.incomeChartForBasicCategory) {
          this.oldChart.incomeChartForBasicCategory.destroy()
        }
        this.oldChart.incomeChartForBasicCategory = incomeUtil.renderChartForBasicCategory(
          this,
          income,
          this.currencyBasicCategory
        )
      }

      if (charts.includes('advanced-year')) {
        if (this.oldChart.advancedIncomeChartForYearAndType) {
          this.oldChart.advancedIncomeChartForYearAndType.destroy()
        }
        this.oldChart.advancedIncomeChartForYearAndType = incomeUtil.renderChartForYearAndType(
          this,
          advancedIncome,
          'advanced-year',
          undefined,
          this.currencyAdvancedYear
        )
      }

      if (charts.includes('advanced-platform')) {
        this.oldChart.advancedIncomeChartForAdvancedPlatform = incomeUtil.renderChartForAdvancedPlatform(
          this,
          advancedIncome
        )
      }

      if (charts.includes('all-accumulated')) {
        this.oldChart.allAccumulated = incomeUtil.renderChartForAllAccumulated(
          this,
          [income, advancedIncome]
        )
      }
      if (charts.includes('balance')) {
        this.oldChart.balance = incomeUtil.renderChartForBalance(this, balance)
      }

      // Chart 都是 autoFit 的，所以强制触发一次 resize 就可以了
      window.dispatchEvent(new Event('resize'))
    },
  },
}
</script>
