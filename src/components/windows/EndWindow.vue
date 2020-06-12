<template>
    <div class="w-full">

        <div class="mt-6 text-center w-full mb-8 block ">
            <h1 class="main">{{ done_heading }}</h1>
            <p v-if="game_won">Je hebt de juiste kamer geraden, namelijk: <strong>{{ last_history.room.name }}</strong>!</p>
            <p v-else>Helaas, de verstopper zat in de kamer: <strong>{{ last_history.room.name }}</strong>.</p>
            <button class="mt-6 btn btn-blue w-48" @click="open_menu('start')">Speel opnieuw</button>
        </div>

    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import store from '@/store';
import Room from '@/classes/room';

import axios from 'axios';
import dayjs, { Dayjs } from 'dayjs'

import VueConfetti from 'vue-confetti';

Vue.use(VueConfetti);

export default Vue.extend({

    props: {
        domoticz_base: String,
        add_log: Function,
        open_menu: Function,
    },

    components: {
    },

    data: function(): {
        game_won: boolean | undefined,
        last_history: { room: Room, time: Dayjs },
    } {
        return {
            game_won: this.$store.state.game_won,
            last_history: this.$store.state.move_history[this.$store.state.move_history.length-1],
        }
    },

    computed: {

        done_heading: function(): string {
            return (this.game_won ? 'Gefeliciteerd' : 'Helaas');
        }

    },

    mounted: function(): void {
        if (this.game_won === true)
        {
            this.$toast.open('Gefeliciteerd!');

            this.$confetti.start({
                dropRate: 5,
                particles: [
                    {
                        type: 'rect',
                    }
                ],
                defaultColors: [
                    '#ffc107',
                    '#ff8f00',
                    '#ff5722',
                    '#1e88e5',
                ],
            });
            setTimeout(() => { this.$confetti.stop() }, 4000);

        }
        else
        {
            this.$toast.info('Helaas, volgende keer beter!');
        }
    }

});
</script>

<style lang="scss" scoped>

</style>
