<template>
  <div class="wrapper">
    <ScrollableModeInformer
      :labelCoordinates="{
        wind: '308px',
        pressure: '361px',
        humidity: '398px',
      }"
      ><TabInformerDayContent
    /></ScrollableModeInformer>
  </div>
</template>

<script>
import ScrollableModeInformer from "@/components/ScrollableModeInformer.vue";
import TabInformerDayContent from "@/components/TabInformerDayContent.vue";
import { mapGetters } from "vuex";
import { cityIn } from "lvovich";

export default {
  name: "TabInformerDay",
  /**
   * Параметр компонента, который содержит всю информацию,
   * которая преобразуется в различные метатеги и атрибуты страницы.
   * Добавляет информацию в тег <title>
   * Добавляет на страницу метатег <meta> с атрибутом name и keywords.
   * Добавляет на страницу метатег <meta> с атрибутом name и description.
   */
  head() {
    const inflectCityName = cityIn(this.getCitySelected.name_loc_choice);
    const country = cityIn(this.getCountryNameLoc);
    const daysNum = this.tenDaysTabTable.length;
    const strTitle = this.getConstantLocale("day", "title")
      .replace("$", inflectCityName)
      .replace("$", daysNum);
    const strDescr = this.getConstantLocale("day", "description")
      .replace("$", inflectCityName)
      .replace("$", daysNum);
    const strKeywords = this.getConstantLocale("day", "keywords")
      .replace("$", inflectCityName)
      .replace("$", daysNum)
      .replace("$", country)
      .replace("$", daysNum);
    return {
      title: strTitle,
      meta: [
        {
          name: "description",
          content: strDescr,
        },
        {
          name: "keywords",
          content: strKeywords,
        },
      ],
    };
  },
  components: {
    ScrollableModeInformer,
    TabInformerDayContent,
  },
  computed: {
    ...mapGetters([
      "getConstantLocale",
      "tenDaysTabTable",
      "getCitySelected",
      "getCountryNameLoc",
    ]),
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 20px;
  width: 100%;
}
@media only screen and (max-width: $media-width-lg) {
  .wrapper {
    padding: 20px 5px;
  }
}
</style>
