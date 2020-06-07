<template>
    <div class="w-full">

		<h2>Ganshit</h2>

        <svg style="width:1000px;height:1000px;" viewBox="0 0 1000 1000">
            <image xlink:href="/floorplan-1.gif" width="100%"  />

            <polygon
                v-for="room in rooms"
                v-bind:key="room.name"
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
                    name: 'WJ.C.',
                    points: '100,100 308,100 308,159 295,159 294,208 100,208',
                },
                {
                    name: 'MASTER SUITE',
                    points: '52,214 296,214 296,401 52,401',
                },
                {
                    name: 'MASTER BATH',
                    points: '313,101 406,101 406,167 432,167 432,312 301,312 301,166 314,166',
                },
                {
                    name: 'STOR. CLOSET',
                    points: '412,102 532,102 532,206 439,206 439,159 412,159',
                },
                {
                    name: 'MUD RM',
                    points: '441,216 535,216 535,310 440,310',
                },
                {
                    name: '3-CAR GARAGE',
                    points: '541,101 825,101 825,329 802,329 802,461 541,461',
                },
                {
                    name: '',
                    points: '',
                },
                {
                    name: '',
                    points: '',
                },
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
