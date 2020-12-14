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
              :percent="
                (parseFloat(item.scores[index]) /
                  parseFloat(item.totals[index])) *
                100
              "
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
              <span>
                {{ $t('exam.total') }}
                <i>
                  {{ item.totals[index] }}
                </i>
              </span>
            </i-circle>
            <i-circle
              key="sum"
              :percent="
                (parseFloat(sum(item.scores)) / parseFloat(sum(item.totals))) *
                100
              "
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
              <span>
                {{ $t('exam.total') }}
                <i>
                  {{ sum(item.totals) }}
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
