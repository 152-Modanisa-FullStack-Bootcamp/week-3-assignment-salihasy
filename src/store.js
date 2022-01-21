import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = {
  count: 0
}

export const getters = {
  getCount: state => state.count
}

export const mutations = {
  addToCount(state, nCount) {
    state.count += nCount
  },
}

export const actions = {
  increment(context, payload) {
    context.commit('addToCount', 1)
  },
  decrement(context, payload) {
    context.commit('addToCount', -1)
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {}
})
