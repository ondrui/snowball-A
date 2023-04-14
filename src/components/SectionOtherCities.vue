<template>
  <div class="other-cities">
    <div class="container">
      <h2 class="other-cities-title">
        <span>{{ getHistoryTitle[0] }}&nbsp;</span>{{ getHistoryTitle[1] }}
      </h2>
      <DragScrolling class="other-cities-list" role="list">
        <div
          v-for="item in cardMapData"
          :key="`c-${item.name_en}`"
          class="other-cities-item"
        >
          <CardCityGrid :itemDataset="item" />
        </div>
      </DragScrolling>
    </div>
  </div>
</template>

<script>
import { languageExpressions } from "@/constants/locales";
import CardCityGrid from "./CardCityGrid.vue";
import DragScrolling from "./DragScrolling.vue";
import { cityIn } from "lvovich";

export default {
  components: {
    CardCityGrid,
    DragScrolling,
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
    getCountryNameLoc() {
      return this.$store.getters.getCountryNameLoc;
    },
    getHistoryTitle() {
      const country = cityIn(this.getCountryNameLoc);
      const arr = this.languageExpressions(
        this.getLocales,
        "sectionOtherCities"
      ).split(" ");
      return [arr.shift(), arr.join(" ").replace("$", country)];
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
.other-cities {
  width: 100%;
  margin-bottom: 52px;
}
.container {
  max-width: $width-page-xl;
  margin: 0 auto;
  padding: 0 10px;
  width: 100%;
}
.other-cities-title {
  text-transform: uppercase;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  color: #9cabbe;
  & span {
    color: #000000;
  }
}
.other-cities-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 10px;
  overflow: auto;
  margin: -8px;
  padding: 8px;
  margin-top: 8px;
}
.other-cities-item {
  // min-width: 210px;
  flex: 1 0;
}
@media only screen and (max-width: $media-width-xl) {
  .container {
    max-width: $width-page-lg;
  }
}
</style>
