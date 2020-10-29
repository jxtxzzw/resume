<template>
  <div class="layout">
    <Layout :style="{ minHeight: '-webkit-fill-available' }">
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div style="float: left">
            <Dropdown
              transfer
              style="margin-right: 20px"
              @on-click="changeLanguage"
            >
              <Button ghost icon="ios-globe" shape="circle">
                中 / En
                <Icon type="ios-arrow-down" />
              </Button>
              <DropdownMenu slot="list">
                <DropdownItem name="zh">简体中文</DropdownItem>
                <DropdownItem name="en">English</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <div class="layout-logo" />
          <div class="layout-nav">
            <MenuItem name="blog" to="https://www.jxtxzzw.com" target="_blank">
              <Icon type="logo-wordpress" />
              {{ $t('blog') }}
            </MenuItem>
            <MenuItem
              name="resume"
              to="https://resume.jxtxzzw.com"
              target="_blank"
            >
              <Icon type="md-person" />
              {{ $t('resume') }}
            </MenuItem>
            <MenuItem
              name="gitlab"
              to="https://gitlab.jxtxzzw.com"
              target="_blank"
            >
              <Icon type="md-git-branch" />
              {{ $t('gitlab') }}
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Layout>
        <Sider hide-trigger>
          <Menu
            accordion
            active-name="1-2"
            theme="dark"
            width="auto"
            :open-names="['1']"
          >
            <Submenu name="experience">
              <template slot="title">
                <Icon type="md-person" />
                {{ $t('experience') }}
              </template>
            </Submenu>
            <Submenu name="skill">
              <template slot="title">
                <Icon type="md-school" />
                {{ $t('skill') }}
              </template>
              <MenuItem name="Certificate" to="Certificate">
                {{ $t('certificate') }}
              </MenuItem>
            </Submenu>
          </Menu>
        </Sider>
        <Layout :style="{ padding: '24px 24px 24px' }">
          <Content
            id="waterfallwrapper"
            :style="{ padding: '24px', background: '#fff' }"
          >
            <router-view />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>

<script>
export default {
  name: 'Home',
  mounted() {
    this.showWelcome()
  },
  methods: {
    showWelcome() {
      this.$Notice.success({
        name: 'welcome',
        title: this.$t('welcome'),
        desc: `${this.$t('updated')} 2020-06-09\n ${this.$t('permalink')}`,
      })
    },
    changeLanguage(lang) {
      this.$i18n.locale = lang
      this.showWelcome()
    },
  },
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
  width: 550px;
  margin: 0 20px 0 auto;
}
</style>
