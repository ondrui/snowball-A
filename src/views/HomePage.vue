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
  // beforeRouteEnter(to, from, next) {
  //   console.log("to", to);
  //   console.log("from", from);
  //   console.log(Vue);
  //   // this.$store.commit("setCity", to.city);
  //   // this.init();
  //   // next((vm) => vm.$route.push({ name: "not-found" }));
  //   // getPost(to.params.id, (err, post) => {
  //   //   next(vm => vm.setData(err, post))
  //   // })
  // },
  created() {
    this.init();
  },
  watch: {
    $route(to, from) {
      console.log("to", to);
      console.log("from", from);
    },
  },
  // watch: {
  //   "$route.params"(to, from) {
  //     console.log("to", to);
  //     console.log("from", from);
  //     // if (!to.city || !to.locale) return;
  //     if (to.city !== from.city && to.city) {
  //       console.log("city");
  //       this.$store.commit("setCity", to.city);
  //       localStorage.setItem("cities", JSON.stringify(to));
  //     }
  //     if (to.locale !== from.locale && to.locale) {
  //       console.log("locale");
  //       this.$store.commit("setLocale", to.locale);
  //       localStorage.setItem("cities", JSON.stringify(to));
  //     }
  //   },
  // },
  computed: {
    ...mapGetters(["loading"]),
  },
  methods: {
    init() {
      console.log("init home page");
      const cities = JSON.parse(localStorage.getItem("cities"));
      // const city = this.$route.params.city
      //   ? this.$route.params.city
      //   : cities && cities.city
      //   ? cities.city
      //   : "yerevan";
      // set default city;
      let city = "";
      if (this.$route.params.city) {
        city = this.$route.params.city;
        // const initValue = {
        //   city,
        //   locale: "ru",
        // };
        // localStorage.setItem("cities", JSON.stringify(initValue));
      } else if (cities && cities.city) {
        city = cities.city;
      } else {
        city = "yerevan";
        localStorage.setItem(
          "cities",
          JSON.stringify({
            city: "yerevan",
            locale: "ru",
          })
        );
      }
      if (!this.initialData) {
        console.log(this.$route);
        console.log("url", this.$route.params.city);
        console.log("localStorage", cities);
        console.log("city", city);
        this.$store.dispatch("setCity", city);
        // this.initialData = true;
      } else {
        return;
      }
      // const cities = JSON.parse(localStorage.getItem("cities"));
      // if (!cities || !cities.city || !cities.locale) {
      //   const initValue = {
      //     city: "yerevan",
      //     locale: "ru",
      //     tab: "main",
      //   };
      // this.$store.dispatch("setCity", initValue.city);
      //   this.$store.commit("setLocale", initValue.locale);
      //   localStorage.setItem("cities", JSON.stringify(initValue));
      //   // this.$router.push({ name: "main", params: initValue }).catch(() => {});
      // } else {
      //   const value = JSON.parse(localStorage.getItem("cities"));
      //   this.$store.dispatch("setCity", value.city);
      //   this.$store.commit("setLocale", value.locale);
      // this.$router.push({ name: "main", params: value }).catch(() => {});
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
