<template>
  <div class="breadcrumbs">
    <div class="crumbs">
      <div v-for="(item, index) in crumbs" :key="item[0]">
        <router-link v-if="isLast(index)" :to="{ name: crumbs[0][0] }">{{
          item[1]
        }}</router-link>
        <span v-else>{{ item[1] }}</span>
        <BaseIcon
          nameIcon="chevron-breadcrumb-right"
          width="5"
          pick="common"
          v-if="isLast(index)"
          class="breadcrumbs-chevron"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { languageExpressions } from "@/constants/locales";
export default {
  name: "BreadCrumbs",
  props: {
    crumbsKeys: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      /**
       * Массив содержит имена ссылок.
       */
      crumbs: [],
    };
  },
  mounted() {
    /**
     * Задоем имена ссылок.
     */
    this.breadcrumbs("breadcrumbs", this.crumbsKeys);
  },
  computed: {
    /**
     * Возвращает языковую метку для определения локали.
     * @example "ru"
     */
    getLocales() {
      return this.$store.getters.getLocales;
    },
  },
  methods: {
    /**
     * Возвращает строковые константы с учетом локали.
     */
    languageExpressions,
    /**
     * По условию отображает элемент ссылка.
     */
    isLast(index) {
      return index !== this.crumbs.length - 1;
    },
    /**
     * Функция для создания массива с именами ссылок.
     * @param key Ключ 1-го уровнядля объекта со строковыми константами.
     * @param arr Массив с ключами 2-го уровня для объекта со строковыми константами.
     */
    breadcrumbs(key, arr) {
      arr.forEach((element) => {
        this.crumbs.push([
          element,
          languageExpressions(this.getLocales, key, element),
        ]);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.breadcrumbs {
  display: flex;
  align-items: center;
  margin-bottom: 22px;
}

.crumbs {
  display: flex;
  align-items: center;
  max-width: 950px;
  min-width: max-content;
  width: 100%;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;

  & div::first-letter {
    text-transform: capitalize;
  }

  & a {
    color: #04569c;
  }

  & span {
    color: #9c9c9c;
  }

  & .breadcrumbs-chevron,
  & a {
    margin-right: 8px;
  }
}

@media only screen and (max-width: $media-width-lg) {
  .breadcrumbs-header {
    margin-bottom: 16px;
  }
}
</style>
