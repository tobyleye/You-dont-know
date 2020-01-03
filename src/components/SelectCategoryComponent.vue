<template>
  <div id="select-category" class="page">
    <div class="sc-page page-container">
      <header class="sc-header">
        <button
          class="sc-header--back"
          @click="goBack"
          :disabled="loading"
        >
          &times;
        </button>
        <h3 class="sc-header--title">Select Category</h3>
      </header>
      <section>
        <div class="instruction">
          <h2>Hello Deer!</h2>
          <p>Select a category to play.</p>
        </div>
        <ul class="categories">
          <li
            v-for="category in categories"
            :key="category.id"
            >
              <category-card
                :selected="selectedCategoryId === category.id"
                :category="category"
                @on-select-category="selectCategory"
              />
          </li>
        </ul>
        <button
          v-show="categorySelected"
          :class="['next', {loading: loading}]"
          @click="start"
          :disabled="loading"
          >
            {{ loadingState }}
        </button>
      </section>
    </div>
  </div>
</template>

<script>
import { CATEGORIES } from '@/constants'
// components
import CategoryCard from '@/components/sub-components/CategoryCard.vue'

export default {
  name: 'SelectCategoryComponent',

  components: {
    CategoryCard
  },

  data () {
    return {
      categories: CATEGORIES,
      categorySelected: false,
      selectedCategoryId: null,
      loading: false
    }
  },

  computed: {
    loadingState () {
      const [start, starting] = ['start!', 'starting...']
      return this.loading ? starting : start
    }
  },

  methods: {
    selectCategory (categoryId) {
      if (this.loading) return
      this.categorySelected = true
      this.selectedCategoryId = categoryId
    },

    start () {
      this.loading = true
      this.$store.dispatch('startGame', this.selectedCategoryId)
        .finally(() => {
          this.loading = false
        })
    },

    goBack () {
      this.$store.dispatch('previousStep')
    }
  }
}
</script>

<style lang="scss" scoped>
  .sc-page {
    padding-top: 50px;
  }

  .sc-header {
    display: flex;
    padding: 0px 16px;
    align-items: center;
    color: rgba(0,0,0,.7);
    background: #fafafa;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 55px;
    box-shadow: 0px 2px 3px rgba(0,0,0,.1);

    &--back {
      margin-right: 20px;
      border: 0;
      outline: 0;
      padding: 10px 15px;
      font-weight: 400;
      font-size: 24px;
      background: none;
      cursor: pointer;
      color: inherit;
    }
  }

  .instruction {
    margin: 2rem 0;
    padding: 0 16px;

    h2 {
      margin-bottom: 5px;
      color: #444;
    }

    p {
      font-weight: 300;
    }
  }

  .categories {
    padding: 0 10px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 4px;
    padding-bottom: 80px;
  }

  .next {
    --initial-color: #fff;
  }

  .next {
    border: 0;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    display: block;
    height: 55px;
    text-transform: uppercase;
    font-size: 15px;
    font-weight: 800;
    background: var(--app-background);
    color: var(--initial-color);
  }

</style>
