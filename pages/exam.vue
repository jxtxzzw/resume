<template>
  <div>
    <Row v-for="item in exam" :key="item.name">
      <i-col>
        <Card>
          <p slot="title">
            {{ item.name }}
          </p>
          <div>
            <i-circle
              v-for="(section, index) in item.sections"
              :key="section"
              :percent="percent(item, index)"
              dashboard
              stroke-color="#2D8CF0"
            >
              <div class="demo-Circle-custom">
                <h1>
                  {{ item.scores[index] }}
                </h1>
                <p>
                  {{ section }}
                </p>
              </div>
              <span v-if="parseFloat(item.zeros[index]) === 0">
                {{ $t('exam.total') }}
                <i>
                  {{ item.totals[index] }}
                </i>
              </span>
              <span v-else>
                <i>
                  {{ item.zeros[index] + '~' + item.totals[index] }}
                </i>
              </span>
            </i-circle>
            <i-circle
              key="sum"
              :percent="percent(item, null)"
              dashboard
              stroke-color="#5cb85c"
            >
              <div class="demo-Circle-custom">
                <h1>
                  {{ sum(item.scores) }}
                </h1>
                <p>
                  {{ $t('exam.sum') }}
                </p>
              </div>
              <span v-if="parseFloat(sum(item.zeros)) === 0">
                {{ $t('exam.total') }}
                <i>
                  {{ sum(item.totals) }}
                </i>
              </span>
              <span v-else>
                <i>
                  {{ sum(item.zeros) + '~' + sum(item.totals) }}
                </i>
              </span>
            </i-circle>
          </div>
        </Card>
      </i-col>
    </Row>
  </div>
</template>

<script>
import { exam } from 'assets/reader'
export default {
  name: 'Exam',
  data() {
    return {
      exam,
    }
  },
  methods: {
    percent(item, index) {
      let p = 0
      if (index != null) {
        p =
          ((parseFloat(item.scores[index]) - parseFloat(item.zeros[index])) /
            (parseFloat(item.totals[index]) - parseFloat(item.zeros[index]))) *
          100
      } else {
        p =
          ((parseFloat(this.sum(item.scores)) -
            parseFloat(this.sum(item.zeros))) /
            (parseFloat(this.sum(item.totals)) -
              parseFloat(this.sum(item.zeros)))) *
          100
      }
      return p
    },
    sum(arr) {
      let sum = 0
      for (const x of arr) {
        sum += parseFloat(x)
      }
      return sum
    },
  },
}
</script>
