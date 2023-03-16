<template>
  <div class="cities">
    <h2 class="cities-title">
      <span>{{
        languageExpressions(getLocales, "sectionOtherCities").slice(0, 6)
      }}</span
      >{{ languageExpressions(getLocales, "sectionOtherCities").slice(6) }}
    </h2>
    <ul ref="list" class="cities-list" role="list">
      <li
        v-for="item in cardMapData"
        :key="`c-${item.name_en}`"
        class="cities-item"
        @mousedown.prevent="mouseDown"
        @mouseleave="mouseLeave"
        @mouseup="mouseUp"
        @mousemove.prevent="mouseMove"
      >
        <CardCityShort :data="item" />
      </li>
    </ul>
  </div>
</template>

<script>
import { languageExpressions } from "@/constants/locales";
import CardCityShort from "./CardCityShort.vue";
import dragScrolling from "@/mixins/drag-scrolling";

export default {
  mixins: [dragScrolling],
  components: {
    CardCityShort,
  },
  mounted() {
    this.elemNameScroll = "list";
  },
  computed: {
    /**
     * Возвращает список городов.
     */
    cardMapData() {
      return this.$store.getters.cardMapData.slice(0, 5);
    },
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
  },
};
</script>

<style lang="scss" scoped>
.cities-title {
  text-transform: uppercase;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  color: #9cabbe;
  & span {
    color: #000000;
  }
}
.cities-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 10px;
  overflow: auto;
  margin: -8px;
  padding: 8px;
  list-style: none;
  margin-top: 8px;
}
.cities-item {
  min-width: 210px;
  flex: 1 0;
}
</style>
