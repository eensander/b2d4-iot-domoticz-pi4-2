import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    settings: { 
      minutes: '',
      seconds: '',
      percentage: '',
      guesses: ''
    }
  },
  mutations: {
    change_minutes(state, minutes) {
      state.settings.minutes = minutes
    },
    change_seconds(state, seconds) {
        state.settings.seconds = seconds
    },
    change_percentage(state, percentage) {
        state.settings.percentage = percentage
    },
    change_guesses(state, guesses) {
        state.settings.guesses = guesses
  }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    minutes: state => state.settings.minutes,
    seconds: state => state.settings.seconds,
    percentage: state => state.settings.percentage,
    guesses: state => state.settings.guesses
  },
});
