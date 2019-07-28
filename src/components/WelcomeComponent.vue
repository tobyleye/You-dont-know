<template>
  <div class="w-page page">
    <div class="welcome-text">
      <h1 class="welcome-text--title">You Don't Know</h1>
      <p class="welcome-text--sub-title">The trivia!</p>
    </div>
    <ul class="welcome-actions">
      <li>
        <button @click="showHowToPlay = true">How to play?</button>
      </li>
      <li>
        <button class="btn--lg" @click="startPlaying">Start Playing</button>
      </li>
    </ul>
    <how-to-play
      @close="showHowToPlay = false"
      :class="{ show: showHowToPlay }"/>
  </div>
</template>

<script>
import HowToPlay from '@/components/sub-components/HowToPlay.vue'

export default {
  name: 'WelcomeComponent',

  components: {
    HowToPlay
  },

  data () {
    return {
      showHowToPlay: false
    }
  },

  methods: {
    startPlaying () {
      this.$store.dispatch('nextStep')
    }
  }
}
</script>

<style lang="scss" scoped>
  .w-page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 16px;
    background: var(--app-background);
    color: #fff;
  }

  .welcome-text {
    &--title {
      color: #fdf498;
      font-size: 3rem;
      text-shadow: 5px 5px 1px rgba(0,0,0,.5);
      line-height: 1.2;
      margin-bottom: 5px;
      letter-spacing: var(--title-spacing);
      text-align: center;
      font-family: var(--primary-font)
    }

    &--sub-title {
      font-weight: 800;
      text-align: right;
    }
  }

  .welcome-actions {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    text-align: center;
    padding: 0 12px 30px;

    li {

      &:first-child {
        margin-bottom: 20px;
      }

      &:first-child button {
        padding: 6px 18px;
        font-size: 12px;
        border-radius: 10rem;
        background: rgba(0,0,0,.3);
        color: #fff;
        letter-spacing: 0.5px;
      }

      &:last-child button {
        background: #fff;
        max-width: 250px;
        box-shadow: 2px 3px 4px rgba(0,0,0,.2);
        color: #572792;
      }
    }

  }
</style>
