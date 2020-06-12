<template>
    <div class="w-full">

        <h1 class="main">Verstopper</h1>

        <div>
            <Timer :time_limit="timeLimit" @when_done="timer_done()" />
        </div>
		<!-- <span style="">{{ current_room != null ? (current_room.name + '  - can go to - ' + current_room.adjacent_rooms) : 'geen kamer gekozen'  }}</span> -->

        <!-- <table>
            <tr>
                <th>Room</th>
                <th>From</th>
            </tr>
            <tr v-for="move in move_history" v-bind:key="move.time.valueOf()">
                <td>{{ move.room.name }}</td>
                <td>{{ move.time.format('HH:mm:ss') }}</td>
            </tr>
        </table> -->

        <svg class="floorplan-svg mx-auto" style="max-width:1000px; height: auto;" viewBox="0 0 1000 1000">
            <image xlink:href="/floorplan-1.gif" width="100%"  />

            <polygon
                v-for="room in rooms"
                v-bind:key="room.name"
                @click="room_click(room)"
                :points=room.points
                class="room-item"
                v-bind:class="{ 'room-active': is_active(room), 'room-possible': is_move_possible(room) }" />
        </svg>
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
        open_menu: Function,
    },

    components: {
        Timer
    },

    data: function(): {
        move_history: { room: Room, time: Dayjs }[],
        current_room: Room | null,
        rooms: Room[],
        timeLimit: number,
    } {
        return {

            timeLimit: parseInt((this.$store.state.settings.minutes) * 60 + this.$store.state.settings.seconds, 10),

            move_history: [],

            current_room: null,

            rooms: [
                new Room({
                    name: 'WJ.C.',
                    points: '100,100 308,100 308,159 295,159 294,208 100,208',
                    adjacent_rooms: [
                        'MASTER BATH',
                    ],
                }),
                new Room({
                    name: 'MASTER SUITE',
                    points: '52,214 296,214 296,401 52,401',
                    adjacent_rooms: [
                        'MASTER BATH',
                        'BREAKFAST',
                        'COVERED PORCH',
                    ],
                }),
                new Room({
                    name: 'MASTER BATH',
                    points: '313,101 406,101 406,167 432,167 432,312 301,312 301,166 314,166',
                    adjacent_rooms: [
                        'WJ.C.',
                        'MASTER SUITE',
                    ],
                }),
                new Room({
                    name: 'LNDRY',
                    points: '412,102 532,102 532,206 439,206 439,159 412,159',
                    adjacent_rooms: [
                        'MUD RM',
                    ],
                }),
                new Room({
                    name: 'MUD RM',
                    points: '441,216 535,216 535,310 440,310',
                    adjacent_rooms: [
                        'LNDRY',
                        'KITCHEN',
                        '3-CAR GARAGE',
                    ],
                }),
                new Room({
                    name: '3-CAR GARAGE',
                    points: '541,101 825,101 825,329 802,329 802,461 541,461',
                    adjacent_rooms: [
                        'MUD RM',
                    ],
                }),
                new Room({
                    name: 'COVERED PORCH',
                    points: '90,414 175,414 175,549 285,549 285,719 90,719',
                    adjacent_rooms: [
                        'MASTER SUITE',
                        'FAMILY ROOM',
                        'BEDROOM 2',
                        'BEDROOM 3',
                    ]
                }),
                new Room({
                    name: 'BREAKFAST',
                    points: '183,407 340,407 340,540 183,540',
                    adjacent_rooms: [
                        'MASTER SUITE',
                        'KITCHEN',
                        'FAMILY ROOM',
                    ]
                }),
                new Room({
                    name: 'KITCHEN',
                    points: '359,315 535,315 535,462 547,462 547,520 359,520 ',
                    adjacent_rooms: [
                        'MUD RM',
                        'BREAKFAST',
                        'FAMILY ROOM',
                        'DINING',
                    ]
                }),
                new Room({
                    name: 'FAMILY ROOM',
                    points: '306,546 614,546 614,622 547,622 547,708 306,708',
                    adjacent_rooms: [
                        'KITCHEN',
                        'BREAKFAST',
                        'BEDROOM 2',
                        'BEDROOM 3',
                        'COVERED PORCH',
                        'BEDROOM 4',
                        'GREETING HALL',
                    ]
                }),
                new Room({
                    name: 'DINING',
                    points: '623,468 778,468 778,544 803,544 803,616 625,616',
                    adjacent_rooms: [
                        'KITCHEN',
                        'GREETING HALL',
                    ]
                }),
                new Room({
                    name: 'GREETING HALL',
                    points: '556,630 870,630 870,710 556,710',
                    adjacent_rooms: [
                        'DINING',
                        'FAMILY ROOM',
                        'LIBRARY/BEDROOM 5',
                        'LIVING ROOM',
                        'ENTRY PORCH'
                    ]
                }),
                new Room({
                    name: 'ENTRY PORCH',
                    points: '814,546 950,546 950,792 874,792 874,615 814,615',
                    adjacent_rooms: [
                        'GREETING HALL',
                    ]
                }),
                new Room({
                    name: 'LIVING ROOM',
                    points: '720,720 865,720 865,875 720,875',
                    adjacent_rooms: [
                        'GREETING HALL',
                    ]
                }),
                new Room({
                    name: 'LIBRARY/BEDROOM 5',
                    points: '582,720 715,720 715,878 582,878',
                    adjacent_rooms: [
                        'GREETING HALL',
                    ]
                }),
                new Room({
                    name: 'BEDROOM 4',
                    points: '407,804 547,804 547,851 575,851 575,938 407,938',
                    adjacent_rooms: [
                        'FAMILY ROOM',
                    ]
                }),
                new Room({
                    name: 'BEDROOM 3',
                    points: '255,789 298,789 298,798 400,798 400,938 255,938',
                    adjacent_rooms: [
                        'COVERED PORCH',
                        'FAMILY ROOM',
                        'BEDROOM 2',
                    ]
                }),
                new Room({
                    name: 'BEDROOM 2',
                    points: '55,789 244,789 244,936 55,936',
                    adjacent_rooms: [
                        'COVERED PORCH',
                        'BEDROOM 3',
                        'FAMILY ROOM',
                    ]
                }),
            ],

        }
    },

    methods: {

        room_click: function(room: Room) {

            if (this.current_room == room) {
                return;
            }
            else if (this.current_room == null || this.is_move_possible(room))
            {
                this.current_room = room;
                this.move_history.push({
                    room: room,
                    time: dayjs()
                });

                this.add_log('You went to room ' + room.name);
            }
            else
            {
                this.add_log('You cant move to this room from your current room');
                this.$toast.open({
                    message: 'Je kan nu niet naar deze kamer',
                    type: 'info',
                    duration: 2000,
                });
            }
        },

        is_active: function(room: Room): boolean {
            return this.current_room != null && this.current_room.name == room.name;
        },

        is_move_possible: function(room: Room): boolean {
            return this.current_room != null && this.current_room.can_go_to(room);
        },

        timer_done: function(): void {

            this.$store.commit('set_move_history', this.move_history);
            this.open_menu('search_game');

        }

    },


    mounted: function() {

        let first_room = this.rooms.find(room => room.name == 'GREETING HALL');
        if (first_room != undefined)
            this.current_room = first_room;

    }

});
</script>

<style lang="scss" scoped>

.floorplan-svg {
    .room-item {
        fill: black;
        stroke: blue;
        stroke-width: 2;

        opacity: 0.3;

        cursor: pointer;

        &.room-active {
            fill: #df00e6;
        }

        &.room-possible {
            fill: #009ae6;
        }

    }
}

</style>