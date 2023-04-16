<template>
  <div class="segment-container">
    <h1 class="segment-title">
      {{ segmentTitle }}
    </h1>
    <div
      ref="item"
      :class="['wrapper-list', { open: activeIndex === index }]"
      v-for="(item, index) in tenDaysDetailsCard"
      :key="`s-${index}`"
      tabindex="0"
    >
      <CardDetailDay class="card" :value="item" :index="index" />
      <div :class="['chart-wrapper', { visible: activeIndex === index }]">
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
import { cityIn } from "lvovich";

export default {
  components: {
    CardDetailDay,
    ContentDetailDay,
  },
  data() {
    return {
      locale: "",
    };
  },
  created() {
    this.locale = this.getLocales;
  },
  watch: {
    /**
     * Следим за изменениями в массиве с карточками - полем isOpen.
     */
    tenDaysDetailsCard(newVal, old) {
      console.log("watch old", old);
      console.log("watch new", newVal);
      if (newVal && this.locale === this.getLocales)
        setTimeout(this.focus, 500);
    },
  },
  computed: {
    ...mapGetters([
      "getLocales",
      "tenDaysDetailsCard",
      "tenDaysDetailsChart",
      "getCitySelected",
    ]),
    inflectCityName() {
      return cityIn(this.getCitySelected.name_loc);
    },
    segmentTitle() {
      const str = this.languageExpressions(
        this.getLocales,
        "detailsSegmentTitle"
      )
        .replace("$", this.inflectCityName)
        .replace("$", this.tenDaysDetailsCard.length);
      return str;
    },
    activeIndex() {
      const index = this.tenDaysDetailsCard.findIndex((i) => i.isOpen === true);
      return index;
    },
  },
  methods: {
    languageExpressions,
    /**
     * Устанавливаем фокус на выбранный элемент и скролим до него.
     */
    focus() {
      const index = this.tenDaysDetailsCard.findIndex((i) => i.isOpen === true);
      if (index !== -1) {
        this.$refs.item[index].scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      }
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
  transition: grid-template-rows 0.4s;
  &.visible {
    grid-template-rows: 1fr;
    & .chart-content {
      visibility: visible;
    }
  }
}
.chart-content {
  min-height: 0;
  transition: visibility 0.4s;
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
