<template>
  <div class="container">
    <div>
      <h1>404! Page Not Found!</h1>
      <h2>it seems you're in the wrong page</h2>
      <router-link :to="pushNewURL()">Перейти на главную</router-link>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  created() {
    axios.get(this.$route.path).catch((err) => console.log(err));
  },
  computed: {
    ...mapGetters(["getLocaleURL", "getCitySelected"]),
  },
  methods: {
    pushNewURL() {
      return {
        name: "main",
        params: {
          lang: this.getLocaleURL,
          city: this.getCitySelected.name_en,
        },
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  & h2 {
    margin-bottom: 20px;
  }
}
</style>
