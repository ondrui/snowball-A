<template>
  <div class="wrapper">
    <SwitcherRadioBtn
      class="switcher"
      :radioValues="getRadioValues"
      v-model="radio"
    />
    <MapArmenia v-if="radio === 'map'" :datasetCard="cardMapData" />
    <ListCities v-if="radio === 'cities'" :itemList="getListCities" />
    <div class="link-city">
      <router-link to="/go">{{
        languageExpressions(getLocales, "allCityBtnCaption")
      }}</router-link>
    </div>
  </div>
</template>

<script>
import MapArmenia from "@/components/Maps/MapArmenia.vue";
import ListCities from "@/components/ListCities.vue";
import { languageExpressions } from "@/constants/locales";

export default {
  name: "MainTabContent",
  components: {
    MapArmenia,
    ListCities,
  },
  data() {
    return {
      radio: "map",
    };
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
     * Возвращает список городов.
     */
    getListCities() {
      return this.$store.getters.getListCities;
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
    /**
     * Возвращает данные для карточек на корте из стора.
     */
    cardMapData() {
      return this.$store.getters.cardMapData;
    },
  },
  methods: {
    languageExpressions,
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  padding-top: 14px;
  text-align: center;
}
.switcher {
  margin: 0 auto;
}
.link-city {
  position: absolute;
  margin: 0 auto;
  bottom: 32px;
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
