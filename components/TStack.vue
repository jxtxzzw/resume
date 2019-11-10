<template>
  <div>
    <Alert type="success" show-icon>
      这里是我对自己技术栈的展示，掌握程度剧透较强的主观性，仅供参考。
    </Alert>
    <Alert type="info" show-icon>
      掌握程度基于 Dreyfus Model。<br/>
      掌握程度越低就是了解越少、甚至没有实际操作过；掌握程度越高就是非常熟练的掌握。具体来说：<br/>
        低于 10% - 新手：
          需要严格按照指令清单才能做事，不是特别想要学习，只是想实现一个立竿见影的目标，不知道如何应对错误。<br/>
        10% ~ 60% - 高级新手：
          能够根据过去的经验，逐步在正确的情境中采纳建议，但比较吃力。多数情况下没有全局思维。<br/>
        60% ~ 75% - 胜任：
          能够基于谨慎的计划和过去的经验解决问题。开始承担一定的领导角色，并充当指导人。<br/>
        75% ~ 90% - 精通：
          可以通过Case Study或从专家身上学到东西。具有全局思维，会主动获取围绕这个技术的概念框架，能够应用准确应用通用规则。<br/>
        90% ~ 100% - 专家：
          凭直觉工作。总是不断地寻找更好的方法和方式去做事，可以在恰当的情境中选取和应用丰富的经验。<br/>
    </Alert>
    <Alert type="success" show-icon>
      仅了解，掌握的知识不足以支撑现有工作、或不曾经历实战的技术栈，使用红色出错标记。<br/>
      已经有一定掌握支撑现有工作，并正在学习中的技术栈，使用蓝色激活标记。<br/>
      已经有一定掌握支撑现有工作，暂时不在学习，但计划在未来学习的技术栈，使用蓝色普通标记。<br/>
      已经有一定掌握支撑现有工作，且在未来一段时间没有继续学习计划的技术栈，使用绿色成功标记。<br/>
    </Alert>
    <div v-for="item in TStackData"
         :key="item.name">
      <p> {{item.name}} </p>
      <Progress :percent="item.percent"
                :status="item.status" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'TStack',
  data () {
    return {
      TStackData: []
    }
  },
  async mounted () {
    await axios.get('https://www.jxtxzzw.com/resume/data/static/TStackData.json')
      .then(res => {
        this.TStackData = res.data
      })
  }
}
</script>

<style scoped>

</style>
