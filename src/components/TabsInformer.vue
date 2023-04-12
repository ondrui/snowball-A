<template>
  <div class="tabs-container">
    <div class="buttons-tabs">
      <button
        :class="[
          'button-tab',
          { active: currentTab === key },
          { hover: isHover(key) },
        ]"
        @click="showContent(key)"
        v-for="(value, key) in tabsList"
        :key="key"
      >
        <span v-if="key === 'main'">
          <BaseIcon nameIcon="home" pick="common" class="home-icon" />
        </span>
        <span v-else>{{ showTitle(value, key) }}</span>
      </button>
    </div>
    <div class="tab">
      <component :is="currentTabComponent"></component>
    </div>
  </div>
</template>
<script>
import { languageExpressions } from "@/constants/locales";
import { eventBus } from "../main.js";
import { mapGetters } from "vuex";
import TabInformerDay from "./TabInformerDay.vue";
import TabInformerHourly from "./TabInformerHourly.vue";
import TabInformerMain from "./TabInformerMain.vue";

export default {
  components: {
    TabInformerDay,
    TabInformerHourly,
    TabInformerMain,
  },
  data() {
    return {
      /**
       * @param currentTab Имя открытой вкладки (кампоненты).
       */
      currentTab: "",
      hover: false,
    };
  },
  created() {
    eventBus.$on("go", (bol) => {
      this.hover = bol;
    });
    if (!this.$route.params.tab) return;
    this.currentTab = this.$route.params.tab;
  },
  destroyed() {
    eventBus.$off();
  },
  computed: {
    ...mapGetters(["getLocales", "tenDaysTabTable", "getCitySelected"]),
    /**
     * Подписи для вкладок.
     */
    tabsList() {
      return languageExpressions(this.getLocales, "tabsDescr");
    },
    currentTabComponent() {
      const string = this.currentTab;
      return `TabInformer${string.charAt(0).toUpperCase() + string.slice(1)}`;
    },
  },
  watch: {
    "$route.params"(to) {
      this.currentTab = to.tab;
      this.hover = false;
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
      this.$router
        .push({
          name: "main",
          params: {
            locale: this.getLocales,
            city: this.getCitySelected.name_url,
            tab: key,
          },
        })
        .catch(() => {});
    },
    /**
     * Возвращает название вкладки с учетом количества дней прогноза.
     * @param value Значение свойства, котороое содержит название вкладки.
     * @param key Имя свойства, котороое содержит название вкладки.
     */
    showTitle(value, key) {
      return key === "day"
        ? value.replace("$", this.tenDaysTabTable.length)
        : value;
    },
    isHover(val) {
      return val === "hourly" && this.hover;
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
      background-color: #f0f7fc;

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
.button-tab.hover {
  background-color: #f0f7fc;
  transition: all 0.3s ease-in-out;
  & span {
    color: #04569c;
    text-decoration: underline;
  }
}
</style>
