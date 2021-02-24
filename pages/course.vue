<template>
  <div>
    <span v-for="c in course" :key="c.id" style="margin-right: 20px">
      <Badge :text="getShowText(c.score, c.max_score, c.grade)" type="success">
        <Tag type="dot" color="primary">{{
          `${c.course} (${c.university})`
        }}</Tag>
      </Badge>
    </span>
  </div>
</template>

<script>
import { course } from 'assets/reader'
export default {
  name: 'Course',
  data() {
    return {
      course,
    }
  },
  methods: {
    getShowText(score, maxScore, grade) {
      let text = ''
      if (score != null && score > 0) {
        text += ` ${score}/${maxScore} `
      }
      if (grade != null) {
        text += ` ${grade} `
      }
      return text
    },
  },
}
</script>
