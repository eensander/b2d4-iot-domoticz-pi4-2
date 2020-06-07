<template>
    <div class="w-full">

        <!-- two inputs -->
        <div class="flex flex-col space-y-4">
            <div class="bg-gray-300 flex">

                <button @click="switch_1('On')" class="flex-initial btn btn-blue">Switch 1 on</button>
                <input id="input_1_On" class="flex-1 w-full px-2" type="text" />

            </div>
            <div class="bg-gray-300 flex">

                <button @click="switch_1('Off')" class="flex-initial btn btn-blue">Switch 1 off</button>
                <input id="input_1_Off" class="flex-1 w-full px-2" type="text" />

            </div>
        </div>

        <!-- horizontal seperator -->
        <div class="hor-line"></div>

        <!-- button grid of any desired size -->
        <div class="flex flex-col space-y-4">

            <div class="flex space-x-4">

                <button @click="wait_5_seconds()" class="flex-1 btn btn-blue">Wait 5 Method</button>
                <button class="flex-1 btn btn-blue">Wait 5 Thread</button>
                <button class="flex-1 btn btn-blue">2 Threads Sync</button>

            </div>

            <div class="flex space-x-4">

                <button class="flex-1 btn btn-blue">2 Threads Async</button>
                <button class="flex-1 btn btn-blue">2 ThreadStart Async</button>

            </div>

            <div class="flex space-x-4">

                <button class="flex-1 btn btn-blue">2 Par Threads</button>
                <button class="flex-1 btn btn-blue">2 Par Threads</button>
                <button class="flex-1 btn btn-blue">5 Par Threads</button>

            </div>

        </div>

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

    methods: {

        switch_1(to_what: string): void {

            this.add_log('Called domoticz-api to switch light to: ' + to_what)
            axios.get(`${this.domoticz_base}/json.htm?type=command&param=switchlight&idx=2&switchcmd=${to_what}`)
                .then(response => {
                    console.log(response.data);
                    const input: HTMLInputElement | null = document.querySelector('#input_1_' + to_what);
                    if (input != null)
                    {
                        input.value = JSON.stringify(response.data); // maybe not use axios, because: https://github.com/axios/axios/issues/907
                    }
                }).catch(error => {
                    alert('Could not fetch data, is your domoticz API url correct?: \n' + error);
                    console.log(error);
                })

        },

        //
        wait_5_seconds(): void {
            setTimeout(() => {
                this.add_log('I waited for 5 seconds');
            }, 5000);
        },

    },

});
</script>

<style lang="scss">


</style>
