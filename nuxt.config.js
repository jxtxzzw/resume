export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'universal',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Global CSS
   */
  css: ['view-design/dist/styles/iview.css'],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    '@/plugins/view-design',
    '@/plugins/antd-ui',
    '@/plugins/fontawesome',
    { src: '@/plugins/g2', ssr: false },
    { src: '@/plugins/l7', ssr: false },
    { src: '@/plugins/codemirror', ssr: false },
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    'nuxt-i18n',
    ['nuxt-matomo', require('./assets/data/matomo.json')],
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},
  /*
   ** i18n configuration
   ** See https://i18n.nuxtjs.org/basic-usage/
   */
  router: {
    base: require('./assets/data/setting.json').deployDir,
  },
  i18n: {
    locales: ['zh', 'en'],
    defaultLocale: 'zh',
    vueI18n: {
      fallbackLocale: 'zh',
      messages: {
        zh: Object.assign({}, require('./assets/lang/zh.json')),
        en: Object.assign({}, require('./assets/lang/en.json')),
      },
    },
  },
}
