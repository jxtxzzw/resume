<template>
  <div>
    <div id="basic-year"></div>
    <div id="basic-type"></div>
    <div id="basic-accumulated"></div>
    <div id="advanced-year"></div>
    <div id="advanced-platform"></div>
    <div id="advanced-accumulated"></div>
  </div>
</template>

<script>
import * as incomeUtil from 'assets/incomeUtil'
import { income } from 'assets/reader'
export default {
  name: 'Income',
  mounted() {
    incomeUtil.renderChartForBasicYear(this, income)
    // Chart 都是 autoFit 的，所以强制触发一次 resize 就可以了
    window.dispatchEvent(new Event('resize'))
  },
}
</script>
