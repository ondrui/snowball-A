<template>
  <div class="header-informer">
    <BreadcrumbsHeader />
    <SearchHeader />
    <ForecastHeader />
  </div>
</template>

<script>
import BreadcrumbsHeader from "./BreadcrumbsHeader.vue";
import SearchHeader from "./SearchHeader.vue";
import ForecastHeader from "./ForecastHeader.vue";

export default {
  components: {
    BreadcrumbsHeader,
    SearchHeader,
    ForecastHeader,
  },
};
</script>

<style lang="scss" scoped>
.header-informer {
  padding: 0 10px;
}
</style>
