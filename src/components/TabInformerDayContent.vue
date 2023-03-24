<template>
  <div class="swiper-content">
    <div
      @mousedown="isMove"
      @mouseup="toggle(index, $event)"
      :class="['item', { 'days-weekend': day.weekend === true }]"
      v-for="(day, index) in tenDaysTabTable"
      :key="`d-${index}`"
    >
      <div class="days-weekday">
        <div>{{ day.weekday }}</div>
        <div>{{ day.date }}</div>
      </div>
      <div class="days-icon">
        <BaseIcon width="100%" :nameIcon="day.condition" pick="light" />
      </div>
      <div class="days-temp-item"></div>
      <div class="days-wind-descr">
        <div>
          <div>
            <BaseIcon
              width="8"
              nameIcon="wind-direction-blue"
              pick="common"
              :style="windDirection(getLocales, day.wind)"
            />
          </div>
          <span>{{ day.wind.wind_dir[1] }}</span>
        </div>
        <div>{{ day.wind.value }} {{ day.wind.unit }}</div>
      </div>
      <div class="days-pressure">
        {{ day.pressure.value }}
      </div>
      <div class="ten-day-humidity">
        {{ day.humidity.value }}{{ day.humidity.unit }}
      </div>
      <div class="days-chevron-down">
        <BaseIcon width="7" nameIcon="chevron-more-down" pick="common" />
      </div>
    </div>
    <div class="days-charts-temp">
      <ChartsDayList />
    </div>
  </div>
</template>

<script>
import ChartsDayList from "@/components/SVGCharts/day/ChartsDayList.vue";
import { languageExpressions } from "@/constants/locales";
import { windDirection } from "@/constants/functions";

export default {
  components: {
    ChartsDayList,
  },
  data() {
    return {
      /**
       * Сохраняем в переменную значение координаты Х мышки при нажатии на элемент.
       */
      mouseStartX: 0,
    };
  },
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
    /**
     * Возвращает команду поворота иконки ветра в соответствие с направлением ветра.
     */
    windDirection,
    /**
     * Обработчик вызывается когда нажали кнопку мыши на элементе.
     * Сохраняем в переменную значение координаты Х.
     * @param event Объект события.
     */
    isMove(event) {
      this.mouseStartX = event.x;
    },
    /**
     * Обработчик для перехода по клику на выбранный день.
     * @param index Порядковый намер (код) выбранного дня для перехода к карточке и
     * графику с подробным прогнозом.
     * @param event Объект события.
     */
    toggle(index, event) {
      /**
       * Обработчик вызывается когда отжали кнопку мыши на элементе.
       * Сначала проверяем не произошло ли изменение координаты Х мыши после нажатия на
       * элемент. Если координата изменилась, то выходим из функции.
       * Если выбран текущий день переходим на вкладку с часовым прогнозом. В остальных случаях
       * переходим  к карточке и графику с подробным прогнозом выбранного дня,
       * путем изменения значения флага isOpen в сторе store.state.datasetsTenDays.
       */
      if (this.mouseStartX !== event.x) return;
      if (index === 0) {
        this.$router.push({ name: "hourly" });
      } else {
        this.$store.dispatch("index", index);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.swiper-container {
  display: flex;
  max-width: 100%;
  overflow-y: hidden;
  overflow-x: auto;
}
.swiper-content {
  flex: 1 0;
  position: relative;
  display: flex;
  background-color: #ffffff;
  .days-weekend {
    background-color: #f7fafd;

    & .days-weekday > div:first-child {
      color: #ff1616;
    }
  }
  & .item {
    position: relative;
    flex: 1 0;
    min-width: 50px;
    transition: box-shadow 0.5s ease-in-out;
    border-bottom: 1px solid #d8e9f3;
    border-right: 1px solid #d8e9f3;

    &:nth-last-child(2) {
      border-right: none;
    }

    &:nth-child(n + 12) {
      cursor: auto;
    }

    &:nth-child(n + 12) .days-chevron-down svg {
      display: none;
    }

    &::before {
      position: absolute;
      content: "";
      transition: box-shadow 0.3s ease-in-out;
      height: 100%;
      width: 100%;
      z-index: 10;
    }

    & > div {
      border-bottom: 1px solid #d8e9f3;
      position: relative;

      &:last-child,
      &:nth-child(2) {
        border-bottom: none;
      }
    }
  }
}
@media (hover: hover) and (pointer: fine) {
  .item:nth-child(-n + 11):hover::before {
    box-shadow: inset 0 0 0 3px #d2e7ff;
    border-radius: 1px;
  }

  .item:nth-child(-n + 11):hover {
    cursor: pointer;
    & .days-chevron-down svg {
      transform: scale(2);
    }
  }
}
.days-temp-item {
  height: 170px;
}
.days-weekday {
  height: 64px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 300;
  font-size: 12px;
  line-height: 16px;
}
.days-weekday > div {
  text-align: center;
}
.days-weekday > div:first-child {
  text-transform: uppercase;
  font-size: 16px;
  line-height: 21px;
}
.days-icon {
  margin: 0 auto;
  height: 65px;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.days-charts-temp {
  height: 170px;
  position: absolute;
  top: 123px;
  width: 100%;
  // z-index: 10;
  cursor: pointer;
}
.days-wind-descr {
  height: 53px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 300;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  color: #333333;

  & span {
    text-transform: uppercase;
    padding-left: 1px;
  }

  & > div:first-child {
    display: flex;
    column-gap: 3px;
  }
}
.days-pressure,
.ten-day-humidity {
  height: 36px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 300;
  font-size: 12px;
  line-height: 14px;
  color: #333333;
}
.days-chevron-down {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 22px;

  & svg {
    transition: transform 0.3s ease-in-out;
  }
}
</style>
