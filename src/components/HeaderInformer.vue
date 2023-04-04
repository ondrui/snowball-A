<template>
  <div class="header-informer">
    <BreadCrumbs :crumbsKeys="crumbsKeys" />
    <SearchBar />
    <CurrentBlock />
  </div>
</template>

<script>
import CurrentBlock from "./CurrentBlock.vue";

export default {
  components: {
    CurrentBlock,
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
