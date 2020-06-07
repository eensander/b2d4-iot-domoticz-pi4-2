<template>
    <div class="w-full">

		<h2>Ganshit</h2>

        <svg style="width:1000px;height:1000px;" viewBox="0 0 1000 1000">
            <image xlink:href="/floorplan-1.gif" width="100%"  />

            <polygon
                v-for="room in rooms"
                @click="do_shit(room.name)"
                :points=room.points
                class="room-item"  />
        </svg>

    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import axios from 'axios';

export default Vue.extend({

    props: {
        domoticz_base: String,
        add_log: Function,
    },

    data: function(): any {
        return {
            rooms: [
                {
                    name: 'room-1',
                    points: '100,100 308,100 308,159 295,159 294,208 100,208',
                }
            ]
        }
    },

    methods: {

        do_shit: function(room_name) {

            alert('you clicked ' + room_name)

        }

    },

});
</script>

<style lang="scss">


.room-item {
    fill:lime;
    stroke:purple;
    stroke-width:1;

    opacity: 0.3;

    cursor: pointer;
}

</style>
