<template>
  <div class="game-board--hud">
    <span>{{currentQuestion}}/{{totalQuestions}}</span>
    <span>{{ retries }} ❤</span>
  </div>
</template>

<script>
export default {
  name: 'GameBoardHud',
  props: {
    totalQuestions: { type: Number, required: true },
    currentQuestion: { type: Number, required: true },
    retries: { type: Number, required: true }
  }
}
</script>

<style lang="scss" scoped>
  .game-board--hud {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 3px solid lightblue;
    background-color: #FFF9C4;
    // TODO: fix - should inherit radius from board
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
  }
</style>
