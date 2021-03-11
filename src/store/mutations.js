import * as types from './mutation-types'

const mutations = {
  [types.SET_THEME](state, theme) {
    state.theme = theme
    localStorage.setItem('theme', theme)
  },
  [types.SET_LAYOUT] (state, layout) {
    state.layout = layout
    localStorage.setItem('layout', layout)
  }
}

export default mutations
