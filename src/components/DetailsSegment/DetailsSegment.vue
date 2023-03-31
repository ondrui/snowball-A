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
      <Transition>
        <div :class="['one', { too: isOpen(index) }]">
          <ContentDetailDay
            :datasetChart="tenDaysDetailsChart[`${index + 1}`]"
          />
        </div>
      </Transition>
    </div>
  </div>
</template>

<script>
import { languageExpressions } from "@/constants/locales";
import CardDetailDay from "./CardDetailDay.vue";
import ContentDetailDay from "./ContentDetailDay.vue";

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
    getLocales() {
      return this.$store.getters.getLocales;
    },
    tenDaysDetailsCard() {
      return this.$store.getters.tenDaysDetailsCard;
    },
    tenDaysDetailsChart() {
      return this.$store.getters.tenDaysDetailsChart;
    },
  },
  methods: {
    languageExpressions,
    /**
     * Устанавливаем фокус на выбранный элемент и скролим до него.
     */
    focus() {
      const index = this.tenDaysDetailsCard.findIndex((i) => i.isOpen === true);
      // if (index !== -1) this.$refs.item[index].focus();
      if (index !== -1)
        this.$refs.item[index].scrollIntoView({
          block: "center",
          behavior: "smooth",
        });
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
.one {
  opacity: 0;
  max-height: 0;
  overflow: hidden;
  transition: all 0.7s ease;
}
.too {
  max-height: 500px;
  opacity: 1;
}
.segment-title {
  padding: 20px 0 8px 26px;
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
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: all 0.7s ease;
}

.v-enter-to,
.v-leave {
  max-height: 500px;
}

.v-enter,
.v-leave-to {
  position: relative;
  opacity: 0;
  max-height: 0;
  overflow: hidden;
}
.open {
  // border: 2px solid #d2e7ff;
  box-shadow: 0 0 0 2px #d2e7ff;
  border-radius: 1px;
}
</style>
