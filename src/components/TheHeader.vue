<template>
  <header class="header">
    <div class="container">
      <router-link :to="pushNewURL()">
        <BaseIcon nameIcon="country-logo" pick="common" width="150" />
      </router-link>
      <div>
        <select name="locale" v-model="select">
          <option value="ru">ru</option>
          <option value="en">en</option>
          <option value="am">am</option>
        </select>
      </div>
    </div>
  </header>
</template>

<script>
import { languageExpressions } from "@/constants/locales";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      select: "ru",
    };
  },
  created() {
    this.select = this.getLocales;
  },
  watch: {
    select(value) {
      this.changeLocaleHandler(value);
    },
  },
  computed: {
    ...mapGetters([
      "tenDaysTabTable",
      "getLocales",
      "getCitySelected",
      "getLocalesURL",
    ]),
  },
  methods: {
    /**
     * Возвращает строковые константы с учетом локали.
     */
    languageExpressions,
    changeLocaleHandler(value) {
      this.$router
        .push({
          params: {
            lang: value === "ru" ? undefined : value,
            city: this.getCitySelected.name_en,
          },
        })
        .catch(() => {});
    },
    pushNewURL() {
      return {
        name: "main",
        params: {
          lang: this.getLocalesURL === "ru" ? undefined : this.getLocalesURL,
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
