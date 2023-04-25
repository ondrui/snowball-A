<template>
  <div class="home-page">
    <div v-if="!loading">Loading...</div>
    <template v-else>
      <TheHeader />
      <SectionOtherCities />
      <div class="page-wrapper">
        <div class="main">
          <BreadCrumbs />
          <SearchBar />
          <router-view></router-view>
        </div>
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
import SectionOtherCities from "@/components/SectionOtherCities.vue";
import TheAside from "@/components/TheAside.vue";
import TheHeader from "@/components/TheHeader.vue";
import HistoryAside from "@/components/HistoryAside.vue";
import SectionHistoryCities from "@/components/SectionHistoryCities.vue";
import ScrollTop from "@/components/ScrollTop.vue";

export default {
  name: "HomePage",
  components: {
    TheHeader,
    TheAside,
    SectionOtherCities,
    HistoryAside,
    SectionHistoryCities,
    ScrollTop,
  },
  data() {
    return {
      initialData: false,
    };
  },
  created() {
    this.changingСity();
    this.initialData = true;
  },
  watch: {
    $route() {
      this.changingСity();
    },
  },
  computed: {
    ...mapGetters(["loading"]),
  },
  methods: {
    changingСity() {
      const cityLS = localStorage.getItem("city");
      let city = "";
      if (this.$route.params.city) {
        city = this.$route.params.city;
      } else if (cityLS) {
        city = cityLS;
      } else {
        city = "yerevan";
      }
      if (!this.initialData) {
        this.$store.dispatch("setCity", city);
      } else {
        this.$store.commit("setCity", city);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.home-page {
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
