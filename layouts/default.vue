
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
          Menu(accordion, active-name="1-2", theme="light", width="auto", :open-names="['1']")
            Submenu(name="experience")
              template(slot="title")
                Icon(type="md-person")
                | 个人经历
              MenuItem(name="introduction" to="Reserved") 个人简介
              MenuItem(name="StudyTimeline" to="StudyTimeline") 学习经历
              MenuItem(name="CareerTimeline" to="CareerTimeline") 工作经历
              MenuItem(name="Honor" to="Honor") 获奖情况
              MenuItem(name="ExamCertification" to="ExamCertification") 成绩记录
              MenuItem(name="contact" to="Reserved") 联系方式
              MenuItem(name="Milestone" to="Milestone") 里程碑
            Submenu(name="skill")
              template(slot="title")
                Icon(type="md-school")
                | 专业技能
              MenuItem(name="OJ" to="OJ") OJ做题记录
              MenuItem(name="OnlineCourse" to="OnlineCourse") 网络课程
              MenuItem(name="ProfessionalBook" to="ProfessionalBook") 专业书籍
              MenuItem(name="Projects" to="Projects") 项目
            Submenu(name="entertainment")
              template(slot="title")
                Icon(type="md-laptop")
                | 兴趣娱乐
              MenuItem(name="Fiction" to="Fiction") 小说
              MenuItem(name="Game" to="Game") 游戏
              MenuItem(name="Movie" to="Movie") 影视
              MenuItem(name="FootPrint" to="FootPrint") 足迹
        Layout(:style="{padding: '24px 24px 24px'}")
          Content(:style="{padding: '24px', background: '#fff'}" id="waterfallwrapper")
            nuxt
</template>

<script>
  import {BLOG_URL, GITLAB_URL} from '../data/Constant'
  export default {
    methods: {
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
      },
      customerJS: function () {
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '/customer-js.js';
        document.getElementsByTagName('head')[0].appendChild(script)
      }
    },
    mounted () {
      this.init()
      this.customerJS()
    }
  }
</script>

<style scoped>
  .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }

  .layout-logo {
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
  }

  .layout-nav {
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
  }
</style>
<style>
  .demo-spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
  }
</style>


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
      line-height: 2;
      /*font-size: 14px;*/
      text-align: center;
    }
  }
</style>
