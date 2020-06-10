<template>
<div>
    <div class="SettingsRow"> 
        <a class="Setting"> Verstoptijd: </a>
        <input class="SettingsInput" v-model="minutes" type="number" min="0">
        <a style="margin-right: 10px">m</a>
        <input class="SettingsInput" v-model="seconds" type="number" min="0">
        <a style="margin-right: 10px">s</a>
    </div>

    <div class="SettingsRow"> 
        <a class="Setting"> Zichtbaarheid van het pad: </a>
        <input class="SettingsInput" v-model="percentage" type="number" min="0" step="5">
        <a>%</a>
    </div>

    <div class="SettingsRow"> 
        <a class="Setting"> Aantal gokken zoeker: </a>
        <input class="SettingsInput" v-model="guesses" type="number" min="0">
    </div>
    <div style="margin-bottom: 0px; margin-top: 10px">
        <button class="btn btn-blue">Save</button>
    </div>


</div>

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import store from '@/store';

import axios from 'axios';

export default Vue.extend({
    
    data: function(): 
    any
    {
    return {
        minutes: 5,
        seconds: 0,
        percentage: 60,
        guesses: 1
    };
    },

    computed: {
        minutes: {
        get() {
            return this.$store.state.settings.minutes;
        },
        set(value) {
            this.$store.commit('change_minutes', value);
        },
        },
        seconds: {
        get() {
            return this.$store.state.settings.seconds;
        },
        set(value) {
            this.$store.commit('change_seconds', value);
        },
        },
        percentage: {
        get() {
            return this.$store.state.settings.percentage;
        },
        set(value) {
            this.$store.commit('change_percentage', value);
        },
        },
        guesses: {
        get() {
            return this.$store.state.settings.guesses;
        },
        set(value) {
            this.$store.commit('change_guesses', value);
        },
        },

    },

    methods: {

    },


    // mutations: {

    // }

});
</script>

<style lang="scss">

.SettingsRow {
    // align-content: center;
    // align-items: center;
    // justify-content: center;

}

.Setting {
    padding-right: 10px;
}

.SettingsInput {
    max-width: 35px;
    margin-right: 10px;
}


</style>