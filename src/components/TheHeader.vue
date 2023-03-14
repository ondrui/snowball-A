<template>
  <header class="header"></header>
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
  box-shadow: inset 0 0 0 2px rgb(163, 192, 192);
}
</style>
