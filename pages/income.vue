<template>
  <div>
    <Divider>{{ $t('income.basic-year') }}</Divider>
    <div id="basic-year"></div>
    <Divider>{{ $t('income.basic-category') }}</Divider>
    <div id="basic-category"></div>
    <!--    <Divider>{{ $t('income.basic-accumulated') }}</Divider>-->
    <!--    <div id="basic-accumulated"></div>-->
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
  mounted() {
    incomeUtil.renderChartForYearAndType(
      this,
      income,
      'basic-year',
      undefined,
      true
    )
    incomeUtil.renderChartForBasicCategory(this, income, true)
    // incomeUtil.renderChartForBasicAccumulated(this, income)
    incomeUtil.renderChartForYearAndType(
      this,
      advancedIncome,
      'advanced-year',
      undefined,
      true
    )
    incomeUtil.renderChartForAdvancedPlatform(this, advancedIncome)
    // Chart 都是 autoFit 的，所以强制触发一次 resize 就可以了
    window.dispatchEvent(new Event('resize'))
  },
}
</script>
