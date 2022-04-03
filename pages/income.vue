<template>
  <div>
    <Divider>{{ $t('income.basic-year') }}</Divider>
    <Alert type="info">
      {{ $t('income.currency') }}
      <i-switch
        v-model="currency.basicYear"
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
        v-model="currency.basicCategory"
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
        v-model="currency.advancedYear"
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
        v-model="currency.advancedPlatform"
        size="large"
        disabled
        :true-value="true"
        :false-value="false"
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
        v-model="currency.allAccumulated"
        size="large"
        disabled
        :true-value="true"
        :false-value="false"
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
        v-model="currency.balance"
        size="large"
        disabled
        :true-value="true"
        :false-value="false"
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
      currency: {
        allAccumulated: false,
        basicYear: true,
        basicCategory: true,
        advancedYear: true,
        advancedPlatform: false,
        balance: true,
      },
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
    currency: {
      handler() {
        this.renderAllCharts()
      },
      deep: true,
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
      this.oldChart.allAccumulated = incomeUtil.renderChartForAllAccumulated(
        this,
        income
      )
      this.oldChart.incomeChartForYearAndType = incomeUtil.renderChartForYearAndType(
        this,
        income,
        'basic-year',
        undefined,
        this.currency.basicYear
      )
      this.oldChart.incomeChartForBasicCategory = incomeUtil.renderChartForBasicCategory(
        this,
        income,
        this.currency.basicCategory
      )
      this.oldChart.advancedIncomeChartForYearAndType = incomeUtil.renderChartForYearAndType(
        this,
        advancedIncome,
        'advanced-year',
        undefined,
        this.currency.advancedYear
      )
      this.oldChart.advancedIncomeChartForAdvancedPlatform = incomeUtil.renderChartForAdvancedPlatform(
        this,
        advancedIncome
      )
      this.oldChart.balance = incomeUtil.renderChartForBalance(this, balance)
      // Chart 都是 autoFit 的，所以强制触发一次 resize 就可以了
      window.dispatchEvent(new Event('resize'))
    },
  },
}
</script>
