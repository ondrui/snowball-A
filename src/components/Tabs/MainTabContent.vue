<template>
  <div class="wrapper">
    <SwitcherRadioBtn
      class="switcher"
      :radioValues="getRadioValues"
      v-model="radio"
    />
    <div class="map-container">
      <nav class="navigation">
        <MapMenu :list="dayMarkers" />
        <MapMenu :list="indicators" />
      </nav>
      <ArmeniaMap />
      <div class="link-city">
        <a href="#">
          {{ languageExpressions(getLocales, "allCityBtnCaption") }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import ArmeniaMap from "@/components/Maps/ArmeniaMap.vue";
import MapMenu from "@/components/Maps/MapMenu.vue";
import { languageExpressions } from "@/constants/locales";

export default {
  components: {
    ArmeniaMap,
    MapMenu,
  },
  data() {
    return {
      radio: "map",
      dayMarkers: [],
      indicators: [],
    };
  },
  created() {
    [0, 3, 4].forEach((e) =>
      this.dayMarkers.push(
        languageExpressions(this.getLocales, "timeMarker")[e]
      )
    );
    ["temp", "wind"].forEach((e) =>
      this.indicators.push(
        languageExpressions(this.getLocales, "climateIndicators", e)
      )
    );
  },
  computed: {
    /**
     * Возвращает языковую метку.
     * @example
     * "ru"
     */
    getLocales() {
      return this.$store.getters.getLocales;
    },
    /**
     * Возвращает настройки отрисовки радио кнопок в компоненте Navbar.vue.
     */
    getRadioValues() {
      return [
        ["map", languageExpressions(this.getLocales, "viewsSwitcher")[0]],
        ["cities", languageExpressions(this.getLocales, "viewsSwitcher")[1]],
      ];
    },
  },
  methods: {
    languageExpressions,
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 14px;
  text-align: center;
}
.switcher {
  margin: 0 auto;
}
.map-container {
  position: relative;
  min-width: 750px;
  min-height: 655px;
  background: #ffffff;
  border: 1px solid #d8e9f3;
  margin-top: 14px;

  & .navigation {
    display: flex;
    justify-content: space-between;
    padding: 18px 30px 0 30px;
  }
}
.link-city {
  position: absolute;
  margin: 0 auto;
  bottom: 22px;
  left: 0;
  right: 0;
  width: max-content;

  &::after {
    content: "";
    display: inline-block;
    background: url("@/assets/images/common/arrow-right.svg?external") no-repeat;
    background-size: 9px 9px;
    transition: transform 0.3s ease-in-out;
    width: 9px;
    height: 9px;
    position: absolute;
    margin: auto 0;
    right: 14px;
    bottom: 0;
    top: 0;
  }

  & a {
    text-decoration: none;
    display: inline-block;
    padding: 12px 30px 12px 14px;
    background: #e1ecf9;
    border-radius: 20px;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    color: #04569c;
    &:hover {
      text-decoration: underline;
      background: #d0e3f8;
    }
  }
}
// box-shadow: 0 0px 8px 4px rgb(0 70 128 / 81%);
</style>
