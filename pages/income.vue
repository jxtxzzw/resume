<template>
  <div>
    <Divider>{{ $t('income.balance') }}</Divider>
    <Alert type="info">
      {{ $t('income.show-original-amount') }}
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
      {{ $t('income.show-equivalent-cny') }}
    </Alert>
    <Alert>
      <CheckboxGroup
        v-model="showPendingCheckGroup"
        @on-change="renderAllCharts(['balance'])"
      >
        <Checkbox
          :key="$t('income.show-pending')"
          :label="$t('income.show-pending')"
        ></Checkbox>
      </CheckboxGroup>
    </Alert>
    <Alert>
      <CheckboxGroup
        v-model="showAnnotationCheckGroup"
        @on-change="renderAllCharts(['balance'])"
      >
        <Checkbox
          :key="$t('income.show-annotation')"
          :label="$t('income.show-annotation')"
        ></Checkbox>
      </CheckboxGroup>
    </Alert>
    <div id="balance"></div>

    <Divider>{{ $t('income.all-accumulated') }}</Divider>
    <Alert type="info">
      {{ $t('income.show-original-amount') }}
      <i-switch
        v-model="currencyAllAccumulated"
        size="large"
        :true-value="true"
        :false-value="false"
      >
        <span slot="open">{{ $t('income.open') }}</span>
        <span slot="close">{{ $t('income.close') }}</span>
      </i-switch>
      {{ $t('income.show-equivalent-cny') }}
    </Alert>
    <Alert>
      <CheckboxGroup
        v-model="showAccumulatedCheckGroup"
        @on-change="renderAllCharts(['all-accumulated'])"
      >
        <Checkbox
          :key="$t('income.show-accumulated')"
          :label="$t('income.show-accumulated')"
        ></Checkbox>
      </CheckboxGroup>
    </Alert>
    <div id="all-accumulated"></div>

    <Divider>{{ $t('income.basic-year') }}</Divider>
    <Alert type="info">
      {{ $t('income.show-original-amount') }}
      <i-switch
        v-model="currencyBasicYear"
        size="large"
        :true-value="true"
        :false-value="false"
      >
        <span slot="open">{{ $t('income.open') }}</span>
        <span slot="close">{{ $t('income.close') }}</span>
      </i-switch>
      {{ $t('income.show-equivalent-cny') }}
    </Alert>
    <div id="basic-year"></div>

    <Divider>{{ $t('income.basic-category') }}</Divider>
    <Alert type="info">
      {{ $t('income.show-original-amount') }}
      <i-switch
        v-model="currencyBasicCategory"
        size="large"
        :true-value="true"
        :false-value="false"
      >
        <span slot="open">{{ $t('income.open') }}</span>
        <span slot="close">{{ $t('income.close') }}</span>
      </i-switch>
      {{ $t('income.show-equivalent-cny') }}
    </Alert>
    <Alert type="info">
      {{ $t('income.no-negative') }}
    </Alert>
    <div id="basic-category-overview"></div>
    <div id="basic-category"></div>

    <Divider>{{ $t('income.advanced-year') }}</Divider>
    <Alert type="info">
      {{ $t('income.show-original-amount') }}
      <i-switch
        v-model="currencyAdvancedYear"
        size="large"
        :true-value="true"
        :false-value="false"
      >
        <span slot="open">{{ $t('income.open') }}</span>
        <span slot="close">{{ $t('income.close') }}</span>
      </i-switch>
      {{ $t('income.show-equivalent-cny') }}
    </Alert>
    <div id="advanced-year"></div>

    <Divider>{{ $t('income.advanced-platform') }}</Divider>
    <Alert type="info">
      {{ $t('income.show-original-amount') }}
      <i-switch
        v-model="currencyAdvancedPlatform"
        size="large"
        :true-value="true"
        :false-value="false"
      >
        <span slot="open">{{ $t('income.open') }}</span>
        <span slot="close">{{ $t('income.close') }}</span>
      </i-switch>
      {{ $t('income.show-equivalent-cny') }}
    </Alert>
    <Alert type="info">
      {{ $t('income.no-negative') }}
    </Alert>
    <div id="advanced-platform"></div>

    <Divider>{{ $t('income.tax-deduction') }}</Divider>
    <Alert type="info">
      {{ $t('income.show-original-amount') }}
      <i-switch
        v-model="currencyTaxDeduction"
        size="large"
        :true-value="true"
        :false-value="false"
        disabled
      >
        <span slot="open">{{ $t('income.open') }}</span>
        <span slot="close">{{ $t('income.close') }}</span>
      </i-switch>
      {{ $t('income.show-equivalent-cny') }}
    </Alert>
    <div id="tax-deduction"></div>
  </div>
</template>

<script>
import * as incomeUtil from 'assets/incomeUtil'
import { income, advancedIncome, balance, benefitsIncome } from 'assets/reader'

