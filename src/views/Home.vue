<template>
  <div class="layout">
    <Layout :style="{minHeight: '-webkit-fill-available'}">
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1" @on-select="toMySites">
          <div class="layout-logo"/>
          <div class="layout-nav">
            <MenuItem name="blog">
              <Icon type="logo-wordpress" />
              个人博客
            </MenuItem>
            <MenuItem name="resume">
              <Icon type="md-person" />
              个人主页
            </MenuItem>
            <MenuItem name="gitlab">
              <Icon type="md-git-branch" />
              代码仓库
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Layout>
        <Sider hide-trigger :style="{background: '#fff'}">
          <Menu accordion active-name="1-2" theme="light" width="auto" :open-names="['1']">
            <Submenu name="experience">
              <template slot="title">
                <Icon type="md-person" />
                个人经历
              </template>
              <MenuItem name="introduction" to="Reserved">
                个人简介
              </MenuItem>
              <MenuItem name="StudyTimeline" to="StudyTimeline">
                学习经历
              </MenuItem>
              <MenuItem name="CareerTimeline" to="CareerTimeline">
                工作经历
              </MenuItem>
              <MenuItem name="Honor" to="Honor">
                获奖证书
              </MenuItem>
              <MenuItem name="ExamCertification" to="ExamCertification">
                成绩记录
              </MenuItem>
              <MenuItem name="contact" to="Reserved">
                联系方式
              </MenuItem>
              <MenuItem name="Milestone" to="Milestone">
                里程碑
              </MenuItem>
            </Submenu>
            <Submenu name="skill">
              <template slot="title">
                <Icon type="md-school" />
                专业技能
              </template>
              <MenuItem name="Certification" to="Certification">
                资质证书
              </MenuItem>
              <MenuItem name="OJ" to="OJ">
                OJ做题记录
              </MenuItem>
              <MenuItem name="OnlineCourse" to="OnlineCourse">
                网络课程
              </MenuItem>
              <MenuItem name="ProfessionalBook" to="ProfessionalBook">
                专业书籍
              </MenuItem>
              <MenuItem name="Projects" to="Projects">
                项目
              </MenuItem>
            </Submenu>
            <Submenu name="entertainment">
              <template slot="title">
                <Icon type="md-laptop" />
                兴趣娱乐
              </template>
              <MenuItem name="Fiction" to="Fiction">
                小说
              </MenuItem>
              <MenuItem name="Game" to="Game">
                游戏
              </MenuItem>
              <MenuItem name="Movie" to="Movie">
                影视
              </MenuItem>
              <MenuItem name="FootPrint" to="FootPrint">
                足迹
              </MenuItem>
            </Submenu>
          </Menu>
        </Sider>
        <Layout :style="{padding: '24px 24px 24px'}">
          <Content :style="{padding: '24px', background: '#fff'}" id="waterfallwrapper">
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>


<script>

export default {
  name: 'Home',
};
</script>

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
    margin: 0 20px 0 auto;
  }
</style>
