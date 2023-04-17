<template>
  <nav class="breadcrumb" aria-label="Breadcrumb">
    <ol class="crumbs">
      <li v-for="(item, index) in breadcrumbList" :key="item">
        <router-link v-if="isLast(index)" to="/">{{ item }}</router-link>
        <span v-else>{{ item }}</span>
        <BaseIcon
          nameIcon="chevron-breadcrumb-right"
          width="5"
          pick="common"
          v-if="isLast(index)"
          class="separator"
        />
      </li>
    </ol>
  </nav>
</template>

<script>
import { languageExpressions } from "@/constants/locales";
import { URLBuilder } from "@/constants/functions";
import { mapGetters } from "vuex";
export default {
  name: "BreadCrumbs",
  data() {
    return {
      /**
       * Массив содержит имена ссылок.
       */
      breadcrumbList: [],
    };
  },
  mounted() {
    /**
     * Задоем имена ссылок.
     */
    this.breadcrumbs("breadcrumbs", this.$route.meta.breadcrumb);
  },
  watch: {
    $route(to) {
      const city = to.params.city;
      this.breadcrumbs("breadcrumbs", this.$route.meta.breadcrumb, city);
    },
  },
  computed: {
    ...mapGetters(["getLocales", "getCitySelected"]),
  },
  methods: {
    /**
     * Возвращает строковые константы с учетом локали.
     */
    languageExpressions,
    URLBuilder,
    /**
     * По условию отображает элемент ссылка.
     */
    isLast(index) {
      return index !== this.breadcrumbList.length - 1;
    },
    /**
     * Функция для создания массива с именами ссылок.
     * @param key Ключ 1-го уровня для объекта со строковыми константами.
     * @param arr Массив с ключами 2-го уровня для объекта со строковыми константами.
     */
    breadcrumbs(key, arr) {
      const crumbsArr = arr.map(({ name }) =>
        languageExpressions(this.getLocales, key, name)
      );

      arr.some(({ name }) => name !== "main" && name !== "cities")
        ? crumbsArr.push(this.getCitySelected.name_loc)
        : crumbsArr;
      this.breadcrumbList = crumbsArr;
    },
  },
};
</script>

<style lang="scss" scoped>
.breadcrumb {
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
  list-style: none;

  & a::first-letter {
    text-transform: capitalize;
  }
  & span::first-letter {
    text-transform: capitalize;
  }
  & > li {
    display: flex;
    flex-wrap: nowrap;
  }

  & a {
    color: #04569c;
  }

  & span {
    color: #9c9c9c;
  }

  & .separator,
  & a {
    margin-right: 8px;
  }
}
</style>
