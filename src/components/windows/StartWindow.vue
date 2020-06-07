<template>
    <div class="w-full">

		<span style="text-xl font-bold">{{ current_room != null ? current_room.name : 'geen kamer gekozen'  }}</span>

        <svg style="width:1000px; height:1000px;" viewBox="0 0 1000 1000">
            <image xlink:href="/floorplan-1.gif" width="100%"  />

            <polygon
                v-for="room in rooms"
                v-bind:key="room.name"
                @click="room_click(room)"
                :points=room.points
                class="room-item"
                v-bind:class="{ 'room-active': is_active(room) }" />
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
                    name: 'room-1',
                    points: '100,100 308,100 308,159 295,159 294,208 100,208',
                }
            ]
        }
    },

    methods: {

        room_click: function(room: any) {

            this.current_room = room;
            alert('you clicked ' + room.name);

        },

        is_active: function(room: any): boolean {
            return room == this.current_room;
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
