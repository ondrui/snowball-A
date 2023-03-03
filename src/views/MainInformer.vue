<template>
  <div class="main-container">
    <div v-if="!loading">Loading...</div>
    <div v-else>
      <HeaderInformer />
      <TabsInformer />
      <DetailsSegment />
      <!-- <br /> -->
      <AllSVGIcons class="hidden" />
    </div>
  </div>
</template>

<script>
import HeaderInformer from "../components/Header/HeaderInformer.vue";
import TabsInformer from "../components/Tabs/TabsInformer.vue";
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
  margin: 0 auto;
  background-color: #ffffff;
  // width: 800px;
  max-width: 900px;
  min-width: 420px;
}
.hidden {
  display: none;
}
</style>
