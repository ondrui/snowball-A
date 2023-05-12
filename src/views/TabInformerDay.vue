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

export default {
  name: "TabInformerDay",
  metaInfo() {
    return {
      title: this.getConstantLocale("day", "title"),
      meta: [
        {
          name: "description",
          content: this.getConstantLocale("day", "description"),
        },
        {
          name: "keywords",
          content: this.getConstantLocale("day", "keywords"),
        },
      ],
    };
  },
  components: {
    ScrollableModeInformer,
    TabInformerDayContent,
  },
  computed: {
    ...mapGetters(["getConstantLocale"]),
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
