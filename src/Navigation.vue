<template>
  <div class="layout">
    <Layout :style="{minHeight: '-webkit-fill-available'}">
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo"/>
          <div class="layout-nav">
            <MenuItem name="blog">
              <Icon type="logo-wordpress"/>
              {{ $t('message.navigation.blog') }}
            </MenuItem>
            <MenuItem name="resume">
              <Icon type="md-person"/>
              {{ $t('message.navigation.resume') }}
            </MenuItem>
            <MenuItem name="gitlab">
              <Icon type="md-git-branch"/>
              {{ $t('message.navigation.gitlab') }}
            </MenuItem>
          </div>
          <Dropdown @on-click="changeLanguage" style="margin-right: 20px">
            <Button ghost icon="ios-globe" shape="circle">
              中 / En
              <Icon type="ios-arrow-down"/>
            </Button>
            <DropdownMenu slot="list">
              <DropdownItem name="cn">简体中文</DropdownItem>
              <DropdownItem name="en">English</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Menu>
      </Header>
      <Layout>
        <Sider hide-trigger>
          <Menu accordion active-name="1-2" theme="dark" width="auto"
                :open-names="['1']">
            <Submenu name="experience">
              <template slot="title">
                <Icon type="md-person"/>
                {{ $t('message.navigation.experience') }}
              </template>
              <MenuItem name="introduction" to="Reserved">
                {{ $t('message.navigation.introduction') }}
              </MenuItem>
              <MenuItem name="Study" to="Study">
                {{ $t('message.navigation.study') }}
              </MenuItem>
              <MenuItem name="Career" to="Career">
                {{ $t('message.navigation.career') }}
              </MenuItem>
              <MenuItem name="Honor" to="Honor">
                {{ $t('message.navigation.honor') }}
              </MenuItem>
              <MenuItem name="ExamCertification" to="ExamCertification">
                {{ $t('message.navigation.exam') }}
              </MenuItem>
              <MenuItem name="contact" to="Reserved">
                {{ $t('message.navigation.contact') }}
              </MenuItem>
              <MenuItem name="Milestone" to="Milestone">
                {{ $t('message.navigation.milestone') }}
              </MenuItem>
            </Submenu>
            <Submenu name="skill">
              <template slot="title">
                <Icon type="md-school"/>
                {{ $t('message.navigation.skill') }}
              </template>
              <MenuItem name="Certification" to="Certification">
                {{ $t('message.navigation.certification') }}
              </MenuItem>
              <MenuItem name="OJ" to="OJ">
                {{ $t('message.navigation.oj') }}
              </MenuItem>
              <MenuItem name="OnlineCourse" to="OnlineCourse">
                {{ $t('message.navigation.course') }}
              </MenuItem>
              <MenuItem name="ProfessionalBook" to="ProfessionalBook">
                {{ $t('message.navigation.book') }}
              </MenuItem>
              <MenuItem name="Project" to="Project">
                {{ $t('message.navigation.project') }}
              </MenuItem>
              <MenuItem name="Papers" to="Papers">
                {{ $t('message.navigation.paper') }}
              </MenuItem>
            </Submenu>
            <Submenu name="entertainment">
              <template slot="title">
                <Icon type="md-laptop"/>
                {{ $t('message.navigation.entertainment') }}
              </template>
              <MenuItem name="Fiction" to="Fiction">
                {{ $t('message.navigation.fiction') }}
              </MenuItem>
              <MenuItem name="Game" to="Game">
                {{ $t('message.navigation.game') }}
              </MenuItem>
              <MenuItem name="Movie" to="Movie">
                {{ $t('message.navigation.movie') }}
              </MenuItem>
              <MenuItem name="FootPrint" to="FootPrint">
                {{ $t('message.navigation.footprint') }}
              </MenuItem>
            </Submenu>
          </Menu>
        </Sider>
        <Layout :style="{padding: '24px 24px 24px'}">
          <Content :style="{padding: '24px', background: '#fff'}" id="waterfallwrapper">
            <router-view/>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>


<script>

export default {
  name: 'Home',
  methods: {
    showWelcome() {
      this.$Notice.success({
        name: 'welcome',
        title: this.$t('message.navigation.welcome'),
        desc: `${this.$t('message.navigation.updated')} 2020-06-07`,
      });
    },
    changeLanguage(lang) {
      this.$i18n.locale = lang;
      this.showWelcome();
    },
  },
  mounted() {
    this.showWelcome();
  },
};
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
    width: 550px;
    margin: 0 20px 0 auto;
  }

</style>
