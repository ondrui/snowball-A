<template>
  <div class="main-container">
    <CurrentBlock />
    <TabsInformer />
    <DetailsSegment />
    <AllSVGIcons class="hidden" />
  </div>
</template>

<script>
import TabsInformer from "../components/TabsInformer.vue";
import DetailsSegment from "../components/DetailsSegment/DetailsSegment.vue";
import CurrentBlock from "../components/CurrentBlock.vue";
import AllSVGIcons from "../components/AllSVGIcons.vue";

export default {
  name: "WeatherInformer",
  components: {
    TabsInformer,
    AllSVGIcons,
    DetailsSegment,
    CurrentBlock,
  },
};
</script>

<style lang="scss" scoped>
.main-container {
  // margin: 0 auto;
  background-color: #ffffff;
  // width: 800px;
  // max-width: 900px;
  // min-width: 420px;
}
.hidden {
  display: none;
}
</style>
