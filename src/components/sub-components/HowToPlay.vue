<template>
  <div class="how-to-play" @click.self="$emit('close')">
    <div class="content">
      <span @click="$emit('close')" role="button" class="close">&times;</span>
      <h2>Haq Haq Haq 😅</h2>
      <p>You Don't know is really just another quiz that challenges what you know and don't!</p>
      <p>Click on Start Playing, Select a category and play 🚀. It's not rocket science</p>
      <p class="credit">Built with 💗 & 🍵 by <a href="https://twitter.com/ibenddrules" target="_blank">Toby👽</a></p>
      <!-- Ununuma -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'HowToPlay'
}
</script>

<style lang="scss" scoped>
  .how-to-play {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 10px;
    padding-right: 10px;
    pointer-events: none;
    transition: .5s ease;

    .content {
      background: #fff;
      color: #222;
      position: relative;
      text-align: center;
      border-radius: 4px;
      padding: 0 1rem;
      max-width: 400px;
      width: 100%;
      opacity: 0;
      transform: translate3d(0, 50%, 0);
      transition: .5s cubic-bezier(0.68, -0.55, 0.265, 1.55);

      .close {
        position: absolute;
        top: 10px;
        right: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #fe602e;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        color: #fff;
        font-weight: 800;
        font-size: 14px;
        cursor: pointer;
      }
    }

    h2 {
      font-family: var(--primary-font);
      font-size: 24px;
      letter-spacing: var(--title-spacing);
      color: #444;
      padding: 2rem 0 1.5rem;
    }

    p {
      margin-bottom: 1rem;
      line-height: 1.5;
      font-size: 14px;
      color: rgba(0,0,0,.7);
    }

    .credit {
      margin-top: 30px;
      font-size: 12px;
      font-style: italic;

      a {
        color: var(--app-background);
      }
    }
  }

  .how-to-play.show {
    pointer-events: visible;
    background: rgba(0,0,0,.5);

    .content {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }
</style>
