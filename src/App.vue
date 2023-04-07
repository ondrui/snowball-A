<template>
  <div id="app">
    <div v-if="!loading">Loading...</div>
    <template v-else>
      <TheHeader />
      <SectionOtherCities />
      <div class="page-wrapper">
        <!-- route outlet -->
        <!-- component matched by the route will render here -->
        <router-view class="main"></router-view>
        <TheAside class="sidebar">
          <HistoryAside />
        </TheAside>
      </div>
      <SectionHistoryCities class="middle-section" />
      <HistoryAside class="mob-section" />
      <ScrollTop />
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { languageExpressions } from "@/constants/locales";
import SectionOtherCities from "./components/SectionOtherCities.vue";
import TheAside from "./components/TheAside.vue";
import TheHeader from "./components/TheHeader.vue";
import HistoryAside from "./components/HistoryAside.vue";
import SectionHistoryCities from "./components/SectionHistoryCities.vue";
import ScrollTop from "./components/ScrollTop.vue";

export default {
  name: "App",
  components: {
    TheHeader,
    TheAside,
    SectionOtherCities,
    HistoryAside,
    SectionHistoryCities,
    ScrollTop,
  },
  created() {
    this.getData();
    const city = JSON.parse(localStorage.getItem("cities")).default;
    if (city) this.$store.commit("setCity", city);
  },
  watch: {
    "$route.params"(to) {
      if (!to.name) return;
      this.$store.commit("setCity", to.name);
      localStorage.setItem("cities", JSON.stringify({ default: to.name }));
    },
  },
  computed: {
    ...mapGetters(["getLocales", "loading"]),
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
          fetch("/cities_all.json"),
        ]);
        const [a, b, c] = res.map((e) => e.json());
        const total = await a;
        const data = await b;
        const cities = await c;
        setTimeout(() => {
          this.$store.commit("setData", total);
          this.$store.commit("setDataAPI", data);
          this.$store.commit("setListCities", cities);
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
/*
focus
 */
*:focus {
  outline: 2px solid $color-filter-font-focus;
}
/* Hide focus styles if they're not needed, for example,
when an element receives focus via the mouse. */
*:focus:not(:focus-visible) {
  outline: none;
}

/* Show focus styles on keyboard focus. */
*:focus-visible {
  outline: 2px solid $color-filter-font-focus;
}
html {
  scroll-behavior: smooth;
}
a {
  text-decoration: none;
}
#app {
  position: relative;
}
.page-wrapper {
  display: grid;
  min-height: 100vh;
  grid-template-columns: minmax(0, 1fr) 300px;
  column-gap: 48px;
  row-gap: 36px;
  max-width: $width-page-xl;
  padding: 0 10px;
  width: 100%;
  min-width: 390px;
  margin: 0 auto;
  margin-bottom: 40px;
}
.main {
  max-width: 100%;
  min-width: 390px;
}
.mob-section,
.middle-section {
  display: none;
  margin-bottom: 50px;
}
@media only screen and (max-width: $media-width-xl) {
  .page-wrapper,
  .app-container {
    display: block;
    max-width: $width-page-lg;
    .sidebar {
      display: none;
    }
  }
  .middle-section {
    display: block;
  }
}
@media only screen and (max-width: $media-width-sm) {
  .mob-section {
    display: block;
    padding: 0 10px;
  }
  .middle-section {
    display: none;
  }
}
</style>