export default {
  name: 'Income',
  data() {
    return {
      currencyBasicYear: true,
      currencyBasicCategory: true,
      currencyAdvancedYear: true,
      currencyAdvancedPlatform: true,
      currencyAllAccumulated: true,
      currencyBalance: true,
      currencyTaxDeduction: false,
      oldChart: {
        allAccumulated: undefined,
        incomeChartForYearAndType: undefined,
        incomeChartForBasicCategory: undefined,
        incomeChartForBasicCategoryOverview: undefined,
        advancedIncomeChartForYearAndType: undefined,
        advancedIncomeChartForAdvancedPlatform: undefined,
        balance: undefined,
        taxDeduction: undefined,
      },
      showPendingCheckGroup: [],
      showAccumulatedCheckGroup: [this.$t('income.show-accumulated')],
      showAnnotationCheckGroup: [this.$t('income.show-annotation')],
    }
  },
  watch: {
    '$i18n.locale'() {
      this.renderAllCharts()
    },
    currencyBasicYear() {
      this.renderAllCharts(['basic-year'])
    },
    currencyBasicCategory() {
      this.renderAllCharts(['basic-category', 'basic-category-overview'])
    },
    currencyAdvancedYear() {
      this.renderAllCharts(['advanced-year'])
    },
    currencyAdvancedPlatform() {
      this.renderAllCharts(['advanced-platform'])
    },
    currencyAllAccumulated() {
      this.renderAllCharts(['all-accumulated'])
    },
    currencyBalance() {
      this.renderAllCharts(['balance'])
    },
    currencyTaxDeduction() {
      this.renderAllCharts(['tax-deduction'])
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
        'basic-category-overview',
        'advanced-year',
        'advanced-platform',
        'all-accumulated',
        'balance',
        'tax-deduction',
      ]
    ) {
      if (charts.includes('basic-year')) {
        if (this.oldChart.incomeChartForYearAndType) {
          this.oldChart.incomeChartForYearAndType.destroy()
        }
        this.oldChart.incomeChartForYearAndType =
          incomeUtil.renderChartForYearAndType(
            this,
            income,
            'basic-year',
            this.currencyBasicYear
          )
      }
      if (charts.includes('basic-category')) {
        if (this.oldChart.incomeChartForBasicCategory) {
          this.oldChart.incomeChartForBasicCategory.destroy()
        }
        this.oldChart.incomeChartForBasicCategory =
          incomeUtil.renderChartForBasicCategory(
            this,
            [income, advancedIncome, benefitsIncome],
            this.currencyBasicCategory
          )
      }
      if (charts.includes('basic-category-overview')) {
        if (this.oldChart.incomeChartForBasicCategoryOverview) {
          this.oldChart.incomeChartForBasicCategoryOverview.destroy()
        }
        this.oldChart.incomeChartForBasicCategoryOverview =
          incomeUtil.renderChartForBasicCategoryOverview(
            this,
            income,
            advancedIncome,
            benefitsIncome,
            this.currencyBasicCategory
          )
      }
      if (charts.includes('advanced-year')) {
        if (this.oldChart.advancedIncomeChartForYearAndType) {
          this.oldChart.advancedIncomeChartForYearAndType.destroy()
        }
        this.oldChart.advancedIncomeChartForYearAndType =
          incomeUtil.renderChartForYearAndType(
            this,
            advancedIncome,
            'advanced-year',
            this.currencyAdvancedYear
          )
      }
      if (charts.includes('advanced-platform')) {
        if (this.oldChart.advancedIncomeChartForAdvancedPlatform) {
          this.oldChart.advancedIncomeChartForAdvancedPlatform.destroy()
        }
        this.oldChart.advancedIncomeChartForAdvancedPlatform =
          incomeUtil.renderChartForAdvancedPlatform(
            this,
            advancedIncome,
            this.currencyAdvancedPlatform
          )
      }
      if (charts.includes('all-accumulated')) {
        if (this.oldChart.allAccumulated) {
          this.oldChart.allAccumulated.destroy()
        }
        this.oldChart.allAccumulated = incomeUtil.renderChartForAllAccumulated(
          this,
          [income, advancedIncome],
          this.currencyAllAccumulated,
          this.showAccumulatedCheckGroup.includes(
            this.$t('income.show-accumulated')
          )
        )
      }
      if (charts.includes('balance')) {
        if (this.oldChart.balance) {
          this.oldChart.balance.destroy()
        }
        this.oldChart.balance = incomeUtil.renderChartForBalance(
          this,
          balance,
          this.showPendingCheckGroup.includes(this.$t('income.show-pending'))
        )
      }
      if (charts.includes('tax-deduction')) {
        if (this.oldChart.taxDeduction) {
          this.oldChart.taxDeduction.destroy()
        }
        this.oldChart.taxDeduction = incomeUtil.renderChartForTaxAndDeduction(
          this,
          income
        )
      }
      // Chart 都是 autoFit 的，所以强制触发一次 resize 就可以了
      window.dispatchEvent(new Event('resize'))
    },
  },
}
</script>

<style>
#app-container-balance {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

#g2-container-balance {
  flex: auto;
}

#g2-customize-tooltip-balance {
  margin-bottom: 16px;
  font-size: 12px;
}

#g2-customize-tooltip-balance .tooltip-items {
  display: flex;
  flex-direction: row;
}

#g2-customize-tooltip-balance .tooltip-item {
  flex-basis: 240px;
  padding-left: 8px;
  margin-right: 12px;
}

#g2-customize-tooltip-balance .tooltip-item .tooltip-item-value {
  font-size: 16px;
  font-weight: bold;
}

#g2-customize-tooltip-balance .tooltip-item-info {
  display: flex;
  justify-content: space-between;
}

#g2-customize-tooltip-balance .tooltip-item-info .info-item {
  display: flex;
}

#g2-customize-tooltip-balance .tooltip-item-info .info-item .info-item-name {
  opacity: 0.65;
}

#g2-customize-tooltip-balance .tooltip-item-info .info-item .info-item-value {
  margin-left: 8px;
}
</style>
