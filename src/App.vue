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
      <router-link
        v-scroll="handleScroll"
        v-show="isVisible"
        to="#top"
        class="top-of-site-link"
      >
        <BaseIcon width="10" nameIcon="chevron-scroll-left" pick="common" />
      </router-link>
    </template>
  </div>
</template>

<script>
import SectionOtherCities from "./components/SectionOtherCities.vue";
import TheAside from "./components/TheAside.vue";
import TheHeader from "./components/TheHeader.vue";
import HistoryAside from "./components/HistoryAside.vue";
import { languageExpressions } from "@/constants/locales";
import SectionHistoryCities from "./components/SectionHistoryCities.vue";

export default {
  components: {
    TheHeader,
    TheAside,
    SectionOtherCities,
    HistoryAside,
    SectionHistoryCities,
  },
  data() {
    return {
      isVisible: false,
    };
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
     * Обработчик
     */
    handleScroll(evt, el) {
      let coordinateY = window.scrollY;
      if (coordinateY >= 100) {
        el.style.cssText = `
        opacity: 1;
        `;
      } else {
        el.style.cssText = `
        opacity: 0;
        transform: translateX(60px);
        `;
      }
    },
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
  column-gap: 48px;
  row-gap: 36px;
  max-width: $width-page-xl;
  padding: 0 10px;
  width: 100%;
  scroll-behavior: smooth;
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
.top-of-site-link {
  opacity: 0;
  position: fixed;
  right: 15vw;
  bottom: 3vw;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
  pointer-events: auto;
  background-color: #dbeaf4;
  box-shadow: 0 0 10px 10px white;
  border-radius: 50px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  touch-action: manipulation;
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
  & svg {
    transform: rotate(90deg);
  }
  &:hover {
    background-color: #a6d3f1;
  }
  &:active {
    background-color: #76bff0;
  }
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
  .top-of-site-link {
    right: 9vw;
    bottom: 9vw;
  }
}
</style>
