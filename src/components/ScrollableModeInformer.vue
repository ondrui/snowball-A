<template>
  <div class="container">
    <div v-show="isButtons" class="scroll-button-container">
      <button :class="['btn', { hidden: side.left }]" @click="scroll('left')">
        <BaseIcon width="7" name="chevron-scroll-left" pick="common" />
      </button>
      <button :class="['btn', { hidden: side.right }]" @click="scroll('right')">
        <BaseIcon width="7" name="chevron-scroll-right" pick="common" />
      </button>
    </div>
    <RowCaptionInformer class="wind">
      {{ languageExpressions(getLocales, "climateIndicators", "windDirSpeed") }}
    </RowCaptionInformer>
    <RowCaptionInformer class="pressure">
      {{ languageExpressions(getLocales, "climateIndicators", "pressure") }},
      {{ languageExpressions(getLocales, "units", "pressure")[0] }}
    </RowCaptionInformer>
    <RowCaptionInformer class="humidity">
      {{ languageExpressions(getLocales, "climateIndicators", "humidity") }}
    </RowCaptionInformer>
    <div class="swiper-container" ref="swiper-container">
      <DragScrolling />
      <div
        :class="{ grab: isGrabCursor, grabbing: dragMouseScroll.isDown }"
        @mousedown.prevent="mouseDown"
        @mouseleave="mouseLeave"
        @mouseup="mouseUp"
        @mousemove.prevent="mouseMove"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import RowCaptionInformer from "@/components/RowCaptionInformer.vue";
import { languageExpressions } from "@/constants/locales";
import DragScrolling from "./DragScrolling.vue";
import dragScrolling from "@/mixins/drag-scrolling";

