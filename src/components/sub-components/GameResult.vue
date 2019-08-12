<template>
  <div class="result" :style="{backgroundColor: theme}">
    <header>
      <h1>You Dont Know</h1>
    </header>
    <div class="content">
      <figure class="meme">
        <img v-once :src="generateMeme()" alt="meme">
      </figure>
      <div class="score">You scored {{ percentScore }}%</div>
      <ul class="result-actions">
        <li>
          <button
            :style="{color: theme}"
            class="restart btn--lg"
            :disabled="loading"
            @click="restartGame">{{ loadingState }}
          </button>
        </li>
        <li>
          <button
            class="new-category btn--lg"
            :disabled="loading"
            @click="selectNewCategory">Select New Category
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { generateMeme } from '@/utils'

const GREEN = '#96ceb4'
const RED = '#ff8b94'

export default {
  name: 'GameResult',
  props: {
    score: { type: Number, required: true }
  },
  data () {
    return {
      loading: false
    }
  },

  created () {
    this.percentScore = this.score
  },

  computed: {
    meme () {
      const generatedMeme = generateMeme(this.percentScore)
      return require('../../assets/' + generatedMeme)
    },
    theme () {
      return this.percentScore < 50 ? RED : GREEN
    },
    loadingState () {
      return this.loading ? 'Starting...' : 'Restart'
    }
  },

  methods: {
    restartGame () {
      this.loading = true
      this.$store.dispatch('restartGame')
        .then(() => {
          this.$emit('on-restart-game')
        })
        .finally(() => {
          this.loading = false
        })
    },

    generateMeme () {
      const generatedMeme = generateMeme(this.percentScore)
      return require('../../assets/' + generatedMeme)
    },

    selectNewCategory () {
      this.$store.dispatch('previousStep')
    }
  }
}
</script>

<style lang="scss" scoped>
  .result {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100vh;
    text-align: center;
    background: #fff;
  }

  header {
    padding: 10px 12px;
    font-family: var(--primary-font);
    border-bottom: 1px solid #fff;
    color: rgba(#fff, .7);
    margin-bottom: 2rem;

    h1 {
      letter-spacing: var(--title-spacing);
      font-size: 2.2rem;
    }
  }

  .result-actions {
    margin-top: 2rem;

    li:first-child {
      margin-bottom: 20px;
    }
  }

  .meme {
    max-width: 300px;
    // height: 200px;
    margin: 0 auto;

    img {
      height: 100%;
      width: 100%;
      object-fit: contain;
    }
  }

  .score {
    margin-top: 20px;
    font-size: 1.5rem;
    color: #fff;
    font-weight: 800;
  }

  .restart {
    background: #fff;
  }

  .new-category {
    background-color: rgba(0,0,0,.3);
    color: #fff;
  }

</style>
