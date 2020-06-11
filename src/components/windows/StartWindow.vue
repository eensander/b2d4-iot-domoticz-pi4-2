<template>
    <div class="w-full">

        <h1 class="text-3xl">Verstoppertje</h1>

        <p>[inleiding]</p>
        <p>[instructies]</p>

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
