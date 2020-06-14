<template>
    <div>

        <h1 class="main">Instellingen</h1>

        <div class="w-full lg:w-2/3 xl:w-1/2 mx-auto text-left">
            <div class="SettingsRow">
                <span class="Setting">Verstoptijd: </span>
                <input class="SettingsInput small" v-model="minutes" type="number" min="0">
                <span style="margin-right: 10px">min</span>
                <input class="SettingsInput small" v-model="seconds" type="number" min="0">
                <span style="margin-right: 10px">sec</span>
            </div>

            <div class="SettingsRow">
                <span class="Setting">Zichtbaarheid van het pad: </span>
                <input class="SettingsInput small" v-model="percentage" type="number" min="0" step="5">
                <span>%</span>
            </div>

            <div class="SettingsRow">
                <span class="Setting">Aantal gokken zoeker: </span>
                <input class="SettingsInput small" v-model="guesses" type="number" min="0">
            </div>

            <div class="border-b border-gray-400 w-full mx-auto mb-4"></div>

            <div class="SettingsRow">
                <span class="Setting">Domoticz gebruiken: </span>
                <label>
                    <input name="domoticz_enabled" v-model="domoticz_enabled" type="radio" value="true"> Ja</label>
                <label class="ml-4">
                    <input name="domoticz_enabled" v-model="domoticz_enabled" type="radio" value="false"> Nee</label>
            </div>

            <div class="SettingsRow">
                <span class="Setting">Domoticz basisurl: </span>
                <input title="" class="SettingsInput" style="max-width: 32rem" type="text" v-model="domoticz_base"  />
            </div>


            <div class="mt-6 text-center w-full">
                <button class="btn btn-blue w-32" @click="start_game();">Start</button>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import store from '@/store';

import axios from 'axios';

export default Vue.extend({

    props: {
        add_log: Function,
        open_menu: Function,
    },

    data: function(): {} {
        return {
        };
    },

    computed: {

        domoticz_enabled: {
            get(): boolean {
                return this.$store.state.settings.domoticz_enabled;
            },
            set(value: string): void {
                this.$store.commit('change_domoticz_enabled', value == 'true' ? true : false);
            },
        },
        domoticz_base: {
            get(): string {
                return this.$store.state.settings.domoticz_base;
            },
            set(value: string): void {
                this.$store.commit('change_domoticz_base', value);
            },
        },

        minutes: {
            get(): number {
                return this.$store.state.settings.minutes;
            },
            set(value: number): void {
                this.$store.commit('change_minutes', value);
            },
        },
        seconds: {
            get(): number  {
                return this.$store.state.settings.seconds;
            },
            set(value: number): void {
                this.$store.commit('change_seconds', value);
            },
        },
        percentage: {
            get(): number  {
                return this.$store.state.settings.percentage;
            },
            set(value: number): void {
                this.$store.commit('change_percentage', value);
            },
        },
        guesses: {
            get(): number  {
                return this.$store.state.settings.guesses;
            },
            set(value: number): void {
                this.$store.commit('change_guesses', value);
            },
        },

    },

    methods: {

        start_game(): void {

            // this.$emit('open_menu', 'start');

            if (this.domoticz_enabled)
            {
                // preparing all switches by disabling all switches beforehand
                axios.get(`${this.domoticz_base}/json.htm?type=devices&filter=light&used=true&order=LastUpdate`)
                .then(response => {

                    let promise_list = [];

                    for(let sensor_i in response.data.result)
                    {
                        let sensor = response.data.result[sensor_i];
                        // console.log(sensor.Name + ' : ' + sensor.Status + ' : ' + sensor.idx);
                        if (sensor.Status == 'On')
                        {
                            promise_list.push(
                                axios.get(`${this.domoticz_base}/json.htm?type=command&param=switchlight&idx=${sensor.idx}&switchcmd=Off`)
                                .catch(error => {
                                    this.$toast.error(`Kon de sensor ${sensor.Name} niet uitzetten`);
                                })
                            );
                        }
                    }

                    Promise.all(promise_list)
                    .then(response => {
                        this.open_menu('hide_game');
                    })
                    .catch(e => {
                        this.$toast.error('Kon een of meer sensoren niet uitzetten.', {duration: 5000});
                    });

                }).catch(error => {
                    this.$toast.error('Kan geen verbinding maken met Domoticz\'s API. Is de URL correct?', {duration: 5000});
                    console.log(['error: ', error]);
                });

            }
            else
            {
                this.open_menu('hide_game');
            }

        }

    },

});
</script>

<style lang="scss">

.SettingsRow {
    // align-content: center;
    // align-items: center;
    // justify-content: center;

    @apply mb-3;
}

.Setting {
    // padding-right: 10px;
    // min-width: 500px;

    @apply inline-block;
    min-width: 200px;

}

.SettingsInput {
    @apply py-1 px-2 border-gray-400 border;

    &.small {
        max-width: 80px;
    }
    margin-right: 10px;

}


</style>
