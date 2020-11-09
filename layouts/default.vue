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
              {{ $t('navigation.blog') }}
            </MenuItem>
            <MenuItem
              name="resume"
              to="https://resume.jxtxzzw.com"
              target="_blank"
            >
              <Icon type="md-person" />
              {{ $t('navigation.resume') }}
            </MenuItem>
            <MenuItem
              name="gitlab"
              to="https://gitlab.jxtxzzw.com"
              target="_blank"
            >
              <Icon type="md-git-branch" />
              {{ $t('navigation.gitlab') }}
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
                {{ $t('navigation.experience') }}
              </template>
            </Submenu>
            <Submenu name="skill">
              <template slot="title">
                <Icon type="md-school" />
                {{ $t('navigation.skill') }}
              </template>
              <MenuItem name="certificate" to="certificate">
                {{ $t('navigation.certificate') }}
              </MenuItem>
            </Submenu>
            <Submenu name="entertainment">
              <template slot="title">
                <Icon type="md-laptop" />
                {{ $t('navigation.entertainment') }}
              </template>
              <MenuItem name="game" to="game">
                {{ $t('navigation.game') }}
              </MenuItem>
              <MenuItem name="fiction" to="fiction">
                {{ $t('navigation.fiction') }}
              </MenuItem>
            </Submenu>
          </Menu>
        </Sider>
        <Layout :style="{ padding: '24px 24px 24px' }">
          <Content
            id="waterfallwrapper"
            :style="{ padding: '24px', background: '#fff' }"
          >
            <Nuxt />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import { setting } from 'assets/reader'

export default {
  name: 'Home',
  data() {
    return {
      setting,
    }
  },
  mounted() {
    this.showWelcome()
  },
  methods: {
    showWelcome() {
      this.$Notice.success({
        name: 'welcome-' + new Date(),
        title: `${this.$t('updated')} ${this.setting.updated}`,
        desc: `${this.$t('permalink')}`,
      })
    },
    changeLanguage(lang) {
      this.$i18n.locale = lang
      this.showWelcome()
    },
  },
}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
