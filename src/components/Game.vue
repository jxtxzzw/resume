<template lang="pug">
  Collapse(v-model="value2", accordion)
    Panel(name="1")
      Rate(disabled, v-model="valueDisabled")
      | 古剑奇谭三：梦付千秋星垂野
      Tooltip(content="已通关")
        Icon(:style="{margin: ' 0 10px 0 10px'}", type="ios-game-controller-b", size="30", color="#5cb85c")
      Tag(color='success') 于2018-12-11通关
      Tag(color='orange') RPG
      p(slot="content") 天道作何，吞恨着多，千秋竞岁，扶苦争逐，昆仑有玉，以为兵戈，山海遥阔，万世奋飞
    Panel(name="2")
      Rate(disabled, v-model="valueDisabled1")
      | 塞尔达传说：荒野之息
      Tooltip(content="云玩家（观看通关视频）")
        Icon(:style="{margin: ' 0 10px 0 10px'}", type="ios-cloud-done", size="30", color="#2d8cf0")
      Tag(color='primary') 游戏中
      p(slot="content") 112223333
</template>
<script>
export default {
  name: 'Game',
  data () {
    return {
      value2: '1',
      valueDisabled: 5,
      valueDisabled1: 1
    }
  }
}
</script>
