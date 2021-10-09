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
      [
        '#FF6B3B',
        '#5B8FF9',
        '#FFC100',
        '#61DDAA',
        '#76523B',
        '#0E8E89',
        '#E19348',
        '#F383A2',
        '#247FEA',
      ],
      true
    )
    incomeUtil.renderChartForBasicCategory(this, income, true)
    incomeUtil.renderChartForBasicAccumulated(this, income)
    incomeUtil.renderChartForYearAndType(
      this,
      advancedIncome,
      'advanced-year',
      [
        '#025DF4',
        '#DB6BCF',
        '#2498D1',
        '#bbbde6',
        '#4045b2',
        '#21A97A',
        '#FF745A',
        '#007E99',
        '#FFA8A8',
        '#2391FF',
      ],
      true
    )
    incomeUtil.renderChartForAdvancedPlatform(this, advancedIncome)
    // Chart 都是 autoFit 的，所以强制触发一次 resize 就可以了
    window.dispatchEvent(new Event('resize'))
  },
}
</script>
