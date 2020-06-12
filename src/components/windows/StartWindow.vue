<template>
    <div class="w-full">

        <h1 class="main">Verstoppertje</h1>

        <p class="mb-4">Welkom bij het Verstoppertje-spel, ontwikkeld in opdracht van Zuyd Hogeschool voor het vak IoT Applications.</p>
        <div class="border-b border-gray-400 w-full lg:w-2/3 mx-auto mb-4"></div>
        <p class="mb-4">Je speelt dit spel met twee personen. Het doel van het spel is vrij eenvoudig:</p>

        <div class="mx-auto" style="max-width: 24rem;">
            <ol class="list-decimal text-left">
                <li class="mb-2">Kies in het eerste scherm samen de spelinstellingen</li>
                <li class="mb-4">De <strong>verstopper</strong> gaat zich door te klikken op kamers voor de ingestelde tijd voorbij is in een kamer verstoppen.</li>
                <li class="mb-4">De <strong>zoeker</strong> ziet een deel van het door de verstopper afgelegde pad en moet raden in welke kamer de verstopper zich het laatst heeft begeven.</li>
            </ol>
        </div>

        <div class="mt-6 text-center w-full">
            <button class="btn btn-blue w-32" @click="open_menu('settings')">Start</button>
        </div>

    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import store from '@/store';
import Timer from '@/components/Timer.vue';
import Room from '@/classes/room';

import axios from 'axios';
import dayjs, { Dayjs } from 'dayjs'



export default Vue.extend({

    props: {
        domoticz_base: String,
        add_log: Function,
        open_menu: Function
    },

    components: {
    },

    data: function(): any {
        return {}
    },

    methods: {

    },


    mounted: function() {

        // this.current_room = this.rooms.find(room => room.name == 'GREETING HALL')
    }

});
</script>

<style lang="scss">

</style>
