<template>
    <div class="w-full">

		<h2>Ganshit</h2>

        <svg style="width:1000px;height:1000px;" viewBox="0 0 1000 1000">
            <image xlink:href="/floorplan-1.gif" width="100%"  />

            <a xlink:href="javascript:void();" onclick="alert('g')">
                <circle cx="243" cy="133" r="79" />
            </a>

            <a xlink:href="javascript:void();" onclick="do_shit('g')">
                <polygon color="red" id="test" points="10,10 214,492 267,473 335,483 377,603 327,631 249,658 211,641"
                    class="test-1"  />
            </a>
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

    methods: {


    },

});
</script>

<style lang="scss">


.test-1 {
    fill:lime;
    stroke:purple;
    stroke-width:1;

    opacity: 0.3;
}

</style>
