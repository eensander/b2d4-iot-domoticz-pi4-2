<template>
    <div class="w-full">

		<span style="text-xl font-bold">{{ current_room != null ? (current_room.name + '  - can go to - ' + current_room.adjacent_rooms) : 'geen kamer gekozen'  }}</span>

        <svg style="width:1000px; height:1000px;" viewBox="0 0 1000 1000">
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

import axios from 'axios';

type Room = {
    name: string,
    points: string
}


export default Vue.extend({

    props: {
        domoticz_base: String,
        add_log: Function,
    },

    data: function(): any {
        return {
            current_room: null,

            rooms: [
                {
                    name: 'WJ.C.',
                    points: '100,100 308,100 308,159 295,159 294,208 100,208',
                    adjacent_rooms: [
                        'MASTER SUITE',
                        'MASTER BATH'
                    ],
                },
                {
                    name: 'MASTER SUITE',
                    points: '52,214 296,214 296,401 52,401',
                    adjacent_rooms: [
                        'WJ.C.',
                        'MASTER BATH',
                    ],
                },
                {
                    name: 'MASTER BATH',
                    points: '313,101 406,101 406,167 432,167 432,312 301,312 301,166 314,166',
                    adjacent_rooms: [
                        'STOR. CLOSET',
                        'MUD RM',
                        'WJ.C.',
                        'MASTER SUITE'
                    ],
                },
                {
                    name: 'STOR. CLOSET',
                    points: '412,102 532,102 532,206 439,206 439,159 412,159',
                    adjacent_rooms: [
                        'MUD RM',
                        'MASTER BATH',
                        '3-CAR GARAGE'
                    ],
                },
                {
                    name: 'MUD RM',
                    points: '441,216 535,216 535,310 440,310',
                    adjacent_rooms: [
                        'STOR. CLOSET',
                        'MASTER BATH',
                        '3-CAR GARAGE',
                    ],
                },
                {
                    name: '3-CAR GARAGE',
                    points: '541,101 825,101 825,329 802,329 802,461 541,461',
                    adjacent_rooms: [
                        'MUD RM',
                        'STOR. CLOSET'
                    ],
                },
            ],

        }
    },

    methods: {

        room_click: function(room: any) {

            if (this.current_room == room) {
                return;
            }
            else if (this.current_room == null || this.is_move_possible(room))
            {
                this.current_room = room;
                // alert('you clicked ' + room.name);
            }
            else
            {
                alert('you cant move to this room from your current room');

            }


        },

        is_active: function(room: any): boolean {
            return this.current_room != null && this.current_room == room;
        },

        is_move_possible: function(room: any): boolean {
            return this.current_room != null && this.current_room.adjacent_rooms.includes(room.name);
        }

    },

});
</script>

<style lang="scss">


.room-item {
    fill: lime;
    stroke: purple;
    stroke-width: 1;

    opacity: 0.3;

    cursor: pointer;

    &.room-active {
        fill: orange;
    }

    &.room-possible {
        fill: red;
    }

}

</style>
