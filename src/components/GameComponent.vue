<template>
  <div id="game" class="page">
    <div class="g-page page-container">
      <div class="game-board">
        <game-board-hud :retries="retries" :currentQuestion="currentQuestionIndex + 1" :totalQuestions="questions.length" />
        <div class="game-board--content">
          <game-board-timer :timeLeft="timeLeft" />
          <div class="game-board--question">
            <span class="category">{{ currentQuestion.category }}</span>
            <div :key="currentQuestionIndex">
              <h2 class="title">{{ currentQuestion.question | decode }}</h2>
              <ul class="options">
                <li v-for="(option, index) in currentQuestion.options" :key="index">
                  <button :data-option-index="index" :class="{ 'correct': showCorrectAnswer && currentQuestion.correct_answer_index === index }" @click="selectAnswer" :disabled="answerSelected">{{ option | decode }}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- game-board--content ends here -->
      </div>
      <transition name="showGameResult">
        <game-result :score="percentageScore" v-if="showGameResult" @on-restart-game="restartGame" />
      </transition>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'

// components
import GameResult from '@/components/sub-components/GameResult.vue'
import GameBoardHUD from '@/components/sub-components/GameBoardHUD.vue'
import GameBoardTimer from '@/components/sub-components/GameBoardTimer.vue'

let interval

export default {
  name: 'GameComponent',

  components: {
    GameResult,
    GameBoardTimer,
    'game-board-hud': GameBoardHUD
  },

  data () {
    return {
      currentQuestionIndex: 0,
      answerSelected: false,
      showCorrectAnswer: false,
      retries: 3,
      showGameResult: false,
      score: 0,
      timeLeft: 60 // 60 seconds
    }
  },

  created () {
    this.startTimer(600)
  },

  computed: {
    ...mapGetters(['questions']),

    currentQuestion () {
      const q = this.questions[this.currentQuestionIndex]
      q.options = _.shuffle([...q.incorrect_answers, q.correct_answer])
      q.correct_answer_index = q.options.indexOf(q.correct_answer)
      return q
    },
    done () {
      return this.currentQuestionIndex === this.questions.length - 1
    },
    percentageScore () {
      return Math.round((this.score / this.questions.length) * 100)
    }
  },

  filters: {
    decode (string) {
      const textArea = document.createElement('textarea')
      textArea.innerHTML = string
      return textArea.value
    }
  },

  methods: {
    restartGame () {
      this.resetGameState()
      this.startTimer(600)
      this.showGameResult = false
    },

    resetGameState () {
      this.currentQuestionIndex = 0
      this.retries = 3
      this.score = 0
      this.timeLeft = 60
      this.resetQuestionState()
    },

    startTimer (delay = 0) {
      setTimeout(() => {
        interval = setInterval(() => {
          this.timeLeft--
          // watch for timeup instead of using vue watchers
          // using any of the option is valid.
          if (this.timeLeft === 0) {
            this.clearTimer()
            this.showGameResult = true
          }
        }, 1000)
      }, delay)
    },

    pauseTimer () {
      clearInterval(interval)
    },

    selectAnswer (evt) {
      // pause timer
      this.pauseTimer()

      this.answerSelected = true
      const choice = evt.target
      choice.classList.add('selected')

      const choiceIndex = parseInt(choice.dataset.optionIndex)
      if (choiceIndex !== this.currentQuestion.correct_answer_index) {
        choice.classList.add('wrong')
        this.retries--
        this.showAnswer()
      } else {
        this.score++
        choice.classList.add('correct')
      }

      // wait for a few sec before showing next question
      setTimeout(() => {
        // true when all questions have been answered
        // or when life is used up. false else.
        const gameOver = this.done || this.retries === 0

        if (gameOver) {
          this.showGameResult = true
          this.clearTimer()
        } else {
          this.startTimer()
          this.nextQuestion()
        }
      }, 1200)
    },

    showAnswer () {
      this.showCorrectAnswer = true
    },

    nextQuestion () {
      this.resetQuestionState()
      this.currentQuestionIndex++
    },

    resetQuestionState () {
      this.answerSelected = false
      this.showCorrectAnswer = false
    },

    clearTimer () {
      clearInterval(interval)
      interval = null
    }
  }
}
</script>

<style lang="scss" scoped>
  /* game-page */
  .g-page {
    background: #673ab7;
    background: var(--app-background);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem 10px;
  }

  .game-board {
    background: #fff;
    flex: 0 1 640px;
    border-radius: 10px;
    box-shadow: 0px 8px 0px 2px rgba(20,20,20,.5);
    padding-bottom: 50px;

    &--content {
      padding: 0 10px;
    }

    &--question {
      text-align: center;

      .category {
        font-size: 14px;
        color: #666;
        font-weight: 300;
      }

      .title {
        font-size: 18px;
        line-height: 1.4;
        margin-top: 7px;
        color: #222;
        margin-bottom: 35px;
        color: rgba(0,0,0,.8);
        animation: fadein 1.5s ease;
      }

      ul.options {
        animation: slideOptions .55s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      }

      button {
        width: 80%;
        padding: 12px;
        border-radius: 10rem;
        border: 1px solid #e0e0e0;
        background: none;
        margin-bottom: 10px;
      }

      button.selected {
        animation: selectAnswer .2s ease;
      }

      button.wrong {
        color: #fff;
        border-color: transparent;
        background: #ff8178;
      }

      button.correct {
        color: #fff;
        border-color: transparent;
        background: #a4d867;
      }
    }
  }

  /* animations */

  @keyframes slideOptions {
    from {
      transform: translate3d(-50px, 0, 0);
      opacity: 0; }
    to {
      transform: translate3d(0px, 0, 0);
      opacity: 1; }
  }

  @keyframes selectAnswer {
    from { transform: scale(.9) }
    to { transform: scale(1); }
  }

  .showGameResult-enter-active,
  .showGameResult-leave-active {
    transition: 1s ease;
  }

  .showGameResult-enter {
    transform: translate3d(0, 100%, 0);
  }
  .showGameResult-leave-to {
    opacity: 0;
  }
</style>
