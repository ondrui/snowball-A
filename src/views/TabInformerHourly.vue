<template>
  <div class="wrapper">
    <ScrollableModeInformer
      :labelCoordinates="{
        wind: '330px',
        pressure: '384px',
        humidity: '419px',
      }"
      isGrabCursor
      ><TabInformerHourlyContent
    /></ScrollableModeInformer>
  </div>
</template>

<script>
import ScrollableModeInformer from "@/components/ScrollableModeInformer.vue";
import TabInformerHourlyContent from "@/components/TabInformerHourlyContent.vue";
import { mapGetters } from "vuex";
import { cityIn } from "lvovich";

export default {
  name: "TabInformerHourly",
  metaInfo() {
    const inflectCityName = cityIn(this.getCitySelected.name_loc_choice);
    const country = cityIn(this.getCountryNameLoc);
    const strKeywords = this.getConstantLocale("hourly", "keywords")
      .replace("$", inflectCityName)
      .replace("$", country);
    return {
      title: this.getConstantLocale("hourly", "title").replace(
        "$",
        inflectCityName
      ),
      meta: [
        {
          name: "description",
          content: this.getConstantLocale("hourly", "description").replace(
            "$",
            inflectCityName
          ),
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
    TabInformerHourlyContent,
  },
  computed: {
    ...mapGetters([
      "getConstantLocale",
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
