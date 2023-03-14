<template>
  <div class="swiper-content">
    <div class="hourly-charts-temp">
      <ChartHourlyTempList :datasets="datasetsForHourlyCharts" />
    </div>
    <div
      class="date-container"
      v-for="(date, indexParent) in hourlyTabTable"
      :key="`d-${indexParent}`"
    >
      <div class="day-length-chart">
        <DayLengthChart :datasets="date" />
      </div>
      <div class="date-header">
        <div class="date-text">
          <span
            ><b>{{ date.date[0] }}</b></span
          >
          <span>&nbsp; {{ date.date[1] }}</span>
        </div>
      </div>
      <div class="hourly-data-container">
        <div
          class="item"
          v-for="(value, index) in date.values"
          :key="`h-${index}`"
        >
          <div class="time">{{ value.hour }}</div>
          <div class="day-length"></div>
          <div class="hourly-icon">
            <BaseIcon width="34" :name="value.condition" :pick="value.light" />
          </div>
          <div class="hourly-temp-item"></div>
          <div class="hourly-wind-descr">
            <div>
              <div>
                <BaseIcon
                  width="8"
                  name="wind-direction-blue"
                  pick="common"
                  :style="windDirection(getLocales, value)"
                />
              </div>
              <span>{{ value.wind_dir[1] }}</span>
            </div>
            <div>{{ value.wind_speed }}</div>
          </div>
          <div class="hourly-pressure">
            {{ value.pressure }}
          </div>
          <div class="hourly-day-humidity">
            {{ value.humidity }}{{ value.humidity.unit }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChartHourlyTempList from "@/components/SVGCharts/hourly/ChartHourlyTempList.vue";
import DayLengthChart from "@/components/SVGCharts/hourly/DayLengthChart.vue";
import { languageExpressions } from "@/constants/locales";
import { windDirection } from "@/constants/functions";

export default {
  components: {
    ChartHourlyTempList,
    DayLengthChart,
  },
  computed: {
    /**
     * Возвращает объект данных для отображения графиков подробного
     * почасового прогноза с разбивкой на часовые интервалы.

     */
    datasetsForHourlyCharts() {
      return this.$store.getters.datasetsForHourlyCharts;
    },
    /**
     * Возвращает данные для отображения таблицы подробного
     * почасового прогноза с разбивкой на часовые интервалы.
     */
    hourlyTabTable() {
      return this.$store.getters.hourlyTabTable;
    },
    /**
     * Возвращает языковую метку.
     * @example
     * "ru"
     */
    getLocales() {
      return this.$store.getters.getLocales;
    },
  },
  methods: {
    languageExpressions,
    windDirection,
  },
};
</script>

<style lang="scss" scoped>
.swiper-container {
  display: flex;
  max-width: 100%;
  overflow-y: hidden;
  overflow-x: auto;
  position: relative;
}
.swiper-content {
  display: flex;
  position: relative;
  cursor: grab;

  &.grabbing {
    cursor: grabbing;
  }
}
.date-container {
  position: relative;
  display: flex;
  flex-direction: column;
  border-right: 2px solid #d8e9f3;
}
.date-text {
  position: sticky;
  left: 0;
  top: 0;
  display: inline;
  padding: 0 13px;
}
.date-header {
  white-space: nowrap;
  padding: 9px 0;
  font-weight: 300;
  font-size: 12px;
  line-height: 16px;
  color: #333333;

  &::first-letter {
    text-transform: capitalize;
  }
}
.date-container:last-child .date-header {
  border-right: none;
}
.hourly-data-container {
  display: flex;

  & .item {
    border-top: 1px solid #d8e9f3;
    border-bottom: 1px solid #d8e9f3;
    border-right: 1px solid #d8e9f3;

    &:last-child {
      border-right: none;
    }
    width: 56px;
    & > div {
      border-bottom: 1px solid #d8e9f3;
      position: relative;

      &:last-child,
      &:nth-child(2),
      &:nth-child(3) {
        border-bottom: none;
      }
    }
  }
}
.date-container:last-child,
.date-container:last-child .item:last-child {
  border-right: none;
}
.date-container .item:first-child {
  border-left: none;
}
.time {
  height: 33px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 300;
  font-size: 12px;
  line-height: 16px;
  color: #333333;
}
.day-length {
  height: 30px;
}
.hourly-temp-item {
  height: 180px;
}
.hourly-icon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 60px;
  align-items: center;
}
.hourly-charts-temp {
  position: absolute;
  top: 146px;
  width: 100%;
  height: 170px;
  z-index: 10;
}
.day-length-chart {
  position: absolute;
  top: 68px;
  width: 100%;
  height: 30px;
  z-index: 10;
}
.hourly-wind-descr {
  height: 53px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
.hourly-pressure,
.hourly-day-humidity {
  height: 36px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 300;
  font-size: 12px;
  line-height: 14px;
  color: #333333;
}
</style>
