<template>
  <header class="header">
    <div class="container">
      <router-link to="/">
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
  // created() {
  //   this.$router
  //     .push({ name: "main", params: { locale: this.select } })
  //     .catch(() => {});
  // },
  watch: {
    select(value) {
      this.$router
        .push({
          path: `/${value}`,
        })
        .catch(() => {});
    },
  },
  computed: {
    ...mapGetters(["tenDaysTabTable", "getLocales"]),
  },
  methods: {
    /**
     * Возвращает строковые константы с учетом локали.
     */
    languageExpressions,
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
