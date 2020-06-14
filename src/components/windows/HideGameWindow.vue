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
            <image :xlink:href="floor_img_url" width="100%"  />

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

var W3CWebSocket = require('websocket').w3cwebsocket;

import axios from 'axios';
import dayjs, { Dayjs } from 'dayjs'

import Timer from '@/components/Timer.vue';
import Room from '@/classes/Room';

import { floorplan_1 as floorplan } from '@/objects/floorplan_1';

export default Vue.extend({

    props: {
        add_log: Function,
        open_menu: Function,
    },

    components: {
        Timer
    },

    data: function(): {
        move_history: { room: Room, time: Dayjs }[],
        current_room: Room | null,
        timeLimit: number,

        rooms: Room[],
        floor_img_url: string,

        websocket_client: any,

        domoticz_enabled: boolean,
        domoticz_base: string,

    } {
        return {

            timeLimit: parseInt((this.$store.state.settings.minutes) * 60 + this.$store.state.settings.seconds, 10),
            current_room: null,

            move_history: [],

            rooms: floorplan.rooms,
            floor_img_url: floorplan.image_url,

            websocket_client: null,

            domoticz_enabled: this.$store.state.settings.domoticz_enabled,
            domoticz_base: this.$store.state.settings.domoticz_base,

        }
    },

    methods: {

        listen_for_triggers: function()
        {

            const domoticz_socket_url = this.domoticz_base.replace(/^http?:/i, 'ws:') + '/json';
            console.log('Domoticz websocket url: ' + domoticz_socket_url);

            this.websocket_client = new W3CWebSocket(domoticz_socket_url, 'domoticz');

            this.websocket_client.onerror = () => {
                this.$toast.error('Kan geen verbinding maken met Domoticz\'s socket-server op: ' + domoticz_socket_url + '. Controleer het adres', { duration: 3000 });

                this.domoticz_enabled = false;
                this.$store.commit('change_domoticz_enabled', false);
            };

            this.websocket_client.onopen = () => {
                this.$toast.open('Verbonden met Domoticz\'s websocket-server', { duration: 3000 });
            };

            this.websocket_client.onclose = () => {
                this.$toast.warning('Verbinding met Domoticz\'s websocket-server verbroken', { duration: 3000 });
            };

            this.websocket_client.onmessage = (e: any) => {
                if (typeof e.data === 'string') {
                    // console.log("Received: '" + e.data + "'");
                    let json_response = JSON.parse(e.data);

                    if ('data' in json_response) {
                        let json_response_data = JSON.parse(json_response.data);
                        // console.log(json_response_data);

                        for (let sensor of json_response_data.result) {
                            if (sensor.Status == 'On') {
                                // this.$toast.success(`wow vgm gebeurd er iets in kamer ${sensor.Name}`);

                                let room_or_not: Room | undefined = this.rooms.find(x => x.domoticz_id === parseInt(sensor.idx, 10));

                                if (room_or_not !== undefined) {

                                    let room: Room = room_or_not;

                                    axios.get(`${this.domoticz_base}/json.htm?type=command&param=switchlight&idx=${sensor.idx}&switchcmd=Off`)
                                    .then(response => {
                                        if (response.data.status == 'OK')
                                        {
                                            this.add_log(`Sensor ${sensor.Name} werd extern getriggerd.`);
                                            // this.$toast.info(`Sensor ${sensor.Name} werd extern getriggerd.`);

                                            if (this.current_room == null || this.is_move_possible(room))
                                            {
                                                this.current_room = room;
                                                this.move_history.push({
                                                    room: room,
                                                    time: dayjs()
                                                });
                                            }
                                            else
                                            {
                                                this.$toast.open({
                                                    message: '[EXTERN] Je kan nu niet naar deze kamer' + sensor.Name,
                                                    type: 'info',
                                                    duration: 2000,
                                                });
                                            }
                                        }
                                    })
                                    .catch(error => {
                                        this.$toast.error(`Kon de sensor in kamer ${sensor.Name} niet resetten`);
                                    });

                                } else {
                                    this.$toast.error('Er werd een kamer geactiveerd die niet (correct) is gedefinieerd: ' + sensor.Name);
                                }

                            }
                        }
                    }

                } else {
                    console.log('Received undefined datatype: ' + typeof e.data);
                }
            };
        },

        room_click: function(room: Room) {

            if (this.current_room == room) {
                return;
            }
            else if (this.current_room == null || this.is_move_possible(room))
            {
                if (!this.domoticz_enabled)
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
                    axios.get(`${this.domoticz_base}/json.htm?type=command&param=switchlight&idx=${room.domoticz_id}&switchcmd=On`)
                    .then(response => {
                        if (response.data.status == 'OK')
                        {
                            this.add_log('Sensor in kamer ' + room.name + ' geactiveerd');
                        }
                    })
                    .catch(e => {
                        this.$toast.error('Het activeren van deze sensor werd door Domoticz geweigerd.');
                    });
                }
            }
            else
            {
                this.add_log('De gekozen kamer ligt sluit niet aan op de huidige kamer');
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

            if (this.websocket_client != null)
            {
                this.websocket_client.close();
            }

            this.$store.commit('set_move_history', this.move_history);
            this.open_menu('search_game');

        }

    },


    mounted: function() {

        if (this.domoticz_enabled)
        {

            this.listen_for_triggers();

        }

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
