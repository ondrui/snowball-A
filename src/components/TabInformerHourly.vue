<template>
  <div class="wrapper">
    <ScrollableModeInformer
      :labelCoordinates="{
        wind: '330px',
        pressure: '384px',
        humidity: '419px',
      }"
      ><TabInformerHourlyContent
    /></ScrollableModeInformer>
  </div>
</template>

<script>
import ScrollableModeInformer from "@/components/ScrollableModeInformer.vue";
import TabInformerHourlyContent from "@/components/TabInformerHourlyContent.vue";

export default {
  name: "TabInformerHourly",
  components: {
    ScrollableModeInformer,
    TabInformerHourlyContent,
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 20px;
  width: 100%;
}
@media only screen and (max-width: 600px) {
  .wrapper {
    padding: 20px 5px;
  }
}
</style>
