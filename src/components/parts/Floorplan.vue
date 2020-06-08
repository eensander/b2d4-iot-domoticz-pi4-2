<template>
    <div class="w-full">
        <div>
            <Timer :time_limit="timeLimit" @when_done="timer_done()" />
        </div>
		<span style="">{{ current_room != null ? (current_room.name + '  - can go to - ' + current_room.adjacent_rooms) : 'geen kamer gekozen'  }}</span>

        <table>
            <tr>
                <th>Room</th>
                <th>From</th>
            </tr>
            <tr v-for="move in move_history" v-key="move.time">
                <td>{{ move.room.name }}</td>
                <td>{{ move.time.format('HH:mm:ss') }}</td>
            </tr>
        </table>

        <svg style="max-width:1000px; max-height:1000px;" viewBox="0 0 1000 1000">
            <image :xlink:href="{ '/' + image_url }" width="100%"  />

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
import dayjs, { Dayjs } from 'dayjs'

import Timer from '@/components/Timer.vue';

import Room from '@/classes/Room';
import Floorplan from '@/classes/Floorplan';

import { floorplan_1 } from '@/objects/floorplan_1';

export default Vue.extend({

    props: {
        domoticz_base: String,
        add_log: Function,
    },

    data: function(): {

        image_url: string;
        rooms: Array<Room>;

        landing_room_name: string | null = null;

        move_history: { room: Room, time: Dayjs }[];
        current_room: Room | null;

    } {
        return Object.assign(floorplan_1, { move_history: [], current_room: null });
        // return floorplan_1;
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
                // alert('you clicked ' + room.name);
            }
            else
            {
                alert('you cant move to this room from your current room');

            }
        },

        is_active: function(room: Room): boolean {
            return this.current_room != null && this.current_room == room;
        },

        is_move_possible: function(room: Room): boolean {
            return this.current_room != null && this.current_room.can_go_to(room);
        },

    },


    mounted: function(): void {

        let default_room = this.rooms.find(room => room.name == this.landing_room_name);
        if (default_room != undefined)
            this.current_room = default_room;

    }

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
        cursor: initial;
    }

    &.room-possible {
        fill: red;
    }

}

</style>
