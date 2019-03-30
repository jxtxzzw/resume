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
<style>
  .demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
  }
</style>
<template lang="pug">
  div(class="layout")
    Layout(:style="{minHeight: '-webkit-fill-available'}")
      Header
        Menu(mode="horizontal", theme="dark", active-name="1", @on-select="toMySites")
          div(class="layout-logo")
          div(class="layout-nav")
            MenuItem(name="blog")
              Icon(type="logo-wordpress")
              | 个人博客
            MenuItem(name="resume")
              Icon(type="md-person")
              | 个人主页
            MenuItem(name="gitlab")
              Icon(type="md-git-branch")
              | 代码仓库
      Layout
        Sider(hide-trigger, :style="{background: '#fff'}")
          Menu(accordion, active-name="1-2", theme="light", width="auto", :open-names="['1']", @on-select="changeMenu")
            Submenu(name="experience")
              template(slot="title")
                Icon(type="md-person")
                | 个人经历
              MenuItem(name="introduction") 个人简介
              MenuItem(name="StudyTimeline") 学习经历
              MenuItem(name="CareerTimeline") 工作经历
              MenuItem(name="Honor") 获奖情况
              MenuItem(name="ExamCertification") 成绩证明
              MenuItem(name="contact") 联系方式
            Submenu(name="skill")
              template(slot="title")
                Icon(type="md-school")
                | 专业技能
              MenuItem(name="OJ") OJ做题记录
              MenuItem(name="OnlineCourse") 网络课程
              MenuItem(name="ProfessionalBook") 专业书籍
              MenuItem(name="Projects") 项目
              <!--MenuItem(name="publishedPaper") 发表的论文-->
              <!--MenuItem(name="publishedBook") 出版的书籍-->
            Submenu(name="entertainment")
              template(slot="title")
                Icon(type="md-laptop")
                | 兴趣娱乐
              MenuItem(name="Fiction") 小说
              MenuItem(name="Game") 游戏
              MenuItem(name="Movie") 影视
        Layout(:style="{padding: '24px 24px 24px'}")
          Content(:style="{padding: '24px', background: '#fff'}" id="waterfallwrapper")
            div(v-if="currentItem===''")
              Alert(type="success", show-icon)
                | 欢迎访问我的个人主页
                template(slot="desc")
                  | 门面总还是要有的，这是一个基于Vue的前端页面，包括了更详细的个人简历、学习经历、获奖情况，以及包括专业课成绩和OJ做题记录，甚至包括了我读过的小说、玩过的游戏、看过的电影以及我个人对他们的评价
              Alert(show-icon)
                | 随便点开一个看看吧
                template(slot="desc")
                  | 在左边的导航菜单中可以看到我的个人简历、专业技能的掌握情况，以及看过的小说和电影、玩过的游戏
              Alert(type="success", show-icon)
                | 还可以在上侧导航栏中访问我的其他站点
                template(slot="desc")
                  | 个人博客，基于WordPress，里面有我的学习笔记、专业课作业、游记和见闻；代码仓库，基于GitLab，有些不想放到GitHub上的东西，或者暂时需要保密的代码，就放在自己的私有代码仓库
            div(v-else-if="currentItem==='OJ'")
              OJ
            div(v-else-if="currentItem==='StudyTimeline'")
              StudyTimeline
            div(v-else-if="currentItem==='CareerTimeline'")
              CareerTimeline
            div(v-else-if="currentItem==='Projects'")
              Projects
            div(v-else-if="currentItem==='Movie'")
              Movie
            div(v-else-if="currentItem==='ExamCertification'")
              ExamCertification
            div(v-else-if="currentItem==='Game'")
              Game
            div(v-else-if="currentItem==='Fiction'")
              Fiction
            div(v-else-if="currentItem==='Honor'", id="honor")
              Honor
            div(v-else-if="currentItem==='ProfessionalBook'")
              ProfessionalBook
            div(v-else-if="currentItem==='OnlineCourse'")
              OnlineCourse
            div(v-else)
              Alert(type="error", show-icon)
                | 这个页面还在施工中
                template(slot="desc")
                  | 这个页面还在施工中，过段时间再来访问吧
</template>

<script>
import OJ from './OJ'
import Movie from './Movie'
import Projects from './Projects'
import StudyTimeline from './StudyTimeline'
import CareerTimeline from './CareerTimeline'
import ExamCertification from './ExamCertification'
import Game from './Game'
import Fiction from './Fiction'
import Honor from './Honor'
import {BLOG_URL, GITLAB_URL} from '../data/Constant'
import ProfessionalBook from './ProfessionalBook'
import OnlineCourse from './OnlineCourse'
export default {
  name: 'ResumeLayout',
  components: {OnlineCourse, ProfessionalBook, Honor, ExamCertification, OJ, Movie, Projects, StudyTimeline, CareerTimeline, Game, Fiction},
  data () {
    return {
      currentItem: ''
    }
  },
  methods: {
    changeMenu (name) {
      this.currentItem = name
    },
    toMySites (name) {
      switch (name) {
        case 'blog':
          window.open(BLOG_URL, 'blog')
          break
        case 'resume':
          location.reload()
          break
        case 'gitlab':
          window.open(GITLAB_URL, 'gitlab')
          break
      }
    },
    init: async function () {
      this.$Spin.show({
        render: (h) => {
          return h('div', [
            h('Icon', {
              'class': 'demo-spin-icon-load',
              props: {
                type: 'ios-loading',
                size: 200
              }
            }),
            h('div', '加载中……')
          ])
        }
      })
      setTimeout(() => {
        this.$Spin.hide()
      }, 1000)
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="scss">
  * {
  margin: 0;
  padding: 0;
  }
  a {
    color: #2d8cf0;
    text-decoration: none;
    &:active {
      color: #5cadff;
    }
  }
  html,
  body,
  #waterfallwrapper {
    height: 100%;
  }
  #waterfallwrapper {
    position: relative;
    #header {
      display: block;
      text-align: center;
      background: #000;
      color: #cccccc;
      line-height: 32px;
      font-size: 16px;
      font-weight: bold;
      letter-spacing: 2px;
      position: fixed;
      /*z-index: 999;*/
      width: 100%;
    }
    #honor {
      position: absolute;
      top: 32px;
      bottom: 32px;
      width: 95%;
    }
  }
  #waterfallwrapper {
    overflow: auto;
    position: relative;
    .some-info {
      line-height: 2 ;
      /*font-size: 14px;*/
      text-align: center;
    }
  }
</style>
