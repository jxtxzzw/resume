<template>
  <div>
    <Alert>
      <p>{{ $t('credit.source') }}</p>
      <CheckboxGroup v-model="checkAllGroupSource" @on-change="renderAllCharts">
        <Checkbox v-for="s in uniqueSource" :key="s" :label="s"></Checkbox>
      </CheckboxGroup>
      <Divider size="small" class="ivu-m-0" />
      <p>{{ $t('credit.model') }}</p>
      <CheckboxGroup v-model="checkAllGroupModel" @on-change="renderAllCharts">
        <Checkbox
          v-for="m in uniqueModel"
          :key="m"
          :label="m"
          :disabled="forceCheckedModel.includes(m)"
        ></Checkbox>
      </CheckboxGroup>
      <Divider size="small" class="ivu-m-0" />
      <p>{{ $t('credit.range') }}</p>
      <CheckboxGroup v-model="checkAllGroupRange" @on-change="renderAllCharts">
        <Checkbox v-for="m in uniqueModel" :key="m" :label="m"></Checkbox>
      </CheckboxGroup>
    </Alert>
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
      uniqueSource: [],
      uniqueModel: [],
      checkAllGroupSource: [],
      checkAllGroupModel: [],
      checkAllGroupRange: [],
      forceCheckedModel: [],
      oldChart: {
        creditScore: undefined,
      },
    }
  },
  mounted() {
    this.prepareData()
    this.renderAllCharts()
  },
  methods: {
    prepareData() {
      this.uniqueSource = credit
        .map((e) => {
          return e.source
        })
        .filter((value, index, self) => {
          return self.indexOf(value) === index
        })
      this.uniqueModel = credit
        .map((e) => {
          return e.model
        })
        .filter((value, index, self) => {
          return self.indexOf(value) === index
        })
      this.checkAllGroupSource = [...this.uniqueSource]
      this.checkAllGroupModel = [...this.uniqueModel]
      this.checkAllGroupRange = []
    },
    renderAllCharts() {
      if (this.oldChart.creditScore) {
        this.oldChart.creditScore.destroy()
      }
      this.forceCheckedModel = this.checkAllGroupRange
      for (const m of this.forceCheckedModel) {
        if (!this.checkAllGroupModel.includes(m)) {
          this.checkAllGroupModel.push(m)
        }
      }
      this.oldChart.creditScore = creditUtil.renderChartForCredit(
        this,
        credit,
        [
          this.checkAllGroupSource,
          this.checkAllGroupModel,
          this.checkAllGroupRange,
        ]
      )
      // Chart 都是 autoFit 的，所以强制触发一次 resize 就可以了
      window.dispatchEvent(new Event('resize'))
    },
  },
}
</script>
