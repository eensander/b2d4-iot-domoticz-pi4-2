<template>
    <div class="w-full">

        <h1 class="main">Zoeker</h1>

        <p class="mb-2">Klik op de kamer waar jij denkt dat de verstopper zit.</p>
        <p><span class="bg-white px-2">Wit</span> = de verstopper is niet in deze kamer geweest</p>
        <p><span class="px-2" style="background-color: #7bcef7;">Blauw</span> = de verstopper is wel in deze kamer geweest</p>
        <p><span class="px-2" style="background-color: #ee7ef2;">Paars</span> = de verstopper zat in deze kamer verstopt</p>

		<span class="mt-4 block">Je hebt nog {{ amount_guesses }} pogingen</span>

        <div class="flex flex-col lg:flex-row mt-8">

            <table class="move-history mr-4 flex-1 my-auto">
                <tr>
                    <th class="w-2/12">#</th>
                    <th class="w-4/12">Time</th>
                    <th class="w-6/12">Room</th>
                </tr>
                <tr v-for="(move, i) in move_history.slice(0, history_shown_amount)"
                    v-bind:key="move.time.valueOf()"
                    v-bind:class="{ 'room-hover': (hovering_room == move.room.name && amount_guesses > 0) }"
                    @mouseover="hovering_room = move.room.name"
                    @mouseleave="hovering_room = null">
                    <td>{{ i+1 }}</td>
                    <td>{{ move_time_formatted(move.time) }}</td>
                    <td>{{ move.room.name }}</td>
                </tr>
                <tr v-for="(move, i) in move_history.slice(history_shown_amount, move_history.length)">
                    <td>{{ i+history_shown_amount+1 }}</td>
                    <td class="blurred-text">00:00</td>
                    <td class="blurred-text">000000000</td>
                </tr>
            </table>

    		<svg class="floorplan-svg flex-auto" style="width:750px; height: auto;" viewBox="0 0 1000 1000">
                <image xlink:href="/floorplan-1.gif" width="100%"  />

                <polygon
                    v-for="room in rooms"
                    :key="room.name"
                    @click="room_click(room)"
                    @mouseover="hovering_room = room.name" @mouseleave="hovering_room = null"
                    :points=room.points
                    class="room-item"
                    v-bind:class="room_classes(room)" />
            </svg>

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

import { floorplan_1 as floorplan } from '@/objects/floorplan_1';

export default Vue.extend({

    props: {
        add_log: Function,
        open_menu: Function,
    },

    components: {
    },

    data: function(): {
        move_history: { room: Room, time: Dayjs }[],
        amount_guesses: number,
        room_guesses: string[],

        first_history: { room: Room, time: Dayjs },
        last_history: { room: Room, time: Dayjs },

        hovering_room: string | null,

        rooms: Room[],
        floor_img_url: string,
    } {
        return {

            amount_guesses: this.$store.state.settings.guesses,

            room_guesses: [],

            move_history: this.$store.state.move_history,

            first_history: this.$store.state.move_history[0],
            last_history: this.$store.state.move_history[this.$store.state.move_history.length-1],

            hovering_room: null,

            rooms: floorplan.rooms,
            floor_img_url: floorplan.image_url,

        }
    },

    methods: {

        game_end: function(won: boolean)
        {
            this.$store.commit('set_game_won', won);
            this.open_menu('end');
        },

        room_click: function(room: Room) {

            if (!this.is_room_tried(room))
            {
                this.amount_guesses--;

                if (this.amount_guesses > 0)
                {
                    this.room_guesses.push(room.name);

                    if (this.is_room_correct(room))
                    {
                        this.game_end(true);
                    }

                }
                else
                {
                    this.$toast.info('Je pogingen zijn op');
                    this.game_end(this.is_room_correct(room));
                }
            }

        },

        is_room_tried: function(room: Room): boolean {
            return this.room_guesses.includes(room.name);
        },

        // is is correct, then
        is_room_visited: function(room: Room): boolean {

            for (let history_item of this.move_history)
            {
                if (history_item.room.name == room.name)
                {
                    return true;
                }
            }

            return false;

        },

        is_room_correct: function(room: Room): boolean {

            return (room.name == this.last_history.room.name);

        },

        room_classes: function(room: Room): string[] {
            // 'room-tried': is_room_tried(room), 'room-visited': (is_room_tried(room) && is_room_visited(room)), 'room-correct': (is_room_tried(room) && is_room_correct(room))

            let classes: string[] = [];

            if (this.is_room_tried(room))
            {

                if (this.is_room_correct(room))
                {
                    classes = ['room-tried', 'room-correct'];
                }
                else if (this.is_room_visited(room))
                {
                    classes = ['room-tried', 'room-visited'];
                }
                else
                {
                    classes = ['room-tried'];
                }
            }

            if (this.hovering_room == room.name && this.amount_guesses > 0)
            {
                classes.push('room-hover');
            }

            // alert(this.room_guesses)
            return classes;
        },

        move_time_formatted: function(time: Date): string {
            // @ts-ignore
            return dayjs(time).subtract(this.first_history.time).format('mm:ss');
        }

    },

    computed: {

        history_shown_amount: function() {
            return Math.ceil((this.$store.state.settings.percentage / 100) * this.$store.state.move_history.length);
        }

    },

});
</script>

<style lang="scss" scoped>

.floorplan-svg {
    .room-item {
        fill: #373737;
        stroke: blue;
        stroke-width: 2;

        opacity: 0.2;

        &.room-tried {
            fill: white;
        }

        &.room-hover {
            // fill: black;
            opacity: 0.5;
            cursor: pointer;
        }

        &.room-correct {
            fill: #df00e6;
            opacity: 0.5;
        }

        &.room-visited {
            fill: #009ae6;
        }
    }
}

table.move-history {
    @apply table-fixed w-64;

    tr {

        &.room-hover {
            @apply bg-blue-200;
        }

        th {
            @apply border-gray-400 border px-4 py-1 bg-gray-300;
        }

        td {
            @apply border px-4 py-1;
        }

    }
}

.blurred-text {
    user-select: none;
    color: transparent;
    text-shadow: 0 0 6px rgba(0,0,0,0.5);
}

</style>
