import * as types from './mutation-types'

const mutations = {
  [types.SET_THEME](state, theme) {
    state.theme = theme
    localStorage.setItem('theme', theme)
  }
}

export default mutations