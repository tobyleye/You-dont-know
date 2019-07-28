<template>
  <div class="game-board--timer">
    <div>{{ timeLeft }}</div>
      <!-- hard coded 😈 -->
      <svg>
        <circle r="28" cx="30" cy="30"></circle>
        <circle r="28" cx="30" cy="30"
          :stroke="[timeLeft <= 15 ? '#ff8b94' : 'lightblue' ]"
          :stroke-dashoffset="dashOffset">
        </circle>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'GameBoardTimer',
  props: {
    timeLeft: { type: Number, required: true }
  },
  computed: {
    dashOffset () {
      return `${(176 / 60) * (60 - this.timeLeft)}px`
    }
  }
}
</script>

<style lang="scss" scoped>

  $length: 60px;

  .game-board--timer {
    margin: 2rem auto;
    width: $length;
    height: $length;
    position: relative;
    text-align: center;

    > div {
      color: black;
      display: inline-block;
      line-height: $length;
      font-size: 22px;
      color: #222;
      font-weight: 700;
    }
  }

  svg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;

    circle {
      stroke-width: 3px;
      fill: none;

      &:first-child {
        stroke: #f0f0f0;
      }

      &:last-child {
        stroke-linecap: round;
        stroke-dasharray: 176px;
        transition: .25s ease;
      }
    }
  }

</style>
