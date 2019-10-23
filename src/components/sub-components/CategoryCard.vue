<template>
  <div
    role="button"
    :style="styleObj"
    :class="cssClass"
    @click="$emit('on-select-category', category.id)">
      <span class="category--icon">{{ category.icon }}</span>
      <span class="category--title">{{ category.title }}</span>
  </div>
</template>

<script>
export default {
  name: 'CategoryCard',

  props: {
    category: { type: Object, required: true },
    selected: { type: Boolean, default: false }
  },

  computed: {
    styleObj () {
      const { color } = this.category
      return {
        backgroundColor: color,
        borderColor: color
      }
    },
    cssClass () {
      const category = 'category'
      return this.selected ? category + ' selected' : category
    }
  }
}
</script>

<style lang="scss" scoped>
  .category {
    height: 120px;
    color: #fff;
    border-radius: 4px;
    padding: 4px 4px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: flex-end;
    border: 2px solid;
    cursor: pointer;

    &--title {
      margin-top: 10px;
      font-size: 15px;
    }

    &--icon {
      font-size: 24px;
    }
  }

  @media screen and (min-width: 760px) {
    .category--title {
      font-size: 20px;
    }
  }

  .category.selected {
    background: #fff !important;
    color: #444 !important;

    .category--title {
      transform: translate3d(0, -4px, 0);
      transition: .55s ease;
    }
  }

</style>
