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
<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1" @on-select="changeMenu">
          <div class="layout-logo"></div>
          <div class="layout-nav">
            <MenuItem name="blog">
              <Icon type="ios-navigate"></Icon>
              个人博客
            </MenuItem>
            <MenuItem name="resume">
              <Icon type="ios-keypad"></Icon>
              个人主页
            </MenuItem>
            <MenuItem name="gitlab">
              <Icon type="ios-analytics"></Icon>
              代码仓库
            </MenuItem>
            <!--<MenuItem name="4">-->
              <!--<Icon type="ios-paper"></Icon>-->
              <!--Item 4-->
            <!--</MenuItem>-->
          </div>
        </Menu>
      </Header>
      <Layout>
        <Sider hide-trigger :style="{background: '#fff'}">
          <Menu accordion active-name="1-2" theme="light" width="auto" :open-names="['1']" @on-select="changeMenu">
            <Submenu name="1">
              <template slot="title">
                <Icon type="ios-navigate"></Icon>
                个人经历
              </template>
              <MenuItem name="introduction">个人简介</MenuItem>
              <MenuItem name="study">学习经历</MenuItem>
              <MenuItem name="work">工作经历</MenuItem>
              <MenuItem name="honor">获奖情况</MenuItem>
              <MenuItem name="contact">联系方式</MenuItem>
            </Submenu>
            <Submenu name="2">
              <template slot="title">
                <Icon type="ios-keypad"></Icon>
                专业技能
              </template>
              <MenuItem name="oj">OJ做题记录</MenuItem>
              <MenuItem name="project">参与的项目</MenuItem>
              <MenuItem name="mooc">学习的MOOC</MenuItem>
              <MenuItem name="readPaper">读过的论文</MenuItem>
              <MenuItem name="readBook">读过的书籍</MenuItem>
              <MenuItem name="publishedPaper">发表的论文</MenuItem>
              <MenuItem name="publishedBook">出版的书籍</MenuItem>
            </Submenu>
            <Submenu name="3">
              <template slot="title">
                <Icon type="ios-analytics"></Icon>
                兴趣娱乐
              </template>
              <MenuItem name="fiction">小说</MenuItem>
              <MenuItem name="game">游戏</MenuItem>
              <MenuItem name="video">影视</MenuItem>
            </Submenu>
          </Menu>
        </Sider>
        <Layout :style="{padding: '24px 24px 24px'}">
          <Content :style="{padding: '24px', minHeight: '680px', background: '#fff'}">
            <!--<OJ/>-->
            <!--<Movie/>-->
            <!--<Projects/>-->
            <StudyTimeline/>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
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
    }
  },
  mounted () {
    // this.changeMenu()
  }
}
</script>
