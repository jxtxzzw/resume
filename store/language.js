export const state = () => ({
  language: 'zh', // default: zh-CN
})

export const mutations = {
  setLanguage(state, newLanguage) {
    state.language = newLanguage
  },
}

export const getters = {
  getLanguage(state) {
    return state.language
  },
}
