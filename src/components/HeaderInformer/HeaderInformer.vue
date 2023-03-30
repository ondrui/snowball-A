<template>
  <div class="header-informer">
    <BreadCrumbs :crumbsKeys="crumbsKeys" />
    <SearchBar />
    <ForecastHeader />
  </div>
</template>

<script>
import ForecastHeader from "./ForecastHeader.vue";

export default {
  components: {
    ForecastHeader,
  },
  data() {
    return {
      crumbsKeys: [],
    };
  },
  created() {
    const VALID_KEYS_CRUMBS = ["main", "weather", "city"];
    this.crumbsKeys = VALID_KEYS_CRUMBS;
  },
};
</script>

<style lang="scss" scoped>
.header-informer {
  padding: 0 10px;
}
</style>
