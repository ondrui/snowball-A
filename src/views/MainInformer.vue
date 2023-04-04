<template>
  <div class="main-container">
    <div v-if="!loading">Loading...</div>
    <template v-else>
      <HeaderInformer />
      <TabsInformer />
      <DetailsSegment />
      <AllSVGIcons class="hidden" />
    </template>
  </div>
</template>

<script>
import HeaderInformer from "../components/HeaderInformer.vue";
import TabsInformer from "../components/TabsInformer.vue";
import DetailsSegment from "../components/DetailsSegment/DetailsSegment.vue";
import AllSVGIcons from "../components/AllSVGIcons.vue";
import { languageExpressions } from "@/constants/locales";
import { setTimeFormat } from "@/constants/functions";

export default {
  components: {
    HeaderInformer,
    TabsInformer,
    AllSVGIcons,
    DetailsSegment,
  },
  computed: {
    /**
     * Возвращает языковую метку для определения локали.
     * @example "ru"
     */
    getLocales() {
      return this.$store.getters.getLocales;
    },
    /**
     * Возвращает булевое значение для лоадера.
     */
    loading() {
      return this.$store.getters.loading;
    },
  },
  methods: {
    languageExpressions,
    setTimeFormat,
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
