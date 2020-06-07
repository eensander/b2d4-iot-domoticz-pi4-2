<template>
    <div class="mx-64 bg-gray-200 py-8 px-16">

		<h2>Ganshit</h2>

        <svg viewBox="0 0 1000 1000">
            <image xlink:href="/floorplan-1.gif" width="100%"  />
            <a xlink:href="javascript:void();" onclick="alert('g')"><circle cx="243" cy="133" r="79" /></a>
            <a xlink:href="https://stackoverflow.com"><rect x="870" y="147" width="680" height="33" /></a>
            <a xlink:href="https://stackoverflow.com"><circle cx="889" cy="379" r="80" /></a>
            <a xlink:href="https://stackoverflow.com"><polygon id="test" points="163,587 214,492 267,473 335,483 377,603 327,631 249,658 211,641" /></a>
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


</style>
