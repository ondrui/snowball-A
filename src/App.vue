<template>
  <div id="app">
    <TheHeader class="header" />
    <SectionOtherCities class="section" />
    <!-- route outlet -->
    <!-- component matched by the route will render here -->
    <router-view class="main"></router-view>
    <TheAside class="sidebar" />
  </div>
</template>

<script>
import SectionOtherCities from "./components/SectionOtherCities.vue";
import TheAside from "./components/TheAside.vue";
import TheHeader from "./components/TheHeader.vue";

export default {
  components: {
    TheHeader,
    TheAside,
    SectionOtherCities,
  },
  created() {
    this.getData();
  },
  methods: {
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
#app {
  display: grid;
  min-height: 100vh;
  grid-template-columns: 1fr 300px;
  grid-template-rows: 55px 100px 1fr;
  grid-template-areas:
    "header header"
    "section section"
    "content sidebar";
  column-gap: 14px;
  row-gap: 36px;
  scroll-behavior: smooth;
  max-width: 1142px;
  min-width: 420px;
  margin: 0 auto;
  padding: 16px 26px 70px 26px;
}
.header {
  grid-area: header;
}
.section {
  grid-area: section;
}
.sidebar {
  grid-area: sidebar;
}
.main {
  grid-area: content;
  max-width: 100%;
  min-width: 420px;
}
</style>
