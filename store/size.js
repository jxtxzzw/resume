export const state = () => ({
  height: 0,
  width: 0,
})

export const mutations = {
  setHeight(state, newHeight) {
    state.height = newHeight
  },
  setWidth(state, newWidth) {
    state.width = newWidth
  },
}

export const getters = {
  getHeight(state) {
    return state.height
  },
  getWidth(state) {
    return state.width
  },
}
