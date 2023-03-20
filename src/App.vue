<template>
  <div id="app">
    <div v-if="!loading">Loading...</div>
    <template v-else>
      <TheHeader />
      <SectionOtherCities class="section" />
      <div class="page-wrapper">
        <!-- route outlet -->
        <!-- component matched by the route will render here -->
        <router-view class="main"></router-view>
        <TheAside class="sidebar" />
      </div>
    </template>
  </div>
</template>

<script>
import SectionOtherCities from "./components/SectionOtherCities.vue";
import TheAside from "./components/TheAside.vue";
import TheHeader from "./components/TheHeader.vue";
import { languageExpressions } from "@/constants/locales";

export default {
  components: {
    TheHeader,
    TheAside,
    SectionOtherCities,
  },
  created() {
    this.getData();
  },
  computed: {
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
    /**
     * Get data from Internal vs External APIs.
     */
    async getData() {
      try {
        const res = await Promise.all([
          fetch("/forecast.json"),
          fetch("/forecastFromAPI.json"),
        ]);
        const [a, b] = res.map((e) => e.json());
        const total = await a;
        const data = await b;
        setTimeout(() => {
          this.$store.commit("setData", total);
          this.$store.commit("setDataAPI", data);
        }, 300);
      } catch (error) {
        this.answer = "Error! Could not reach the API. " + error;
      }
    },
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  /** styling scrollbar component*/

  &::-webkit-scrollbar {
    width: 4px;
    height: 5px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    border: 4px solid #cfd6e4;
    background: #cfd6e4;
  }
  & {
    scrollbar-width: thin;
  }
}
// *::-webkit-scrollbar {
//   width: 4px;
// }
// *::-webkit-scrollbar-thumb {
//   border-radius: 10px;
//   background: #cfd6e4;
// }
a {
  text-decoration: none;
}
.page-wrapper {
  display: grid;
  min-height: 100vh;
  grid-template-columns: minmax(0, 1fr) 300px;
  grid-template-areas: "content sidebar";
  column-gap: 14px;
  row-gap: 36px;
  max-width: 1140px;
  padding: 0 10px;
  width: 100%;
  scroll-behavior: smooth;
  min-width: 390px;
  margin: 0 auto;
  margin-bottom: 40px;
}
.sidebar {
  grid-area: sidebar;
}
.main {
  grid-area: content;
  max-width: 100%;
  min-width: 390px;
}
@media only screen and (max-width: 940px) {
  .page-wrapper {
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas:
      "content"
      "sidebar";
    max-width: 750px;
  }
  .sidebar {
    min-height: 200px;
  }
}
</style>
