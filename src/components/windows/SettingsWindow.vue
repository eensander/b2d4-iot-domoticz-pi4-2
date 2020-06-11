<template>
    <div>

        <h1 class="text-3xl mb-4">Instellingen</h1>

        <div class="w-full lg:w-2/3 xl:w-1/2 mx-auto text-left">
            <div class="SettingsRow">
                <span class="Setting">Verstoptijd: </span>
                <input class="SettingsInput" v-model="minutes" type="number" min="0">
                <span style="margin-right: 10px">min</span>
                <input class="SettingsInput" v-model="seconds" type="number" min="0">
                <span style="margin-right: 10px">sec</span>
            </div>

            <div class="SettingsRow">
                <span class="Setting">Zichtbaarheid van het pad: </span>
                <input class="SettingsInput" v-model="percentage" type="number" min="0" step="5">
                <span>%</span>
            </div>

            <div class="SettingsRow">
                <span class="Setting">Aantal gokken zoeker: </span>
                <input class="SettingsInput" v-model="guesses" type="number" min="0">
            </div>
            <div class="mt-6 text-center w-full">
                <button class="btn btn-blue w-32" @click="open_menu('hiding_game')">Start</button>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import store from '@/store';

import axios from 'axios';

export default Vue.extend({

    props: {
        domoticz_base: String,
        add_log: Function,
        open_menu: Function,
    },

    data: function(): {} {
        return {
        };
    },

    computed: {

        minutes: {
            get(): number {
                return this.$store.state.settings.minutes;
            },
            set(value: number): void {
                this.$store.commit('change_minutes', value);
            },
        },
        seconds: {
            get(): number  {
                return this.$store.state.settings.seconds;
            },
            set(value: number): void {
                this.$store.commit('change_seconds', value);
            },
        },
        percentage: {
            get(): number  {
                return this.$store.state.settings.percentage;
            },
            set(value: number): void {
                this.$store.commit('change_percentage', value);
            },
        },
        guesses: {
            get(): number  {
                return this.$store.state.settings.guesses;
            },
            set(value: number): void {
                this.$store.commit('change_guesses', value);
            },
        },

    },

    methods: {

        start_game(): void {

            // this.$emit('open_menu', 'start');
            this.open_menu('game_hiding');

        }

    },

});
</script>

<style lang="scss">

.SettingsRow {
    // align-content: center;
    // align-items: center;
    // justify-content: center;

    @apply mb-3;
}

.Setting {
    // padding-right: 10px;
    // min-width: 500px;

    @apply inline-block;
    min-width: 200px;

}

.SettingsInput {
    @apply py-1 px-2 border-gray-400 border;

    max-width: 80px;
    margin-right: 10px;

}


</style>
