<style scoped>
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }
  .layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
  }
  .layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
  }
</style>
<template lang="pug">
  div(class="layout")
    Layout
      Header
        Menu(mode="horizontal", theme="dark", active-name="1", @on-select="toMySites")
          div(class="layout-logo")
          div(class="layout-nav")
            MenuItem(name="blog")
              Icon(type="ios-navigate")
              | 个人博客
            MenuItem(name="resume")
              Icon(type="ios-keypad")
              | 个人主页
            MenuItem(name="gitlab")
              Icon(type="ios-analytics")
              | 代码仓库
      Layout
        Sider(hide-trigger, :style="{background: '#fff', margin: '0 0 0 0'}")
          Menu(accordion, active-name="1-2", theme="light", width="auto", :open-names="['1']", @on-select="changeMenu")
            Submenu(name="experience")
              template(slot="title")
                Icon(type="ios-navigate")
                | 个人经历
              MenuItem(name="introduction") 个人简介
              MenuItem(name="study") 学习经历
              MenuItem(name="work") 工作经历
              MenuItem(name="honor") 获奖情况
              MenuItem(name="contact") 联系方式
            Submenu(name="skill")
              template(slot="title")
                Icon(type="ios-keypad")
                | 专业技能
              MenuItem(name="oj") OJ做题记录
              MenuItem(name="project") 参与的项目
              MenuItem(name="mooc") 学习的MOOC
              MenuItem(name="readPaper") 读过的论文
              MenuItem(name="readBook") 读过的书籍
              MenuItem(name="publishedPaper") 发表的论文
              MenuItem(name="publishedBook") 出版的书籍
            Submenu(name="entertainment")
              template(slot="title")
                Icon(type="ios-analytics")
                | 兴趣娱乐
              MenuItem(name="fiction") 小说
              MenuItem(name="game") 游戏
              MenuItem(name="video") 影视
        Layout(:style="{padding: '24px 24px 24px'}")
          Content(:style="{padding: '24px', background: '#fff'}")
            OJ
            Movie
            Projects
            StudyTimeline
</template>
<script>
import OJ from './OJ'
import Movie from './Movie'
import Projects from './Projects'
import StudyTimeline from './StudyTimeline'
export default {
  name: 'ResumeLayout',
  components: {OJ, Movie, Projects, StudyTimeline},
  methods: {
    changeMenu (name) {
      console.log(name)
    },
    toMySites (name) {
      console.log(name)
    }
  },
  mounted () {
    // this.changeMenu()
  }
}
</script>
