<template>
  <div>
    <Layout>
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
            <MenuItem name="blog" :to="setting.blog" target="_blank">
              <Icon type="logo-wordpress" />
              {{ $t('navigation.blog') }}
            </MenuItem>
            <MenuItem name="resume" :to="setting.link" target="_blank">
              <Icon type="md-person" />
              {{ $t('navigation.resume') }}
            </MenuItem>
            <MenuItem name="gitlab" :to="setting.gitlab" target="_blank">
              <Icon type="md-git-branch" />
              {{ $t('navigation.gitlab') }}
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Layout>
        <Sider hide-trigger>
          <Navigation />
        </Sider>
        <Layout :style="{ padding: '24px 24px 24px' }">
          <Content
            :style="{
              overflowY: 'auto',
              height: contentHeight + 'px',
              padding: '24px',
              background: '#fff',
            }"
          >
            <!-- 这里 keep-alive 有两层含义：-->
            <!-- 1. 修复：离开足迹后再回到足迹，页面会卡死的问题，利用 keep-alive 解决； -->
            <!-- 2. 顺便优化：利用 keep-alive 优化页面切换 -->
            <Nuxt keep-alive />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import { setting } from 'assets/reader'
import Navigation from '@/components/Navigation'

export default {
  name: 'Home',
  components: { Navigation },
  data() {
    return {
      setting,
      screenHeight: 0,
      screenWidth: 0,
    }
  },
  computed: {
    contentHeight() {
      // 64 head + (24 padding) * 2
      return this.screenHeight - 64 - 24 * 2
    },
  },
  mounted() {
    this.showWelcome()

    this.screenHeight = document.body.clientHeight
    this.screenWidth = document.body.clientWidth
    this.$store.commit('size/setHeight', this.screenHeight)
    this.$store.commit('size/setWidth', this.screenWidth)

    const that = this
    window.onresize = () => {
      window.screenHeight = document.body.clientHeight
      window.screenWidth = document.body.clientWidth
      that.screenHeight = window.screenHeight
      that.screenWidth = window.screenWidth
      that.$store.commit('size/setHeight', that.screenHeight)
      that.$store.commit('size/setWidth', that.screenWidth)
      return (() => {})()
    }
  },
  methods: {
    showWelcome() {
      this.$Notice.success({
        name: 'welcome-' + new Date(),
        title: `${this.$t('updated')} ${this.setting.updated}`,
        desc: `${this.$t('permalink', { link: this.setting.link })}`,
      })
    },
    changeLanguage(lang) {
      this.$i18n.locale = lang
      this.$store.commit('language/setLanguage', lang)
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
  height: 100%;
}

body {
  height: 100%;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
</style>
