<template>
  <div class="segment-container">
    <h1 class="segment-title">
      {{ languageExpressions(getLocales, "detailsSegmentTitle").slice(0, 39)
      }}{{ tenDaysDetailsCard.length
      }}{{
        languageExpressions(getLocales, "detailsSegmentTitle").slice(38, 43)
      }}
    </h1>
    <div
      ref="item"
      :class="['wrapper-list', { open: isOpen(index) }]"
      v-for="(item, index) in tenDaysDetailsCard"
      :key="`s-${index}`"
      tabindex="0"
    >
      <CardDetailDay class="card" :value="item" :index="index" />
      <div :class="['chart-wrapper', { visible: isOpen(index) }]">
        <ContentDetailDay
          class="chart-content"
          :datasetChart="tenDaysDetailsChart[`${index + 1}`]"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { languageExpressions } from "@/constants/locales";
import CardDetailDay from "./CardDetailDay.vue";
import ContentDetailDay from "./ContentDetailDay.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    CardDetailDay,
    ContentDetailDay,
  },
  watch: {
    /**
     * Следим за изменениями в массиве с карточками - полем isOpen.
     */
    tenDaysDetailsCard() {
      setTimeout(this.focus, 700);
    },
  },
  computed: {
    ...mapGetters(["getLocales", "tenDaysDetailsCard", "tenDaysDetailsChart"]),
  },
  methods: {
    languageExpressions,
    /**
     * Устанавливаем фокус на выбранный элемент и скролим до него.
     */
    focus() {
      const index = this.tenDaysDetailsCard.findIndex((i) => i.isOpen === true);
      if (index !== -1) this.$refs.item[index].focus();
    },
    /**
     * Отображает график и рамку вокруг элемента если свойство isOpen равно true.
     */
    isOpen(index) {
      return this.tenDaysDetailsCard[index].isOpen === true;
    },
  },
};
</script>

<style lang="scss" scoped>
.chart-wrapper {
  display: grid;
  grid-template-rows: 0fr;
  overflow: hidden;
  transition: grid-template-rows 0.5s;
  &.visible {
    grid-template-rows: 1fr;
    & .chart-content {
      visibility: visible;
    }
  }
}
.chart-content {
  min-height: 0;
  transition: visibility 1s;
  visibility: hidden;
}
.segment-title {
  padding: 46px 0 8px 0;
  font-weight: 300;
  font-size: 20px;
  line-height: 23px;
  color: #333333;

  &::first-letter {
    text-transform: capitalize;
  }
}
.wrapper-list {
  position: relative;
  margin-top: 12px;
}
.card {
  transition: box-shadow 0.3s ease-in-out;
  cursor: pointer;
  will-change: max-height;
}
.card:hover {
  box-shadow: 0 0 0 2px #d2e7ff;
  border-radius: 1px;
}
.open {
  // border: 2px solid #d2e7ff;
  box-shadow: 0 0 0 2px #d2e7ff;
  border-radius: 1px;
}
</style>