export default {
  mixins: [dragScrolling],
  components: {
    RowCaptionInformer,
    DragScrolling,
  },
  props: {
    labelCoordinates: {
      type: Object,
      required: true,
    },
    isGrabCursor: {
      type: Boolean,
    },
  },
  data() {
    return {
      clientWidth: 0,
      scrollWidth: 0,
      firstItem: null,
      lastItem: null,
      /**
       * Отвечает за скрытие кнопок скролла графика.
       */
      side: {
        left: true,
        right: false,
      },
      /**
       * Объект-наблюдатель за пересечением элемента который содержит график с боковыми
       * границами графика.
       */
      observer: null,
      /**
       * Объект со свойствами отвечающие за перемещение графика с помощью
       * мыши.
       */
      dragMouseScroll: {
        isDown: false,
        startX: 0,
        scrollLeft: 0,
      },
      /**
       * Объект со свойствами отвечающие за кинетический (инерционный) скроллинг.
       */
      momentum: {
        velX: 0,
        momentumID: null,
      },
    };
  },
  mounted() {
    this.elemNameScroll = "swiper-container";
    /**
     * Создаем объект-наблюдатель и задаем целевые наблюдаемые элементы.
     */
    this.observer = new IntersectionObserver(this.observerCallback, {
      root: this.$refs[this.elemNameScroll],
      threshold: 0.99,
    });
    const coolElement = document.querySelectorAll(".item");
    this.firstItem = [...coolElement][0];
    this.lastItem = [...coolElement].at(-1);
    this.observer.observe(this.firstItem);
    this.observer.observe(this.lastItem);
    /**
     * После монтирования компоненты вызываем функцию обработчик, которая
     * отвечает за вычисление и установку следующих значений поля data:
     * width и height.
     */
    this.resizeBrowserHandler();
    /**
     * Устанавливаем оброботчик на событие resize, которое срабатывает при
     * изменении размера окна. Функция обработчик описана выше.
     */
    window.addEventListener("resize", this.resizeBrowserHandler);
  },
  beforeDestroy() {
    /**
     * Отключаем объект-наблюдатель.
     */
    this.observer.disconnect();
    /**
     * Удаляем оброботчик на событие resize когда компонент размонтирован.
     */
    window.removeEventListener("resize", this.resizeBrowserHandler);
  },
  computed: {
    /**
     * Возвращает языковую метку.
     * @example
     * "ru"
     */
    getLocales() {
      return this.$store.getters.getLocales;
    },
    isButtons() {
      return this.scrollWidth > this.clientWidth;
    },
  },
  methods: {
    languageExpressions,
    /**
     * Колбэк-функция вызывается при пересечении элемента, который содержит
     * график с боковыми границами графика.
     * @param entry Объект описывает пересечение между целевым элементом
     * и его корневым контейнером в определенный момент перехода.
     */
    observerCallback([entry]) {
      if (entry.isIntersecting && entry.target === this.firstItem) {
        this.side.left = true;
      } else if (!entry.isIntersecting && entry.target === this.lastItem) {
        this.side.right = false;
      } else if (entry.isIntersecting && entry.target === this.lastItem) {
        this.side.right = true;
      } else {
        this.side.left = false;
        this.side.right = false;
      }
    },
    /**
     * Возвращает количество пикселей, на которое необходимо прокрутить график.
     */
    scrollSize() {
      return this.firstItem.clientWidth * 3;
    },
    /**
     * Функция отвечает за прокручивание графика.
     * @param direction В параметр передается строка со стороной,
     * в которую нужно сдвинуть график.
     */
    scroll(direction) {
      const num = this.scrollSize();
      this.$refs[this.elemNameScroll].scrollBy({
        left: direction === "right" ? num : -num,
        behavior: "smooth",
      });
    },
    /**
     * Функция обработчик вызывается, когда изменяется размер окна страницы.
     */
    resizeBrowserHandler() {
      /**
       * Определяет и устанавливает требуемые для
       */
      const elem = this.$refs[this.elemNameScroll];
      this.clientWidth = Math.round(elem.clientWidth);
      this.scrollWidth = Math.round(elem.scrollWidth);
    },
    /**
     * Блок функций, отвечающий за реализацию кинетического скроллинга
     * при помощи мыши.
     */
    // mouseDown(event) {
    //   this.dragMouseScroll.isDown = true;
    //   this.dragMouseScroll.startX =
    //     event.pageX - this.$refs["swiper-container"].offsetLeft;
    //   this.dragMouseScroll.scrollLeft =
    //     this.$refs["swiper-container"].scrollLeft;
    //   this.cancelMomentumTracking();
    // },
    // mouseLeave() {
    //   this.dragMouseScroll.isDown = false;
    // },
    // mouseUp() {
    //   this.dragMouseScroll.isDown = false;
    //   this.beginMomentumTracking();
    // },
    // mouseMove(event) {
    //   if (!this.dragMouseScroll.isDown) return;
    //   const x = event.pageX - this.$refs["swiper-container"].offsetLeft;
    //   const walk = x - this.dragMouseScroll.startX;
    //   let prevScrollLeft = this.$refs["swiper-container"].scrollLeft;
    //   this.$refs["swiper-container"].scrollLeft =
    //     this.dragMouseScroll.scrollLeft - walk;
    //   this.momentum.velX =
    //     this.$refs["swiper-container"].scrollLeft - prevScrollLeft;
    // },
    // beginMomentumTracking() {
    //   this.cancelMomentumTracking();
    //   this.momentummomentumID = requestAnimationFrame(this.momentumLoop);
    // },
    // cancelMomentumTracking() {
    //   cancelAnimationFrame(this.momentum.momentumID);
    // },
    // momentumLoop() {
    //   if (this.$refs["swiper-container"]) {
    //     this.$refs["swiper-container"].scrollLeft += this.momentum.velX * 2;
    //     this.momentum.velX *= 0.95;
    //     if (Math.abs(this.momentum.velX) > 0.5) {
    //       this.momentum.momentumID = requestAnimationFrame(this.momentumLoop);
    //     }
    //   }
    // },
  },
};
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  background-color: #ffffff;
  border: 1px solid #d8e9f3;
}
.scroll-button-container {
  position: absolute;
  top: calc(50% - 18px);
  left: 18px;
  width: calc(100% - 36px);
  display: flex;
  justify-content: space-between;
  & .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 20;
    visibility: visible;
    pointer-events: auto;
    background-color: rgba(29, 125, 188, 0.08);
    border: none;
    border-radius: 50px;
    cursor: pointer;
    width: 36px;
    height: 36px;
    touch-action: manipulation;
    transition: all 0.5s;

    & svg {
      transition: transform 0.5s;
    }

    &:hover {
      background-color: rgba(29, 125, 188, 0.16);

      & svg {
        transform: scale(1.4);
      }
    }

    &:active {
      background-color: rgba(29, 125, 188, 0.24);
    }

    &.hidden {
      visibility: hidden;
      opacity: 0;
      cursor: auto;
      transition: all 0.5s;
    }
  }
}
.wind {
  top: v-bind("labelCoordinates.wind");
}
.pressure {
  top: v-bind("labelCoordinates.pressure");
}
.humidity {
  top: v-bind("labelCoordinates.humidity");
}
.swiper-container {
  display: flex;
  max-width: 100%;
  overflow-y: hidden;
  overflow-x: auto;
  position: relative;
}
.grab {
  cursor: grab;
  &.grabbing {
    cursor: grabbing;
  }
}
</style>
};
