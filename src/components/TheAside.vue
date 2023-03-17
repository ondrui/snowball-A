<template>
  <aside class="asidebar">
    <div class="asidebar-ad"></div>
    <div v-if="cardMapData.length" class="history">
      <h2 class="history-title">
        <span>{{
          languageExpressions(getLocales, "asideHistory").slice(0, 7)
        }}</span
        >{{ languageExpressions(getLocales, "asideHistory").slice(7) }}
      </h2>
      <ul class="history-list" role="list">
        <li
          v-for="(item, index) in cardMapData"
          :key="`c-${item.name_en}`"
          class="history-item"
        >
          <component
            :data="item"
            :is="showComponent(index, cardMapData.length)"
          />
        </li>
      </ul>
    </div>
    <div class="asidebar-ad"></div>
  </aside>
</template>

<script>
import { languageExpressions } from "@/constants/locales";
import CardCityShort from "./CardCityShort.vue";
import CardCityBig from "./CardCityBig.vue";
import CardCityMiddle from "./CardCityMiddle.vue";

export default {
  components: {
    CardCityShort,
    CardCityBig,
    CardCityMiddle,
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
    /**
     *
     */
    showComponent(index, length) {
      if (index === 0) return "CardCityBig";
      if (index === 4 || (index === 3 && length === 5)) return "CardCityShort";
      if (index > 0 && index < 4) return "CardCityMiddle";
    },
  },
};
</script>

<style lang="scss" scoped>
.asidebar {
  display: flex;
  flex-direction: column;
  row-gap: 30px;
}
.asidebar-ad {
  min-width: 300px;
  min-height: 800px;
  background: url("@/assets/images/sea.jpg") no-repeat;
}
.history-title {
  text-transform: uppercase;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #9cabbe;
  margin-bottom: 16px;
  & span {
    color: #000000;
  }
}
.history-list {
  // max-width: 300px;
  // min-height: 490px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  // flex-direction: column;
  // justify-content: end;
  row-gap: 12px;
  column-gap: 12px;
  list-style: none;
}
.history-item {
  display: flex;
  flex: 1 0 100%;
  height: min-content;
  &:first-child {
    min-height: 200px;
  }
}
.history-item:nth-child(n + 4) {
  display: flex;
  flex: 1 0 calc(100% / 2 - 12px);
}
@media only screen and (max-width: 600px) {
  .history {
    padding: 0 10px;
  }
}
</style>
