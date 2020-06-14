import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


export const default_state = {
    settings: {
        minutes: 0,
        seconds: 30,
        percentage: 60,
        guesses: 3,

        domoticz_enabled: true,
        domoticz_base: 'http://localhost:8080',

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

        change_minutes(state, minutes: number) {
            state.settings.minutes = minutes
        },
        change_seconds(state, seconds: number) {
            state.settings.seconds = seconds
        },
        change_percentage(state, percentage: number) {
            state.settings.percentage = percentage
        },
        change_guesses(state, guesses: number) {
            state.settings.guesses = guesses
        },

        change_domoticz_enabled(state, domoticz_enabled: boolean) {
            state.settings.domoticz_enabled = domoticz_enabled;
        },
        change_domoticz_base(state, domoticz_base: string) {
            state.settings.domoticz_base = domoticz_base
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

        domoticz_enabled: state => state.settings.domoticz_enabled,
        domoticz_base: state => state.settings.domoticz_base,

        move_history: state => state.move_history,
        game_won: state => state.game_won,
    },
});
