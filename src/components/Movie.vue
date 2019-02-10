<template lang="pug">
  Collapse(v-model="value2", accordion)
    Panel(name="1") 史蒂夫·乔布斯
      p(slot="content") 史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。
    Panel(name="2") 史蒂夫·乔布斯
      p(slot="content") 史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。
</template>
<script>
export default {
  name: 'Movie',
  data () {
    return {
      value2: '1'
    }
  }
}
</script>
