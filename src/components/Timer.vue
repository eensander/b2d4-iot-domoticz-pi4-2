<template>
  <div class="base-timer">

    <div class="progressbar-outer overflow-hidden h-12 mb-4 text-xs flex rounded bg-indigo-200">
        <span
            class="font-bold mx-auto left-0 right-0 pt-2 absolute text-2xl align-middle"
            :class="{ 'text-white': (timeFraction < 0.5) }">{{ formattedTimeLeft }}</span>
        <div
            :style="{ 'width': ((1-timeFraction)*100) + '%' }"
            class="progressbar-inner bg-indigo-500"></div>
    </div>

  </div>
</template>

<script>

export default {
  data() {
    return {
      timePassed: 0,
      timerInterval: null
    };
  },

  props: {
    time_limit: Number,
    when_done: Function,
  },

  computed: {

    formattedTimeLeft() {
      const timeLeft = this.timeLeft;
      const minutes = Math.floor(timeLeft / 60);
      let seconds = timeLeft % 60;

      if (seconds < 10) {
        seconds = `0${seconds}`;
      }

      return `${minutes}:${seconds}`;
    },

    timeLeft() {
      return this.time_limit - this.timePassed;
    },

    timeFraction() {
      const rawTimeFraction = this.timeLeft / this.time_limit;
      return rawTimeFraction - (1 / this.time_limit) * (1 - rawTimeFraction);
    },

  },

  watch: {
    timeLeft(newValue) {
      if (newValue === 0) {
        this.onTimesUp();
      }
    }
  },

  mounted() {
    this.startTimer();
  },

  methods: {
    onTimesUp() {
      clearInterval(this.timerInterval);
      this.$emit('when_done');
    },

    startTimer() {
      this.timerInterval = setInterval(() => (this.timePassed += 1), 1000);
    }
  }
};
</script>

<style scoped lang="scss">

.progressbar-inner {
    transition: 1s linear width
}

</style>
