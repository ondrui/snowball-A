<template>
  <div class="wrapper">
    <SwitcherRadioBtn
      class="switcher"
      :radioValues="getRadioValues"
      v-model="radio"
    />
    <MapArmenia v-if="radio === 'map'" :datasetCard="cardMapData" />
    <ListTopCities v-if="radio === 'cities'" :itemList="getListTopCities" />
    <div class="link-city">
      <router-link :to="pushNewURL()">{{ getTitleLink }}</router-link>
      <div class="arrow-icon">
        <BaseIcon width="9" nameIcon="arrow-right" pick="common" />
      </div>
    </div>
  </div>
</template>

<script>
import MapArmenia from "@/components/Maps/MapArmenia.vue";
import ListTopCities from "@/components/ListTopCities.vue";
import { mapGetters } from "vuex";
import { cityIn } from "lvovich";

export default {
  name: "TabInformerMain",
  components: {
    MapArmenia,
    ListTopCities,
  },
  data() {
    return {
      radio: "map",
    };
  },
  computed: {
    ...mapGetters([
      "getListTopCities",
      "cardMapData",
      "getCountryNameLoc",
      "getListAllCities",
      "getConstantLocale",
      "getCitySelected",
      "getLocaleURL",
    ]),
    /**
     * Возвращает настройки отрисовки радио кнопок в компоненте Navbar.vue.
     */
    getRadioValues() {
      return [
        ["map", this.getConstantLocale("viewsSwitcher")[0]],
        ["cities", this.getConstantLocale("viewsSwitcher")[1]],
      ];
    },
    getTitleLink() {
      const country = cityIn(this.getCountryNameLoc);
      return this.getConstantLocale("allCityBtnCaption")
        .replace("$", this.getListAllCities.length)
        .replace("$", country);
    },
  },
  methods: {
    pushNewURL() {
      return {
        name: "cities",
        params: {
          lang: this.getLocaleURL,
          city: this.getCitySelected.name_en,
        },
      };
    },
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

  & .arrow-icon {
    pointer-events: none;
    display: flex;
    transition: transform 0.3s ease-in-out;
    width: 9px;
    height: 9px;
    position: absolute;
    margin: auto 0;
    right: 14px;
    bottom: 0;
    top: 0;
  }
  &:hover .arrow-icon {
    transform: scale(1.2);
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
