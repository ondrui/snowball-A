<template>
  <header class="header">
    <div class="container">
      <router-link :to="pushNewURL()">
        <BaseIcon nameIcon="country-logo" pick="common" width="150" />
      </router-link>
      <div>
        <select name="locale" :value="getLocale" @change="changeLocaleHandler">
          <option value="ru">ru</option>
          <option value="en">en</option>
          <option value="am">am</option>
        </select>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters([
      "tenDaysTabTable",
      "getLocale",
      "getCitySelected",
      "getLocaleURL",
    ]),
  },
  methods: {
    changeLocaleHandler(e) {
      const value = e.target.value;
      this.$router
        .push({
          params: {
            lang: value === "ru" ? undefined : value,
            city: this.getCitySelected.name_en,
          },
        })
        .catch((er) => {
          new Error(er);
        });
    },
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
.header {
  display: flex;
  border-bottom: 1px solid rgba(160, 184, 212, 0.4);
  width: 100%;
  margin: 0 auto;
  margin-bottom: 36px;
  min-height: 56px;
  padding-top: 14px;
}
.container {
  display: flex;
  justify-content: space-between;
  max-width: $width-page-xl;
  margin: 0 auto;
  padding: 0 10px;
  width: 100%;
}
@media only screen and (max-width: $media-width-xl) {
  .container {
    max-width: $width-page-lg;
  }
}
</style>
