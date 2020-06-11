<template>
    <div id="app" class="my-4 mx-4">
        <div class="mx-8 md:mx-32 xl:mx-64 mt-12 md:mt-32 bg-gray-600 text-gray-100 py-2 px-4 text-left flex flex-col sm:flex-row">
            <span class="flex-1 mb-2 sm:mb-0 mx-auto sm:mx-0">B2D4 - IOT Applications</span>
             <input class="w-full sm:w-64 px-2 text-black bg-gray-200 text-gray-900" type="text" v-model="domoticz_base" />
        </div>
        <!-- <Main :domoticz_base="domoticz_base" :add_log="add_log" /> -->

        <div class="mx-8 md:mx-32 xl:mx-64 bg-gray-200 py-8 px-16">
            <component :open_menu="open_menu" :add_log="add_log" :domoticz_base="domoticz_base"  :is="dynamicWindow"></component>
        </div>

        <div id="log" class="mx-8 md:mx-32 xl:mx-64 relative">
            <textarea readonly class="w-full h-48 resize-none border-gray-400 border-b border-l border-r font-mono px-2 py-1" placeholder="Log content will be displayed here">
            </textarea>
            <div class="absolute right-0 top-0">
                <button @click="clear_log" class="btn btn-gray ">clear</button>
                <button @click="open_menu('test')" class="btn btn-blue">test</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import TestWindow from './components/windows/TestWindow.vue';
import StartWindow from './components/windows/StartWindow.vue';
import SettingsWindow from './components/windows/SettingsWindow.vue';
import HidingGameWindow from './components/windows/HidingGameWindow.vue';

var windows: any = {
    'test': TestWindow,

    'settings': SettingsWindow,
    'start': StartWindow,
    'hiding_game': HidingGameWindow,
}

/*
@Component({
  components: {
    Main,
  },
})
export default class App extends Vue {}
*/

export default Vue.extend({
    components: {
        // MainWindow,
    },

    data: (): any => {
        return {
            domoticz_base: 'http://localhost:8080',
            dynamicWindow: StartWindow,
        };
    },

    methods: {

        open_menu(window_name: string): void {

            if (window_name in windows)
            {
                this.dynamicWindow = windows[window_name];
                // this.add_log('Changed window to: ' + window_name);
            }

        },


        add_log(text: string): void {

            // date formatting (partially) from: https://samrubin.co/blog/leading-zeroes-for-javascript-date-formatting
            const d = new Date();
            const dDate = [('0' + (d.getMonth() + 1)).slice(-2), ('0' + d.getDate()).slice(-2), d.getFullYear()].join('-');
            const dTime = [('0' + d.getHours()).slice(-2), ('0' + d.getMinutes()).slice(-2), ('0' + d.getSeconds()).slice(-2)].join(':');
            const dTenthSecond = Math.floor((d.getMilliseconds() / 100));
            const formattedDate = `${dDate} ${dTime}.${dTenthSecond}`;

            const logarea = document.querySelector('#log textarea');

            if (logarea != null) {
                logarea.innerHTML += (logarea.innerHTML === '' ? '' : '\n') + formattedDate + '] ' + text;
                logarea.scrollTop = logarea.scrollHeight;
            }

        },

        clear_log(): void {
            const logarea = document.querySelector('#log textarea');

            if (logarea != null) {
                logarea.innerHTML = '';
            }
        }

    },

});
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    @apply text-gray-900
}


.btn {

    @apply border-b-4 px-3 py-1;

    &.btn-blue {
        @apply border-b-4 border-blue-400 bg-blue-600 text-white;
         // outline: 3px solid #00483b;

        &:hover {
            @apply bg-blue-500 border-blue-300;
        }
    }

    &.btn-indigo {
        @apply border-b-4 border-indigo-400 bg-indigo-600 text-white;
         // outline: 3px solid #00483b;

        &:hover {
            @apply bg-indigo-500 border-indigo-300;
        }
    }

    &.btn-red {
        @apply border-b-4 border-red-400 bg-red-600 text-white;

        &:hover {
            @apply bg-red-500 border-red-300;
        }
    }

    &.btn-gray {
        @apply border-b-4 border-gray-400 bg-gray-600 text-white;

        &:hover {
            @apply bg-gray-500 border-gray-300;
        }
    }

}

.hor-line {
    @apply border-b border-gray-500 my-4 relative;
}
</style>
