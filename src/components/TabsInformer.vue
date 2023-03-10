<template>
  <div class="tabs-container">
    <div class="buttons-tabs">
      <button
        :class="['button-tab', { active: currentTab === key }]"
        @click="showContent(key)"
        v-for="(value, key) in tabsList"
        :key="key"
      >
        <span v-if="key === 'main'">
          <BaseIcon name="home" pick="common" class="home-icon" />
        </span>
        <span v-else>{{ showTitle(value, key) }}</span>
      </button>
    </div>
    <div class="tab">
      <!-- route outlet -->
      <!-- component matched by the route will render here -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { languageExpressions } from "@/constants/locales";
import { eventBus } from "../main.js";

export default {
  data() {
    return {
      /**
       * @param currentTab Имя открытой вкладки (кампоненты).
       */
      currentTab: "main",
    };
  },
  created() {
    this.currentTab = this.$route.name;
    eventBus.$on("go", this.showContent);
  },
  computed: {
    getLocales() {
      return this.$store.getters.getLocales;
    },
    /**
     * Подписи для вкладок.
     */
    tabsList() {
      return languageExpressions(this.getLocales, "tabsDescr");
    },
    tenDaysTabTable() {
      return this.$store.getters.tenDaysTabTable;
    },
  },
  methods: {
    languageExpressions,
    /**
     * Обработчик для установки имени открытой вкладки. Передается
     * через параметр.
     * @param key Строка содержит имя вкладки.
     */
    showContent(key) {
      if (key !== this.$route.name) this.$router.push({ name: key });
      this.currentTab = this.$route.name;
    },
    /**
     * Возвращает название вкладки с учетом количества дней прогноза.
     * @param value Значение свойства, котороое содержит название вкладки.
     * @param key Имя свойства, котороое содержит название вкладки.
     */
    showTitle(value, key) {
      return key === "days"
        ? `${value.slice(0, 18)}${this.tenDaysTabTable.length}${value.slice(
            17,
            30
          )}`
        : value;
    },
  },
};
</script>

<style lang="scss" scoped>
.home-icon {
  width: 18px;
  height: 15px;
}
.tab {
  // padding: 22px 24px;
  background-color: #f0f7fc;
  border: 1px solid #b2d3e8;
  border-top: none;
}
.buttons-tabs {
  width: 100%;
  display: grid;
  grid-template-columns: min-content 1fr 1fr;
  align-items: flex-end;
  column-gap: 2px;
  position: relative;
  // border-bottom: 1px solid #b2d3e8;
  box-shadow: inset 0 -1px 0 0 #b2d3e8;

  .button-tab {
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    // flex: 1;
    border: none;
    white-space: nowrap;
    cursor: pointer;
    border: 1px solid #b2d3e8;
    background-color: #ffffff;
    border-radius: 4px 4px 0 0;
    // min-width: 10ch;
    min-height: 34px;
    &:first-child span {
      display: flex;
      padding: 10px 10px;
    }

    & span {
      display: inline-block;
      font-weight: 400;
      font-size: 14px;
      line-height: 15px;
      color: #04569c;
      padding: 10px 5px;

      &::first-letter {
        text-transform: capitalize;
      }
    }

    &:hover {
      background-color: #d6e8f3;

      & span {
        color: #04569c;
        text-decoration: underline;
      }
    }

    &.active {
      background-color: #f0f7fc;
      box-shadow: none;
      border-top: none;
      border-top: 3px solid #04569c;
      border-bottom: none;
      &:first-child span {
        padding: 11px 10px;
      }

      & span {
        color: #000000;
        text-decoration: none;
        padding: 11px 5px;
      }
    }
  }
}
</style>
