<template>
  <header class="header">
    <div class="container">
      <BaseIcon name="country-logo" pick="common" width="150" />
    </div>
  </header>
</template>

<script>
import { languageExpressions } from "@/constants/locales";

export default {
  computed: {
    /**
     * Возвращает из store значения температур и другие данные для
     * таблицы и графика на вкладке "Прогноз погоды на 7-14 дней".
     */
    tenDaysTabTable() {
      return this.$store.getters.tenDaysTabTable;
    },
    /**
     * Возвращает языковую метку для определения локали.
     * @example "ru"
     */
    getLocales() {
      return this.$store.getters.getLocales;
    },
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
  border-bottom: 1px solid rgba(160, 184, 212, 0.4);
  width: 100%;
  margin: 0 auto;
  margin-bottom: 36px;
  min-height: 56px;
  padding-top: 14px;
}
.container {
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 10px;
  width: 100%;
}
@media only screen and (max-width: 940px) {
  .container {
    max-width: 750px;
  }
}
</style>
