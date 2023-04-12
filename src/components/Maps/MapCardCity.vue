<template>
  <router-link
    :to="{
      name: 'main',
      params: { city: datasetItem.name_en.toLowerCase() },
    }"
    class="card-link"
  >
    <div class="city-title">
      <span>{{ datasetItem.name_ru }}</span>
    </div>
    <div v-if="indicator === 'temp'" class="card-body-temp">
      <div class="icon-temp">
        <BaseIcon width="32" :nameIcon="datasetItem.condition" pick="light" />
      </div>
      <div class="value-temp">
        <span>{{ datasetItem.temp }}</span>
      </div>
    </div>
    <div v-if="indicator === 'wind'" class="card-body-wind">
      <div class="icon-wind">
        <BaseIcon
          width="10"
          nameIcon="wind-direction-blue"
          pick="common"
          :style="windDirection(getLocales, datasetItem.wind_dir)"
        />
      </div>
      <div class="value-wind">
        <span>{{ datasetItem.wind_descr }}</span>
      </div>
    </div>
  </router-link>
</template>

<script>
import { languageExpressions } from "@/constants/locales";
import { windDirection } from "@/constants/functions";

export default {
  props: {
    datasetItem: {
      type: Object,
      required: true,
    },
    indicator: {
      type: String,
      required: true,
    },
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
  },
  methods: {
    languageExpressions,
    windDirection,
  },
};
</script>

<style lang="scss" scoped>
.card-link {
  display: block;
  text-decoration: none;
  background-color: #ffffff;
  cursor: pointer;
  padding: 4px;
  border-radius: 3px;
  width: 100%;
  height: 100%;
  & .city-title {
    display: flex;
    justify-content: center;
    & span {
      font-weight: 400;
      font-size: 9px;
      line-height: 11px;
      text-align: center;
      text-transform: uppercase;
      color: #04569c;
    }
  }
  & .card-body-temp {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    & svg {
      display: block;
      width: 32px;
    }
    & .value-temp span {
      font-weight: 500;
      font-size: 15px;
      line-height: 18px;
      text-align: center;
      color: #333333;
    }
  }
  & .card-body-wind {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 4px;
    & svg {
      width: 10px;
      display: block;
    }
    & .value-wind span {
      font-weight: 500;
      font-size: 11px;
      line-height: 13px;
      text-align: center;
      color: #333333;
    }
  }
}
</style>
