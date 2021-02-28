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
    renderForEach(h, c) {
      let verticalOffset = 0
      const tag = h(
        'Tag',
        {
          attrs: {
            type: 'dot',
            color: 'primary',
          },
        },
        `${c.course} (${c.university})`
      )
      let scoreWrapper = tag
      if (c.score != null) {
        scoreWrapper = h(
          'Badge',
          {
            attrs: {
              text: `${c.score}/${c.max_score}`,
              type: 'primary',
              offset: [verticalOffset, 50],
            },
          },
          [tag]
        )
        verticalOffset -= 20
      }
      let gradePointWrapper = scoreWrapper
      if (c.grade_point != null) {
        gradePointWrapper = h(
          'Badge',
          {
            attrs: {
              text: `${c.grade_point}/${c.max_grade_point}`,
              type: 'info',
              offset: [verticalOffset, 50],
            },
          },
          [scoreWrapper]
        )
      }
      let gradeWrapper = gradePointWrapper
      if (c.grade != null) {
        gradeWrapper = h(
          'Badge',
          {
            attrs: {
              text: c.grade,
              type: 'success',
            },
          },
          [gradePointWrapper]
        )
      }
      return h(
        'span',
        {
          style: {
            marginRight: '40px',
            marginTop: '40px',
          },
        },
        [gradeWrapper]
      )
    },
  },
  render(h) {
    const list = []
    for (const c of this.course) {
      list.push(this.renderForEach(h, c))
    }
    return h('div', [
      h('div', {
        style: {
          height: '20px',
        },
      }),
      h('div', list),
    ])
  },
}
</script>
