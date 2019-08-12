import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

// constants
import { generateURL } from '@/utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentStep: 0,
    questions: [],
    appTransition: 'slideLeft',
    categoryId: null
  },

  // mutating the state
  // mutations are always synchronous
  mutations: {
    SET_STEP (state, payload) {
      state.currentStep = payload
    },
    SET_QUESTIONS (state, payload) {
      state.questions = payload
    },
    SET_CATEGORY (state, payload) {
      state.categoryId = payload
    },
    SET_TRANSITION (state, payload) {
      state.appTransition = payload
    }
  },

  // commits the mutation, it's asynchronous
  actions: {
    nextStep ({ commit, state }) {
      commit('SET_TRANSITION', 'slideLeft')
      const step = state.currentStep + 1
      commit('SET_STEP', step)
    },

    previousStep ({ commit, state }) {
      commit('SET_TRANSITION', 'slideRight')
      const step = state.currentStep - 1
      commit('SET_STEP', step)
    },

    startGame ({ commit }, categoryId) {
      // set categoryId
      commit('SET_CATEGORY', categoryId)
      return this.dispatch('fetchGameResources')
        .then(questions => {
          commit('SET_QUESTIONS', questions)
          this.dispatch('nextStep')
        })
    },
    restartGame ({ commit, dispatch }) {
      return dispatch('fetchGameResources')
        .then(questions => {
          commit('SET_QUESTIONS', questions)
        })
    },
    fetchGameResources ({ state }) {
      const url = generateURL(state.categoryId)
      return new Promise((resolve, reject) => {
        axios.get(url)
          .then(({ data }) => {
            resolve(data.results)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
})
