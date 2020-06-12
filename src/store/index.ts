import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


export const default_state = {
    settings: {
        minutes: 0,
        seconds: 10,
        percentage: 60,
        guesses: 3
    },
    move_history: [],
    game_won: undefined,
}

export default new Vuex.Store({
    state: default_state,
    mutations: {
        reset_state(state) {
            Object.assign(state, default_state);
        },

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
        },

        set_move_history(state, move_history) {
            state.move_history = move_history;
        },
        set_game_won(state, game_won) {
            state.game_won = game_won;
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
        guesses: state => state.settings.guesses,

        move_history: state => state.move_history,
        game_won: state => state.game_won
    },
});
