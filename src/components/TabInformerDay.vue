<template>
  <div class="wrapper">
    <ScrollableModeInformer
      :labelCoordinates="{
        wind: '292px',
        pressure: '345px',
        humidity: '382px',
      }"
      ><TabInformerDayContent
    /></ScrollableModeInformer>
  </div>
</template>

<script>
import ScrollableModeInformer from "@/components/ScrollableModeInformer.vue";
import TabInformerDayContent from "@/components/TabInformerDayContent.vue";

export default {
  name: "TabInformerDay",
  components: {
    ScrollableModeInformer,
    TabInformerDayContent,
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
