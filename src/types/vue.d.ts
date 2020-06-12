// file vue.d.ts
import Vue from 'vue';
import VueConfetti from 'vue-confetti';
import VueToast from 'vue-toast-notification';

declare module 'vue/types/vue' {
    interface Vue {
        $confetti: typeof VueConfetti,
        $toast: typeof VueToast
    }
}
