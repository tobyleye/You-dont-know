<template>
  <div id="app">
    <transition :name="appTransition">
      <is-component :is="currentComponent"></is-component>
    </transition>
  </div>
</template>

<script>
import WelcomeComponent from '@/components/WelcomeComponent.vue'
import SelectCategoryComponent from '@/components/SelectCategoryComponent.vue'
import GameComponent from '@/components/GameComponent.vue'

export default {
  name: 'app',

  components: {
    WelcomeComponent,
    SelectCategoryComponent,
    GameComponent
  },

  computed: {
    currentComponent () {
      const components = ['welcome-component', 'select-category-component', 'game-component']
      return components[this.$store.getters.currentStep]
    },

    appTransition () {
      return this.$store.getters.appTransition
    }
  }
}
</script>

<style lang="scss">
@import url(https://fonts.googleapis.com/css?family=Lato:400,700&display=swap);
@import url(https://fonts.googleapis.com/css?family=Bangers&display=swap);

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
   /* disable blue highlight on screen touch/press */
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  -webkit-tap-highlight-color: transparent;
}

:root {
  --primary-font: 'Bangers', cursive;
  --secondary-font: 'Lato', Helvetica, Arial, sans-serif;
  --app-background: #572792;
  --title-spacing: 1.2px;
}

#app {
  font-family: var(--secondary-font);
  line-height: 1.2;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
  position: relative;
  width: 100vw;
  min-height: 100vh
}

ul {
  list-style: none;
}

a {
  text-decoration: none;
  color: inherit;
}

button {
  outline: 0;
  cursor: pointer;
  border: 0;
}

.page {
  min-height: 100vh;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  animation: fadein 1.5s ease;
}

.btn--lg {
  border-radius: 10rem;
  font-size: 16px;
  max-width: 300px;
  font-weight: 600;
  text-transform: uppercase;
  width: 100%;
  padding: 12px 18px;
}

@keyframes fadein {
  from { opacity: 0 }
  to { opacity:  1 }
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: .3s ease;
}

.slideLeft-enter-active,
.slideLeft-leave-active,
.slideRight-leave-active,
.slideRight-enter-active  {
  transition: .4s ease;
}

.slideLeft-enter,
.slideRight-leave-to {
  transform: translate3d(100%, 0, 0);
}

.slideLeft-leave-to,
.slideRight-enter {
  transform: translate3d(-100%, 0, 0);
}
</style>
