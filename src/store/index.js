import Vue from "vue";
import Vuex from "vuex";
/**
 * @func languageExpressions Функция возвращает зодонную порометрами языковую константу.
 */
import { languageExpressions } from "@/constants/locales";
/**
 * Вспомогательные функции:
 * @func setTimeFormat Возвращает в заданном формате время, доту.
 * @func daytime Возвращает долготу дня в часах и минутах.
 * @func addPlus Добовляет знак +, если значение парометра больше нуля.
 */
import { setTimeFormat, daytime, addPlus } from "@/constants/functions";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    /**
     * Свойство определяет языковую локаль. Значение по умолчанию "ru".
     */
    locales: "ru",
    /**
     * Объект с фактическими погодными данными, которые приходят с сервера.
     */
    datasetsFact: {},
    /**
     * Объект с данными для отображения почасового прогноза.
     */
    datasetsHourly: {},
    /**
     * Объект с данными для отображения прогноза на 10-14 дней.
     */
    datasetsTenDays: {},
    /**
     * Объект с данными для отображения подробного прогноза на 10 дней с
     * разбивкой по 3 часа.
     */
    datasetsThreeHour: {},
    /**
     * Данные со стороннего API.
     */
    dataFromAPI: {},
    /**
     * Настройки для отображения температурных графиков, а также
     * корректировки и выравнивания прогнозных и фактических
     * данных.
     * @property periodAdjusted - количество интервалов в которые будут
     * внесены корректировки.
     * @property func - функция согласно которой будут корректироваться
     * данные.
     */
    chartSettings: [
      {
        title: "linear_0",
        periodAdjusted: 0,
        func: (periodAdjusted, diffTime, index) =>
          (periodAdjusted - diffTime - index - 1) / (periodAdjusted - 1),
      },
      {
        title: "linear_6",
        periodAdjusted: 6,
        func: (periodAdjusted, diffTime, index) =>
          (periodAdjusted - diffTime - index - 1) / (periodAdjusted - 1),
      },
      {
        title: "linear_8",
        periodAdjusted: 8,
        func: (periodAdjusted, diffTime, index) =>
          (periodAdjusted - diffTime - index - 1) / (periodAdjusted - 1),
      },
      // {
      //   title: "exp_12",
      //   periodAdjusted: 12,
      //   func: (periodAdjusted, diffTime, index) => 1 / Math.exp(index),
      // },
    ],
    /**
     * Данные для карточек на карте.
     */
    datasetsMap: [
      {
        name_ru: "Гарнарич",
        name_en: "Garnarich",
        area_en: "Shirak Province",
        now: {
          temp: "+11°",
          feels_like: "+10°",
          condition: "clear",
          condition_s: "ясно",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "3°",
          condition: "cloudy_rain_1_thunderstorm_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "+12°",
          condition: "cloudy_snow_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        details: {
          morning: {
            name: "утро",
            temp: "+3°",
            condition: "cloudy_rain_1_thunderstorm_1",
          },
          day: {
            name: "день",
            temp: "+17°",
            condition: "cloudy",
          },
          evening: {
            name: "вечер",
            temp: "+13°",
            condition: "clear",
          },
        },
        x_svg: 19,
        y_svg: 44,
      },
      {
        name_ru: "Бавра",
        name_en: "Bavra",
        area_en: "Shirak Province",
        now: {
          temp: "+6°",
          condition: "cloudy_rain_1_thunderstorm_1",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "+3°",
          condition: "cloudy_rain_1_thunderstorm_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "+12°",
          condition: "cloudy_snow_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 73,
        y_svg: 35,
      },
      {
        name_ru: "Какавасар",
        name_en: "Kaqavasar",
        area_en: "Shirak Province",
        now: {
          temp: "+4°",
          condition: "mostly-cloudy",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "+3°",
          condition: "cloudy_rain_1_thunderstorm_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "+12°",
          condition: "cloudy_snow_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 101,
        y_svg: 76,
      },
      {
        name_ru: "Амасия",
        name_en: "Amasia",
        area_en: "Shirak Province",
        now: {
          temp: "+6°",
          condition: "cloudy_snow_1",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "+3°",
          condition: "cloudy_rain_1_thunderstorm_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "+12°",
          condition: "cloudy_snow_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 50,
        y_svg: 80,
      },
      {
        name_ru: "Джаджур",
        name_en: "Jajur",
        area_en: "Shirak Province",
        now: {
          temp: "+8°",
          condition: "clear",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "+9°",
          condition: "cloudy_rain_1_thunderstorm_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "+12°",
          condition: "cloudy_snow_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 96,
        y_svg: 110,
      },
      {
        name_ru: "Азатан",
        name_en: "Azatan",
        area_en: "Shirak Province",
        now: {
          temp: "+10°",
          condition: "clear",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "+3°",
          condition: "cloudy_rain_1_thunderstorm_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "+12°",
          condition: "cloudy_snow_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 66,
        y_svg: 145,
      },
      {
        name_ru: "Баграван",
        name_en: "Bagravan",
        area_en: "Shirak Province",
        now: {
          temp: "-6°",
          condition: "clear",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-3°",
          condition: "cloudy_rain_1_thunderstorm_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "+12°",
          condition: "cloudy_snow_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 32,
        y_svg: 188,
      },
      {
        name_ru: "Маралик",
        name_en: "Maralik",
        area_en: "Shirak Province",
        now: {
          temp: "-6°",
          condition: "clear",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-3°",
          condition: "cloudy_rain_1_thunderstorm_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "+12°",
          condition: "cloudy_snow_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 73,
        y_svg: 173,
      },
      {
        name_ru: "Артик",
        name_en: "Artik",
        area_en: "Shirak Province",
        now: {
          temp: "-6°",
          condition: "clear",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-3°",
          condition: "cloudy_rain_1_thunderstorm_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "+12°",
          condition: "cloudy_snow_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 107,
        y_svg: 161,
      },
      {
        name_ru: "Степанаван",
        name_en: "Stepanavan",
        area_en: "Lori Province",
        home: true,
        now: {
          temp: "-6°",
          condition: "clear",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-3°",
          condition: "cloudy_rain_1_thunderstorm_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "+12°",
          condition: "cloudy_snow_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 171,
        y_svg: 52,
      },
      {
        name_ru: "Гюмри",
        name_en: "Gyumri",
        area_en: "Shirak Province",
        home: true,
        now: {
          temp: "+1°",
          condition: "cloudy_rain_0",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-3°",
          condition: "cloudy",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "mainly-clear_rain_0",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 62,
        y_svg: 117,
      },
      {
        name_ru: "Ванадзор",
        name_en: "Vanadzor",
        area_en: "Lori Province",
        home: true,
        now: {
          temp: "+5°",
          condition: "cloudy_rain_0_thunderstorm_1",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_rain_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_rain_1_thunderstorm_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 191,
        y_svg: 115,
      },
      {
        name_ru: "Мецаван",
        name_en: "Metsavan",
        area_en: "Lori Province",

        now: {
          temp: "+5°",
          condition: "cloudy_rain_0_thunderstorm_1",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_rain_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_rain_1_thunderstorm_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 129,
        y_svg: 24,
      },
      {
        name_ru: "Ташир",
        name_en: "Tashir",
        area_en: "Lori Province",

        now: {
          temp: "+5°",
          condition: "cloudy_rain_0_thunderstorm_1",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_rain_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_rain_1_thunderstorm_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 153,
        y_svg: 33,
      },
      {
        name_ru: "Благодарное",
        name_en: "Blagodarnoe",
        area_en: "Lori Province",

        now: {
          temp: "+5°",
          condition: "cloudy_rain_0_thunderstorm_1",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_rain_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_rain_1_thunderstorm_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 128,
        y_svg: 55,
      },
      {
        name_ru: "Привольное",
        name_en: "Privolnoye",
        area_en: "Lori Province",

        now: {
          temp: "+5°",
          condition: "cloudy_rain_0_thunderstorm_1",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_rain_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_rain_1_thunderstorm_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 189,
        y_svg: 33,
      },
      {
        name_ru: "Шамлуг",
        name_en: "Shamlugh",
        area_en: "Lori Province",

        now: {
          temp: "+5°",
          condition: "cloudy_rain_0_thunderstorm_1",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_rain_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_rain_1_thunderstorm_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 230,
        y_svg: 24,
      },
      {
        name_ru: "Ахтала",
        name_en: "Akhtala",
        area_en: "Lori Province",

        now: {
          temp: "+5°",
          condition: "cloudy_rain_0_thunderstorm_1",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_rain_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_rain_1_thunderstorm_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 254,
        y_svg: 37,
      },
      {
        name_ru: "Алаверди",
        name_en: "Alaverdi",
        area_en: "Lori Province",

        now: {
          temp: "+5°",
          condition: "cloudy_rain_0_thunderstorm_1",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_rain_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_rain_1_thunderstorm_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 223,
        y_svg: 46,
      },
      {
        name_ru: "Сараарт",
        name_en: "Sarahart",
        area_en: "Lori Province",

        now: {
          temp: "+5°",
          condition: "cloudy_rain_0_thunderstorm_1",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_rain_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_rain_1_thunderstorm_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 137,
        y_svg: 92,
      },
      {
        name_ru: "Цахкабер",
        name_en: "Tsakhkaber",
        area_en: "Lori Province",

        now: {
          temp: "+5°",
          condition: "cloudy_rain_0_thunderstorm_1",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_rain_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_rain_1_thunderstorm_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 113,
        y_svg: 116,
      },
      {
        name_ru: "Спитак",
        name_en: "Spitak",
        area_en: "Lori Province",

        now: {
          temp: "+5°",
          condition: "cloudy_rain_0_thunderstorm_1",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_rain_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_rain_1_thunderstorm_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 148,
        y_svg: 112,
      },
      {
        name_ru: "Гаргар",
        name_en: "Gargar",
        area_en: "Lori Province",

        now: {
          temp: "+5°",
          condition: "cloudy_rain_0_thunderstorm_1",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_rain_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_rain_1_thunderstorm_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 183,
        y_svg: 86,
      },
      {
        name_ru: "Туманян",
        name_en: "Tumanyan",
        area_en: "Lori Province",

        now: {
          temp: "+5°",
          condition: "cloudy_rain_0_thunderstorm_1",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_rain_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_rain_1_thunderstorm_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 221,
        y_svg: 69,
      },
      {
        name_ru: "Ваагни",
        name_en: "Vahagni",
        area_en: "Lori Province",

        now: {
          temp: "+5°",
          condition: "cloudy_rain_0_thunderstorm_1",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_rain_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_rain_1_thunderstorm_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 211,
        y_svg: 97,
      },
      {
        name_ru: "Маргаовит",
        name_en: "Margahovit",
        area_en: "Lori Province",

        now: {
          temp: "+5°",
          condition: "cloudy_rain_0_thunderstorm_1",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_rain_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_rain_1_thunderstorm_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 227,
        y_svg: 136,
      },
      {
        name_ru: "Иджеван",
        name_en: "Ijevan",
        area_en: "Tavush Province",
        home: true,
        now: {
          temp: "+6°",
          condition: "cloudy_rain_1_thunderstorm_1_hail_1",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_sleet_0",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_sleet_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 299,
        y_svg: 105,
      },
      {
        name_ru: "Берд",
        name_en: "Berd",
        area_en: "Tavush Province",
        now: {
          temp: "+6°",
          condition: "cloudy_rain_1_thunderstorm_1_hail_1",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_sleet_0",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_sleet_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 341,
        y_svg: 99,
      },
      {
        name_ru: "Ахтанак",
        name_en: "Haghtanak",
        area_en: "Tavush Province",
        now: {
          temp: "+6°",
          condition: "cloudy_rain_1_thunderstorm_1_hail_1",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_sleet_0",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_sleet_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 253,
        y_svg: 19,
      },
      {
        name_ru: "Ноемберян",
        name_en: "Noyemberian",
        area_en: "Tavush Province",
        now: {
          temp: "+6°",
          condition: "cloudy_rain_1_thunderstorm_1_hail_1",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_sleet_0",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_sleet_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 281,
        y_svg: 33,
      },
      {
        name_ru: "Воскепар",
        name_en: "Voskepar",
        area_en: "Tavush Province",
        now: {
          temp: "+6°",
          condition: "cloudy_rain_1_thunderstorm_1_hail_1",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_sleet_0",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_sleet_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 282,
        y_svg: 56,
      },
      {
        name_ru: "Севкар",
        name_en: "Sevkar",
        area_en: "Tavush Province",
        now: {
          temp: "+6°",
          condition: "cloudy_rain_1_thunderstorm_1_hail_1",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_sleet_0",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_sleet_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 308,
        y_svg: 72,
      },
      {
        name_ru: "Айгедзор",
        name_en: "Aygedzor",
        area_en: "Tavush Province",
        now: {
          temp: "+6°",
          condition: "cloudy_rain_1_thunderstorm_1_hail_1",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_sleet_0",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_sleet_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 372,
        y_svg: 121,
      },
      {
        name_ru: "Дилижан",
        name_en: "Dilijan",
        area_en: "Tavush Province",
        now: {
          temp: "+6°",
          condition: "cloudy_rain_1_thunderstorm_1_hail_1",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_sleet_0",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_sleet_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 256,
        y_svg: 136,
      },
      {
        name_ru: "Аштарак",
        name_en: "Ashtarak",
        area_en: "Aragatsotn Province",
        home: true,
        now: {
          temp: "+5°",
          condition: "cloudy_snow_0",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_rain_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_snow_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 150,
        y_svg: 240,
      },
      {
        name_ru: "Гетап",
        name_en: "Getap",
        area_en: "Aragatsotn Province",
        now: {
          temp: "+5°",
          condition: "cloudy_snow_0",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_rain_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_snow_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 27,
        y_svg: 214,
      },
      {
        name_ru: "Арагац",
        name_en: "Aragats",
        area_en: "Aragatsotn Province",
        now: {
          temp: "+5°",
          condition: "cloudy_snow_0",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_rain_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_snow_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 32,
        y_svg: 237,
      },
      {
        name_ru: "Заринджа",
        name_en: "Zarinja",
        area_en: "Aragatsotn Province",
        now: {
          temp: "+5°",
          condition: "cloudy_snow_0",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_rain_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_snow_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 50,
        y_svg: 193,
      },
      {
        name_ru: "Мастара",
        name_en: "Mastara",
        area_en: "Aragatsotn Province",
        now: {
          temp: "+5°",
          condition: "cloudy_snow_0",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_rain_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_snow_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 77,
        y_svg: 195,
      },
      {
        name_ru: "Талин",
        name_en: "Talin",
        area_en: "Aragatsotn Province",
        now: {
          temp: "+5°",
          condition: "cloudy_snow_0",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_rain_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_snow_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 73,
        y_svg: 220,
      },
      {
        name_ru: "Какавадзор",
        name_en: "Kakavadzor",
        area_en: "Aragatsotn Province",
        now: {
          temp: "+5°",
          condition: "cloudy_snow_0",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_rain_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_snow_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 105,
        y_svg: 222,
      },
      {
        name_ru: "Аруч",
        name_en: "Aruch",
        area_en: "Aragatsotn Province",
        now: {
          temp: "+5°",
          condition: "cloudy_snow_0",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_rain_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_snow_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 109,
        y_svg: 247,
      },
      {
        name_ru: "Беркарат",
        name_en: "Berkarat",
        area_en: "Aragatsotn Province",
        now: {
          temp: "+5°",
          condition: "cloudy_snow_0",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_rain_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_snow_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 126,
        y_svg: 143,
      },
      {
        name_ru: "Цилкар",
        name_en: "Tsilkar",
        area_en: "Aragatsotn Province",
        now: {
          temp: "+5°",
          condition: "cloudy_snow_0",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_rain_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_snow_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 154,
        y_svg: 136,
      },
      {
        name_ru: "Цахкаовит",
        name_en: "Tsaghkahovit",
        area_en: "Aragatsotn Province",
        now: {
          temp: "+5°",
          condition: "cloudy_snow_0",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_rain_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_snow_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 135,
        y_svg: 166,
      },
      {
        name_ru: "Апаран",
        name_en: "Aparan",
        area_en: "Aragatsotn Province",
        now: {
          temp: "+5°",
          condition: "cloudy_snow_0",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_rain_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_snow_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 167,
        y_svg: 174,
      },
      {
        name_ru: "Артаван",
        name_en: "Hartavan",
        area_en: "Aragatsotn Province",
        now: {
          temp: "+5°",
          condition: "cloudy_snow_0",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_rain_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_snow_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 157,
        y_svg: 198,
      },
      {
        name_ru: "Масис",
        name_en: "Masis",
        area_en: "Ararat Province",
        now: {
          temp: "+5°",
          condition: "cloudy_snow_0",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_rain_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_snow_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 172,
        y_svg: 298,
      },
      {
        name_ru: "Гетазат",
        name_en: "Getazat",
        area_en: "Ararat Province",
        now: {
          temp: "+5°",
          condition: "cloudy_snow_0",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_rain_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_snow_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 204,
        y_svg: 301,
      },
      {
        name_ru: "Веди",
        name_en: "Vedi",
        area_en: "Ararat Province",
        now: {
          temp: "+5°",
          condition: "cloudy_snow_0",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_rain_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_snow_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 231,
        y_svg: 335,
      },
      {
        name_ru: "Арарат",
        name_en: "Ararat",
        area_en: "Ararat Province",
        now: {
          temp: "+5°",
          condition: "cloudy_snow_0",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_rain_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_snow_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 227,
        y_svg: 359,
      },
      {
        name_ru: "Шахап",
        name_en: "Shaghap",
        area_en: "Ararat Province",
        now: {
          temp: "+5°",
          condition: "cloudy_snow_0",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_rain_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_snow_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 271,
        y_svg: 348,
      },
      {
        name_ru: "Ерасх",
        name_en: "Yeraskh",
        area_en: "Ararat Province",
        now: {
          temp: "+5°",
          condition: "cloudy_snow_0",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_rain_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_snow_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 248,
        y_svg: 383,
      },
      {
        name_ru: "Раздан",
        name_en: "Hrazdan",
        area_en: "Kotayk Province",
        home: true,
        now: {
          temp: "+5°",
          condition: "mainly-clear",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "mainly-clear_rain_0",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "mainly-clear_rain_0_thunderstorm_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 233,
        y_svg: 185,
      },
      {
        name_ru: "Анкаван",
        name_en: "Hanqavan",
        area_en: "Kotayk Province",
        now: {
          temp: "+5°",
          condition: "mainly-clear",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "mainly-clear_rain_0",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "mainly-clear_rain_0_thunderstorm_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 193,
        y_svg: 154,
      },
      {
        name_ru: "Цахкадзор",
        name_en: "Tsakhkadzor",
        area_en: "Kotayk Province",
        now: {
          temp: "+5°",
          condition: "mainly-clear",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "mainly-clear_rain_0",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "mainly-clear_rain_0_thunderstorm_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 229,
        y_svg: 163,
      },
      {
        name_ru: "Чаренцаван",
        name_en: "Charentsavan",
        area_en: "Kotayk Province",
        now: {
          temp: "+5°",
          condition: "mainly-clear",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "mainly-clear_rain_0",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "mainly-clear_rain_0_thunderstorm_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 220,
        y_svg: 208,
      },
      {
        name_ru: "Егвард",
        name_en: "Yeghvard",
        area_en: "Kotayk Province",
        now: {
          temp: "+5°",
          condition: "mainly-clear",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "mainly-clear_rain_0",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "mainly-clear_rain_0_thunderstorm_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 187,
        y_svg: 230,
      },
      {
        name_ru: "Бюрегаван",
        name_en: "Byureghavan",
        area_en: "Kotayk Province",
        now: {
          temp: "+5°",
          condition: "mainly-clear",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "mainly-clear_rain_0",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "mainly-clear_rain_0_thunderstorm_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 214,
        y_svg: 231,
      },
      {
        name_ru: "Атис",
        name_en: "Hatis",
        area_en: "Kotayk Province",
        now: {
          temp: "+5°",
          condition: "mainly-clear",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "mainly-clear_rain_0",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "mainly-clear_rain_0_thunderstorm_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 240,
        y_svg: 229,
      },
      {
        name_ru: "Абовян",
        name_en: "Abovyan",
        area_en: "Kotayk Province",
        now: {
          temp: "+5°",
          condition: "mainly-clear",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "mainly-clear_rain_0",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "mainly-clear_rain_0_thunderstorm_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 213,
        y_svg: 255,
      },
      {
        name_ru: "Зар",
        name_en: "Zar",
        area_en: "Kotayk Province",
        now: {
          temp: "+5°",
          condition: "mainly-clear",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "mainly-clear_rain_0",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "mainly-clear_rain_0_thunderstorm_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 241,
        y_svg: 253,
      },
      {
        name_ru: "Гохт",
        name_en: "Goght",
        area_en: "Kotayk Province",
        now: {
          temp: "+5°",
          condition: "mainly-clear",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "mainly-clear_rain_0",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "mainly-clear_rain_0_thunderstorm_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 244,
        y_svg: 279,
      },
      {
        name_ru: "Гавар",
        name_en: "Gavar",
        area_en: "Gegharkunik Province",
        home: true,
        now: {
          temp: "+5°",
          condition: "mostly-cloudy",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "partly-cloudy",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "partly-cloudy_rain_0",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 310,
        y_svg: 215,
      },
      {
        name_ru: "Армавир",
        name_en: "Armavir",
        area_en: "Armavir Province",
        home: true,
        now: {
          temp: "+5°",
          condition: "partly-cloudy_rain_1",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "partly-cloudy_rain_1_hail_1_thunderstorm_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "partly-cloudy_rain_1_thunderstorm_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 72,
        y_svg: 273,
      },
      {
        name_ru: "Ервандашат",
        name_en: "Yervandashat",
        area_en: "Armavir Province",
        now: {
          temp: "+5°",
          condition: "partly-cloudy_rain_1",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "partly-cloudy_rain_1_hail_1_thunderstorm_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "partly-cloudy_rain_1_thunderstorm_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 33,
        y_svg: 278,
      },
      {
        name_ru: "Каракерт",
        name_en: "Karakert",
        area_en: "Armavir Province",
        now: {
          temp: "+5°",
          condition: "partly-cloudy_rain_1",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "partly-cloudy_rain_1_hail_1_thunderstorm_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "partly-cloudy_rain_1_thunderstorm_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 61,
        y_svg: 249,
      },
      {
        name_ru: "Баграмян",
        name_en: "Baghramyan",
        area_en: "Armavir Province",
        now: {
          temp: "+5°",
          condition: "partly-cloudy_rain_1",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "partly-cloudy_rain_1_hail_1_thunderstorm_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "partly-cloudy_rain_1_thunderstorm_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 53,
        y_svg: 269,
      },
      {
        name_ru: "Налбандян",
        name_en: "Nalbandyan",
        area_en: "Armavir Province",
        now: {
          temp: "+5°",
          condition: "partly-cloudy_rain_1",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "partly-cloudy_rain_1_hail_1_thunderstorm_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "partly-cloudy_rain_1_thunderstorm_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 85,
        y_svg: 297,
      },
      {
        name_ru: "Мецамор",
        name_en: "Metsamor",
        area_en: "Armavir Province",
        now: {
          temp: "+5°",
          condition: "partly-cloudy_rain_1",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "partly-cloudy_rain_1_hail_1_thunderstorm_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "partly-cloudy_rain_1_thunderstorm_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 121,
        y_svg: 276,
      },
      {
        name_ru: "Маргара",
        name_en: "Margara",
        area_en: "Armavir Province",
        now: {
          temp: "+5°",
          condition: "partly-cloudy_rain_1",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "partly-cloudy_rain_1_hail_1_thunderstorm_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "partly-cloudy_rain_1_thunderstorm_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 127,
        y_svg: 299,
      },
      {
        name_ru: "Эчмиацин",
        name_en: "Echmiatsin",
        area_en: "Armavir Province",
        now: {
          temp: "+5°",
          condition: "partly-cloudy_rain_1",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "partly-cloudy_rain_1_hail_1_thunderstorm_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "partly-cloudy_rain_1_thunderstorm_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 151,
        y_svg: 265,
      },
      {
        name_ru: "Ереван",
        name_en: "Yerevan",
        home: true,
        now: {
          temp: "+5°",
          condition: "partly-cloudy_sleet_1",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "partly-cloudy_sleet_0",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "partly-cloudy_snow_0",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 230,
        y_svg: 255,
      },
      {
        name_ru: "Арташат",
        name_en: "Artashat",
        area_en: "Ararat Province",
        home: true,
        now: {
          temp: "+5°",
          condition: "partly-cloudy_snow_1",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "semitransparent",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "snowstorm",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 194,
        y_svg: 321,
      },
      {
        name_ru: "Варденис",
        name_en: "Vardenis",
        area_en: "Gegharkunik Province",
        home: true,
        now: {
          temp: "+5°",
          condition: "cloudy_snowstorm_1",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_rain_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_rain_1_thunderstorm_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 395,
        y_svg: 258,
      },
      {
        name_ru: "Севан",
        name_en: "Sevan",
        area_en: "Gegharkunik Province",
        now: {
          temp: "+5°",
          condition: "cloudy_snowstorm_1",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_rain_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_rain_1_thunderstorm_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 259,
        y_svg: 170,
      },
      {
        name_ru: "Чамбарак",
        name_en: "Chambarak",
        area_en: "Gegharkunik Province",
        now: {
          temp: "+5°",
          condition: "cloudy_snowstorm_1",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_rain_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_rain_1_thunderstorm_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 336,
        y_svg: 169,
      },
      {
        name_ru: "Джил",
        name_en: "Jil",
        area_en: "Gegharkunik Province",
        now: {
          temp: "+5°",
          condition: "cloudy_snowstorm_1",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_rain_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_rain_1_thunderstorm_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 363,
        y_svg: 200,
      },
      {
        name_ru: "Арегуни",
        name_en: "Areguni",
        area_en: "Gegharkunik Province",
        now: {
          temp: "+5°",
          condition: "cloudy_snowstorm_1",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_rain_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_rain_1_thunderstorm_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 387,
        y_svg: 228,
      },
      {
        name_ru: "Мартуни",
        name_en: "Martuni",
        area_en: "Gegharkunik Province",
        now: {
          temp: "+5°",
          condition: "cloudy_snowstorm_1",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_rain_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_rain_1_thunderstorm_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 323,
        y_svg: 268,
      },
      {
        name_ru: "Варденик",
        name_en: "Vardenik",
        area_en: "Gegharkunik Province",
        now: {
          temp: "+5°",
          condition: "cloudy_snowstorm_1",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_rain_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_rain_1_thunderstorm_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 359,
        y_svg: 260,
      },
      {
        name_ru: "Сотк",
        name_en: "Sotk",
        area_en: "Gegharkunik Province",
        now: {
          temp: "+5°",
          condition: "cloudy_snowstorm_1",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_rain_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_rain_1_thunderstorm_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 438,
        y_svg: 255,
      },
      {
        name_ru: "Ехегнадзор",
        name_en: "Yeghegnadzor",
        area_en: "Vayots Dzor Province",
        home: true,
        now: {
          temp: "+5°",
          condition: "cloudy_rain_0_thunderstorm_1",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_rain_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_rain_1_thunderstorm_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 344,
        y_svg: 366,
      },
      {
        name_ru: "Агнджадзор",
        name_en: "Aghnjadzor",
        area_en: "Vayots Dzor Province",
        now: {
          temp: "+5°",
          condition: "cloudy_rain_0_thunderstorm_1",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_rain_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_rain_1_thunderstorm_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 337,
        y_svg: 328,
      },
      {
        name_ru: "Арени",
        name_en: "Areni",
        area_en: "Vayots Dzor Province",
        now: {
          temp: "+5°",
          condition: "cloudy_rain_0_thunderstorm_1",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_rain_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_rain_1_thunderstorm_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 318,
        y_svg: 376,
      },
      {
        name_ru: "Эрмон",
        name_en: "Hermon",
        area_en: "Vayots Dzor Province",
        now: {
          temp: "+5°",
          condition: "cloudy_rain_0_thunderstorm_1",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_rain_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_rain_1_thunderstorm_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 369,
        y_svg: 339,
      },
      {
        name_ru: "Вайк",
        name_en: "Vayk",
        area_en: "Vayots Dzor Province",
        now: {
          temp: "+5°",
          condition: "cloudy_rain_0_thunderstorm_1",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_rain_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_rain_1_thunderstorm_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 375,
        y_svg: 385,
      },
      {
        name_ru: "Джермук",
        name_en: "Jermuk",
        area_en: "Vayots Dzor Province",
        now: {
          temp: "+5°",
          condition: "cloudy_rain_0_thunderstorm_1",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_rain_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_rain_1_thunderstorm_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 411,
        y_svg: 340,
      },
      {
        name_ru: "Сараван",
        name_en: "Saravan",
        area_en: "Vayots Dzor Province",
        now: {
          temp: "+5°",
          condition: "cloudy_rain_0_thunderstorm_1",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_rain_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_rain_1_thunderstorm_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 412,
        y_svg: 377,
      },
      {
        name_ru: "Геранбой",
        name_en: "Goranboy",
        home: true,
        now: {
          temp: "+5°",
          condition: "cloudy_rain_0_thunderstorm_1",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_rain_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_rain_1_thunderstorm_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 524,
        y_svg: 170,
      },
      {
        name_ru: "Капан",
        name_en: "Kapan",
        area_en: "Syunik Province",
        home: true,
        now: {
          temp: "+5°",
          condition: "cloudy_rain_0_thunderstorm_1",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_rain_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_rain_1_thunderstorm_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 545,
        y_svg: 478,
      },
      {
        name_ru: "Сисиан",
        name_en: "Sisian",
        area_en: "Syunik Province",
        now: {
          temp: "+5°",
          condition: "cloudy_rain_0_thunderstorm_1",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_rain_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_rain_1_thunderstorm_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 463,
        y_svg: 405,
      },
      {
        name_ru: "Дастакерт",
        name_en: "Dastakert",
        area_en: "Syunik Province",
        now: {
          temp: "+5°",
          condition: "cloudy_rain_0_thunderstorm_1",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_rain_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_rain_1_thunderstorm_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 467,
        y_svg: 443,
      },
      {
        name_ru: "Tex",
        name_en: "Tegh",
        area_en: "Syunik Province",
        now: {
          temp: "+5°",
          condition: "cloudy_rain_0_thunderstorm_1",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_rain_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_rain_1_thunderstorm_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 560,
        y_svg: 401,
      },
      {
        name_ru: "Горис",
        name_en: "Goris",
        area_en: "Syunik Province",
        now: {
          temp: "+5°",
          condition: "cloudy_rain_0_thunderstorm_1",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_rain_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_rain_1_thunderstorm_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 523,
        y_svg: 407,
      },
      {
        name_ru: "Татев",
        name_en: "Tatev",
        area_en: "Syunik Province",
        now: {
          temp: "+5°",
          condition: "cloudy_rain_0_thunderstorm_1",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_rain_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_rain_1_thunderstorm_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 509,
        y_svg: 437,
      },
      {
        name_ru: "Каджаран",
        name_en: "Kajaran",
        area_en: "Syunik Province",
        now: {
          temp: "+5°",
          condition: "cloudy_rain_0_thunderstorm_1",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_rain_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_rain_1_thunderstorm_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 496,
        y_svg: 494,
      },
      {
        name_ru: "Шишкерт",
        name_en: "Shishkert",
        area_en: "Syunik Province",
        now: {
          temp: "+5°",
          condition: "cloudy_rain_0_thunderstorm_1",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_rain_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_rain_1_thunderstorm_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 535,
        y_svg: 508,
      },
      {
        name_ru: "Мегри",
        name_en: "Meghri",
        area_en: "Syunik Province",
        now: {
          temp: "+5°",
          condition: "cloudy_rain_0_thunderstorm_1",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_rain_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_rain_1_thunderstorm_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 511,
        y_svg: 538,
      },
      {
        name_ru: "Гадрут",
        name_en: "Hadrut",
        home: true,
        now: {
          temp: "+5°",
          condition: "cloudy_rain_0_thunderstorm_1",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_rain_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_rain_1_thunderstorm_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 611,
        y_svg: 391,
      },
      {
        name_ru: "Степанакерт",
        name_en: "Khankendi",
        home: true,
        now: {
          temp: "+5°",
          condition: "cloudy_rain_0_thunderstorm_1",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_rain_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_rain_1_thunderstorm_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 544,
        y_svg: 303,
      },
      {
        name_ru: "Кельбаджар",
        name_en: "Kalbajar",
        home: true,
        now: {
          temp: "+5°",
          condition: "cloudy_rain_0_thunderstorm_1",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_rain_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_rain_1_thunderstorm_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 473,
        y_svg: 240,
      },
      {
        name_ru: "Мартакерт",
        name_en: "Martakert",
        home: true,
        now: {
          temp: "+5°",
          condition: "cloudy_rain_0_thunderstorm_1",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_rain_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_rain_1_thunderstorm_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 552,
        y_svg: 237,
      },
      {
        name_ru: "Лачин",
        name_en: "Lachin",
        home: true,
        now: {
          temp: "+5°",
          condition: "cloudy_rain_0_thunderstorm_1",
          wind_dir: "se",
          wind_descr: "13 м/с ЮВ",
        },
        tomorrow: {
          temp: "-33°",
          condition: "cloudy_rain_1",
          wind_dir: "ne",
          wind_descr: "3 м/с СВ",
        },
        overmorrow: {
          temp: "-2°",
          condition: "cloudy_rain_1_thunderstorm_1",
          wind_dir: "w",
          wind_descr: "7 м/с З",
        },
        x_svg: 500,
        y_svg: 370,
      },
    ],
    /**
     * Список городов Армении.
     */
    listOfCities: [
      { temp: "+6°", name_loc: "Երևան", name_ru: "Гюмри", name_en: "Gyumri" },
      {
        temp: "+6°",
        name_loc: "Գյումրի",
        name_ru: "Ереван",
        name_en: "Yerevan",
      },
      {
        temp: "+6°",
        name_loc: "Վանաձոր",
        name_ru: "Ванадзор",
        name_en: "Vanadzor",
      },
      {
        temp: "+6°",
        name_loc: "Աբովյան",
        name_ru: "Абовян",
        name_en: "Abovyan",
      },
      {
        temp: "+6°",
        name_loc: "Էջմիածին",
        name_ru: "Эчмиацин",
        name_en: "Echmiatsin",
      },
      {
        temp: "+6°",
        name_loc: "Հրազդան",
        name_ru: "Раздан",
        name_en: "Hrazdan",
      },
      { temp: "+6°", name_loc: "Կապան", name_ru: "Капан", name_en: "Kapan" },
      {
        temp: "+6°",
        name_loc: "Արմավիր",
        name_ru: "Армавир",
        name_en: "Armavir",
      },
      {
        temp: "+6°",
        name_loc: "Չարենցավան",
        name_ru: "Чаренцаван",
        name_en: "Charentsavan",
      },
      { temp: "+6°", name_loc: "Սևան", name_ru: "Севан", name_en: "Sevan" },
      {
        temp: "+6°",
        name_loc: "Արտաշատ",
        name_ru: "Арташат",
        name_en: "Artashat",
      },
      { temp: "+6°", name_loc: "Գավառ", name_ru: "Гавар", name_en: "Gavar" },
      { temp: "+6°", name_loc: "Գորիս", name_ru: "Горис", name_en: "Goris" },
      { temp: "+6°", name_loc: "Իջևան", name_ru: "Иджеван", name_en: "Ijevan" },
      { temp: "+6°", name_loc: "Արարատ", name_ru: "Арарат", name_en: "Ararat" },
      { temp: "+6°", name_loc: "Մասիս", name_ru: "Масис", name_en: "Masis" },
      { temp: "+6°", name_loc: "Սպիտակ", name_ru: "Спитак", name_en: "Spitak" },
      {
        temp: "+6°",
        name_loc: "Դիլիջան",
        name_ru: "Дилижан",
        name_en: "Dilijan",
      },
      {
        temp: "+6°",
        name_loc: "Աշտարակ",
        name_ru: "Аштарак",
        name_en: "Ashtarak",
      },
      { temp: "+6°", name_loc: "Արթիկ", name_ru: "Артик", name_en: "Artik" },
      {
        temp: "+6°",
        name_loc: "Ալավերդի",
        name_ru: "Алаверди",
        name_en: "Alaverdi",
      },
      {
        temp: "+6°",
        name_loc: "Ստեփանավան",
        name_ru: "Степанаван",
        name_en: "Stepanavan",
      },
      { temp: "+6°", name_loc: "Սիսիան", name_ru: "Сисиан", name_en: "Sisian" },
      {
        temp: "+6°",
        name_loc: "Վարդենիս",
        name_ru: "Варденис",
        name_en: "Vardenis",
      },
      {
        temp: "+6°",
        name_loc: "Մարտունի",
        name_ru: "Мартуни",
        name_en: "Martuni",
      },
      { temp: "+6°", name_loc: "Վեդի", name_ru: "Веди", name_en: "Vedi" },
      {
        temp: "+6°",
        name_loc: "Եղվարդ",
        name_ru: "Егвард",
        name_en: "Yeghvard",
      },
      {
        temp: "+6°",
        name_loc: "Մեծամոր",
        name_ru: "Мецамор",
        name_en: "Metsamor",
      },
      { temp: "+6°", name_loc: "Բերդ", name_ru: "Берд", name_en: "Berd" },
      { temp: "+6°", name_loc: "Այնթապ", name_ru: "Айнтап", name_en: "Ayntap" },
      {
        temp: "+6°",
        name_loc: "Սարուխան",
        name_ru: "Сарухан",
        name_en: "Sarukhan",
      },
      {
        temp: "+6°",
        name_loc: "Եղեգնաձոր",
        name_ru: "Ехегнадзор",
        name_en: "Yeghegnadzor",
      },
      { temp: "+6°", name_loc: "Արարատ", name_ru: "Арарат", name_en: "Ararat" },
      { temp: "+6°", name_loc: "Տաշիր", name_ru: "Ташир", name_en: "Tashir" },
      {
        temp: "+6°",
        name_loc: "Նոր Խարբերդ",
        name_ru: "Нор Харберд",
        name_en: "Nor Kharberd",
      },
      {
        temp: "+6°",
        name_loc: "Քաջարան",
        name_ru: "Каджаран",
        name_en: "Kajaran",
      },
      { temp: "+6°", name_loc: "Գառնի", name_ru: "Гарни", name_en: "Garni" },
      {
        temp: "+6°",
        name_loc: "Սարչապետ",
        name_ru: "Сарчапет",
        name_en: "Sarchapet",
      },
      {
        temp: "+6°",
        name_loc: "Սարդարապատ",
        name_ru: "Сардарапат",
        name_en: "Sardarapat",
      },
      { temp: "+6°", name_loc: "Ապարան", name_ru: "Апаран", name_en: "Aparan" },
      {
        temp: "+6°",
        name_loc: "Մեծավան",
        name_ru: "Мецаван",
        name_en: "Metsavan",
      },
      { temp: "+6°", name_loc: "Վայք", name_ru: "Вайк", name_en: "Vayk" },
      {
        temp: "+6°",
        name_loc: "Մանթաշ",
        name_ru: "Манташ",
        name_en: "Mantash",
      },
      {
        temp: "+6°",
        name_loc: "Նոյեմբերյան",
        name_ru: "Ноемберян",
        name_en: "Noyemberian",
      },
      {
        temp: "+6°",
        name_loc: "Նալբանդյան",
        name_ru: "Налбандян",
        name_en: "Nalbandyan",
      },
      {
        temp: "+6°",
        name_loc: "Մարալիկ",
        name_ru: "Маралик",
        name_en: "Maralik",
      },
      { temp: "+6°", name_loc: "Թալին", name_ru: "Талин", name_en: "Talin" },
      {
        temp: "+6°",
        name_loc: "Կարմիրգյուղ",
        name_ru: "Кармиргюх",
        name_en: "Karmirgyugh",
      },
      { temp: "+6°", name_loc: "Ավշար", name_ru: "Авшар", name_en: "Avshar" },
      {
        temp: "+6°",
        name_loc: "Ոսկետափ",
        name_ru: "Воскетап",
        name_en: "Vosketap",
      },
      {
        temp: "+6°",
        name_loc: "Ջերմուկ",
        name_ru: "Джермук",
        name_en: "Jermuk",
      },
      { temp: "+6°", name_loc: "Մեղրի", name_ru: "Мегри", name_en: "Meghri" },
      { temp: "+6°", name_loc: "Օձուն", name_ru: "Одзун", name_en: "Odzun" },
      {
        temp: "+6°",
        name_loc: "Մխչյան",
        name_ru: "Мхчян",
        name_en: "Mkhchyan",
      },
      {
        temp: "+6°",
        name_loc: "Մալիշկա",
        name_ru: "Малишка",
        name_en: "Malishka",
      },
      { temp: "+6°", name_loc: "Ագարակ", name_ru: "Агарак", name_en: "Agarak" },
      {
        temp: "+6°",
        name_loc: "Վերին Արտաշատ",
        name_ru: "Верин Арташат",
        name_en: "Verin Artashat",
      },
      {
        temp: "+6°",
        name_loc: "Այգավան",
        name_ru: "Айгаван",
        name_en: "Aygavan",
      },
      {
        temp: "+6°",
        name_loc: "Գանձակ",
        name_ru: "Гандзак",
        name_en: "Gandzak",
      },
      {
        temp: "+6°",
        name_loc: "Շահումյան",
        name_ru: "Шаумян",
        name_en: "Shahumian",
      },
    ],
  },
  getters: {
    /**
     * Возвращает языковую метку.
     * @example
     * "ru"
     * @param state Текущее состояние store.
     */
    getLocales(state) {
      return state.locales;
    },
    /**
     * Геттер с условиями для отображения лоадера.
     * @param state Текущее состояние store.
     */
    loading(state) {
      return !(
        state.datasetsHourly &&
        Object.keys(state.datasetsHourly).length === 0 &&
        state.datasetsHourly.constructor === Object
      );
    },
    /**
     * Возвращает данные для отображения в шапке виджета.
     * Левая часть.
     * @param state Текущее состояние store.
     * @param getLocales Языковая метка.
     */
    current(state, { getLocales, datasetsForHourlyCharts }) {
      if (Object.keys(state.datasetsHourly).length === 0) return {};
      /**
       * Данные используемые для отоброжения. Берем прогнозные данные
       * за текущий час из часового прогноза.
       */
      const data = state.datasetsHourly[0][1];
      const time = setTimeFormat(new Date(), "H:i", getLocales);
      const tempData = datasetsForHourlyCharts.data[1].value[0];
      return {
        timeText: `${languageExpressions(
          getLocales,
          "headerInformer",
          "now"
        )} ${time} ${languageExpressions(
          getLocales,
          "headerInformer",
          "forecast"
        )}`,
        icon: data.condition,
        descr: data.condition_s,
        temp: `${addPlus(tempData.temp.value)}${
          languageExpressions(getLocales, "units", "temp")[0]
        }`,
        realFeel: `${languageExpressions(
          getLocales,
          "headerInformer",
          "feelsLike"
        )} ${addPlus(tempData.feels_like.value)}`,
      };
    },
    /**
     * Возвращает данные для отображения в шапке виджета.
     * Правая часть.
     * @param state Текущее состояние store.
     * @param getLocales Языковая метка.
     */
    forecastForItemHeader(state, { getLocales }) {
      if (Object.keys(state.datasetsHourly).length === 0) return {};
      const data = state.datasetsHourly[0][1];
      return [
        {
          icon: "wind-direction-grey",
          title: `${languageExpressions(
            getLocales,
            "climateIndicators",
            "wind"
          )}:`,
          value: `${data.wind_speed} ${
            languageExpressions(getLocales, "units", "speed")[0]
          }`,
          wind_dir: [
            data.wind_dir,
            languageExpressions(getLocales, "windDir", data.wind_dir)[1],
          ],
        },
        {
          icon: "wind-gust",
          title: `${
            languageExpressions(
              getLocales,
              "climateIndicators",
              "windGust_1"
            ).split(" ")[0]
          }:`,
          value: `${data.wind_gust} ${
            languageExpressions(getLocales, "units", "speed")[0]
          }`,
          wind_dir: [data.wind_dir],
        },
        {
          icon: "pressure",
          title: `${languageExpressions(
            getLocales,
            "climateIndicators",
            "pressure"
          )}:`,
          value: `${data.pressure} ${
            languageExpressions(getLocales, "units", "pressure")[0]
          }`,
        },
        {
          icon: "humidity",
          title: `${languageExpressions(
            getLocales,
            "climateIndicators",
            "humidity"
          )}:`,
          value: `${data.humidity}${
            languageExpressions(getLocales, "units", "percent")[0]
          }`,
        },
      ];
    },
    /**
     * Возвращает значения температур и другие данные для таблицы и графика на вкладке
     * "Прогноз погоды на 7-14 дней".
     * @param datasetsTenDays Текущее состояние store.state.datasetsTenDays.
     * @param getLocales Языковая метка.
     */
    tenDaysTabTable: ({ datasetsTenDays }, { getLocales }) => {
      const valuesArr = Object.values(datasetsTenDays);
      if (valuesArr.length === 0) return {};
      /**
       * Если количество дней больше 12, то отбрасываем данные за последний
       * день. Если меньше 12, то то отбрасываем данные за 2 последних дня.
       */
      const sliceEndIndex = valuesArr.length > 12 ? -1 : -2;
      const arr = valuesArr.slice(0, sliceEndIndex).map((e) => {
        const weekday = setTimeFormat(e.start_date, "D", getLocales);
        return {
          weekday: weekday,
          weekend:
            weekday ===
              `${languageExpressions(getLocales, "weekendDays")[0]}` ||
            weekday === `${languageExpressions(getLocales, "weekendDays")[1]}`,
          date: setTimeFormat(e.start_date, "d.m", getLocales),
          condition: e.day.condition,
          prec_sum: {
            value: e.day.prec_sum,
            unit: languageExpressions(getLocales, "units", "precSum")[0],
          },
          wind: {
            value: e.day.wind_speed,
            unit: languageExpressions(getLocales, "units", "speed")[0],
            wind_dir: [
              e.day.wind_dir,
              languageExpressions(getLocales, "windDir", e.day.wind_dir)[1],
            ],
          },
          pressure: {
            value: e.day.pressure,
            unit: languageExpressions(getLocales, "units", "pressure")[0],
          },
          humidity: {
            value: e.day.humidity,
            unit: languageExpressions(getLocales, "units", "percent")[0],
          },
        };
      });
      return arr;
    },
    /**
     * Возвращает значения температур и другие данные  для графика на вкладке
     * "Прогноз погоды на 7-14 дней".
     * @param datasetsTenDays Текущее состояние store.state.datasetsTenDays.
     * @example
     * [{
     *  unit: "°",
     *  value: [-9,-7,-6,-3,-4,-2,1,1,2,2],
     *  descr: "day",
     *  min: -10,
     *  max: 2
     * },
     * {
     *  unit: "°",
     *  value: [-10,-8,-7,-5,-7,-3,0,-8,1,0],
     *  descr: "night",
     *  min: -10,
     *  max: 2
     * }]
     */
    tenDaysTabTempCharts: ({ datasetsTenDays }, { getLocales }) => {
      const arr = Object.values(datasetsTenDays);
      if (arr.length === 0) return {};
      /**
       * Если количество суток больше 12, то отбрасываем данные за последние
       * сутки. Если меньше 12, то то отбрасываем данные за 2 последних.
       */
      const sliceEndIndexDay = arr.length > 12 ? -1 : -2;
      const dayTemp = arr.slice(0, sliceEndIndexDay).map((e) =>
        /**
         * Проверяем есть ли поле day в объекте с данными за сутки,
         * а также значение температуры.
         */
        e.day && e.day.temp_max !== undefined && e.day.temp_max !== null
          ? e.day.temp_max
          : null
      );
      /**
       * Если количество суток больше 12, то отбрасываем данные за последние
       * сутки.
       */
      const sliceEndIndexNight = arr.length > 12 ? arr.length : -1;
      /**
       * Для ночи отбрасываем донные за текущие сутки.
       */
      const nightTemp = arr.slice(1, sliceEndIndexNight).map((e) =>
        /**
         * Проверяем есть ли поле night в объекте с данными за сутки,
         * а также значение температуры.
         */
        e.night && e.night.temp_min !== undefined && e.night.temp_min !== null
          ? e.night.temp_min
          : null
      );
      /**
       * Вычисляем минимальную и максимальную температуру для ограничения
       * границ графика.
       */
      const min = Math.min(...nightTemp, ...dayTemp);
      const max = Math.max(...dayTemp, ...nightTemp);
      const unit = languageExpressions(getLocales, "units", "temp")[0];
      return [
        { unit, value: dayTemp, descr: "day", min, max },
        { unit, value: nightTemp, descr: "night", min, max },
      ];
    },
    /**
     * Возвращает данные для отображения таблицы подробного
     * почасового прогноза с разбивкой на часовые интервалы.
     * @param datasetsHourly Текущее состояние store.state.datasetsHourly.
     * @param getLocales Языковая метка.
     */
    hourlyTabTable({ datasetsHourly }, { getLocales }) {
      if (Object.keys(datasetsHourly).length === 0) return {};
      /**
       * Возвращает значение времени для последующей сортировки.
       * @param el Дата в строковом формате.
       */
      const sortData = (el) => {
        return parseInt(el.date.split("T")[1].slice(0, 2));
      };
      const obj = {};
      for (const key in datasetsHourly) {
        const arr = Object.values(datasetsHourly[key])
          .filter((i) => typeof i === "object")
          .sort((a, b) => sortData(a) - sortData(b));
        const weekday = setTimeFormat(arr[0].date, "l", getLocales);
        const day = setTimeFormat(arr[0].date, "d F", getLocales);
        const showArr = arr.map(
          ({
            condition,
            light,
            date,
            humidity,
            prec_sum,
            pressure,
            temp,
            wind_dir,
            wind_speed,
            feels_like,
          }) => {
            return {
              hour: date.split("T")[1].slice(0, 5),
              condition,
              date,
              light,
              humidity: `${humidity}${
                languageExpressions(getLocales, "units", "percent")[0]
              }`,
              prec_sum: `${prec_sum} ${
                languageExpressions(getLocales, "units", "precSum")[0]
              }`,
              pressure,
              temp: `${temp}${
                languageExpressions(getLocales, "units", "temp")[0]
              }`,
              feels_like: `${feels_like}${
                languageExpressions(getLocales, "units", "temp")[0]
              }`,
              wind_dir: [
                wind_dir,
                `${languageExpressions(getLocales, "windDir", wind_dir)[1]}`,
              ],
              wind_speed: `${wind_speed} ${
                languageExpressions(getLocales, "units", "speed")[0]
              }`,
            };
          }
        );
        const time =
          datasetsHourly[key]["sunrise"] && datasetsHourly[key]["sunset"]
            ? daytime(
                datasetsHourly[key]["sunrise"],
                datasetsHourly[key]["sunset"]
              )
            : undefined;
        obj[key] = {
          values: showArr,
          date: [weekday, day],
          polar: datasetsHourly[key]["polar"] ?? undefined,
          sunrise: datasetsHourly[key]["sunrise"],
          sunset: datasetsHourly[key]["sunset"],
          dayLength: {
            value: time,
            sunrise: datasetsHourly[key]["sunrise"]
              ? setTimeFormat(datasetsHourly[key]["sunrise"], "H:i", getLocales)
              : undefined,
            sunset: datasetsHourly[key]["sunset"]
              ? setTimeFormat(datasetsHourly[key]["sunset"], "H:i", getLocales)
              : undefined,
          },
        };
      }
      return obj;
    },
    /**
     * Возвращает данные для отображения карточки подробного прогноза на 10 дней.
     * Подробный прогноз ограничен 10 днями.
     * Из данных с сервера убираем текущие сутки и последние.
     * @param datasetsTenDays Текущее состояние store.state.datasetsTenDays.
     * @param getLocales Языковая метка.
     */
    tenDaysDetailsCard: ({ datasetsTenDays }, { getLocales }) => {
      const valuesArr = Object.values(datasetsTenDays);
      if (valuesArr.length === 0) return {};
      const sliceEndIndex = valuesArr.length > 12 ? 12 : valuesArr.length;
      const arr = valuesArr
        .slice(1, sliceEndIndex)
        .map((e, index, array) => {
          const formatWeekday = ["D", "l"];
          const weekday = formatWeekday.map((el) =>
            setTimeFormat(e.start_date, el, getLocales)
          );
          const formatDate = ["d.m", "d F"];
          const date = formatDate.map((el) =>
            setTimeFormat(e.start_date, el, getLocales)
          );
          const time =
            e.sunrise && e.sunset ? daytime(e.sunrise, e.sunset) : undefined;
          return {
            weekday,
            date,
            isOpen: e.isOpen,
            weekend: weekday[0] === "сб" || weekday[0] === "вс",
            condition: e.day.condition,
            condition_s: e.day.condition_s,
            precProb: {
              title: languageExpressions(
                getLocales,
                "climateIndicators",
                "precProb"
              ),
              value: `${e.day.prec_prob}${
                languageExpressions(getLocales, "units", "percent")[0]
              }`,
            },
            wind: {
              title: languageExpressions(
                getLocales,
                "climateIndicators",
                "wind"
              ),
              value: `${languageExpressions(
                getLocales,
                "windDir",
                e.day.wind_dir
              )[1].toUpperCase()} ${e.day.wind_speed} ${
                languageExpressions(getLocales, "units", "speed")[0]
              }`,
            },
            pressure: {
              title: languageExpressions(
                getLocales,
                "climateIndicators",
                "pressure"
              ),
              value: `${e.day.pressure}`,
            },
            wind_gust: {
              title: languageExpressions(
                getLocales,
                "climateIndicators",
                "windGust_1"
              ).split(" ")[0],
              value: `${e.day.wind_gust} ${
                languageExpressions(getLocales, "units", "speed")[0]
              }`,
            },
            comf_idx: {
              title: languageExpressions(
                getLocales,
                "climateIndicators",
                "comfort"
              ),
              value: `${e.day.comf_idx}0 ${
                languageExpressions(getLocales, "units", "percent")[0]
              }`,
            },
            humidity: {
              title: languageExpressions(
                getLocales,
                "climateIndicators",
                "humidity"
              ),
              value: `${e.day.humidity} ${
                languageExpressions(getLocales, "units", "percent")[0]
              }`,
            },
            temp: {
              min: `${addPlus(array[index + 1]?.night.temp_min)}${
                languageExpressions(getLocales, "units", "temp")[0]
              }`,
              max: `${addPlus(e.day.temp_max)}${
                languageExpressions(getLocales, "units", "temp")[0]
              }`,
            },
            uvi: {
              title: languageExpressions(
                getLocales,
                "climateIndicators",
                "uvi"
              ),
              value: e.day.uvi,
            },
            dayLength: {
              daytime: {
                title: languageExpressions(
                  getLocales,
                  "climateIndicators",
                  "daytime"
                ),
                value_mob: time,
                value: time,
              },
              sunrise: e.sunrise
                ? setTimeFormat(e.sunrise, "H:i", getLocales)
                : undefined,
              sunset: e.sunset
                ? setTimeFormat(e.sunset, "H:i", getLocales)
                : undefined,
              polar: e.polar ?? undefined,
            },
          };
        })
        .slice(0, -1);
      return arr;
    },
    /**
     * Возвращает данные для отображения графика и таблицы подробного
     * прогноза на 10 дней с разбивкой на 3-х часовые интервалы.
     * Из данных с сервера убираем текущие сутки и последние.
     * @param datasetsThreeHour Текущее состояние store.state.datasetsThreeHour.
     * @param getLocales Языковая метка.
     */
    tenDaysDetailsChart: ({ datasetsThreeHour }, { getLocales }) => {
      if (Object.keys(datasetsThreeHour).length === 0) return {};
      /**
       * Возвращает значение времени для последующей сортировки.
       * @param el Дата в строковом формате.
       */
      const sortData = (el) => {
        return parseInt(el.date.split("T")[1].slice(0, 2));
      };

      const filteredData = Object.keys(datasetsThreeHour)
        .slice(1, -1)
        .reduce((obj, key) => {
          obj[key] = datasetsThreeHour[key];
          return obj;
        }, {});
      const obj = {};
      for (const key in filteredData) {
        const arr = Object.values(filteredData[key])
          .filter((i) => typeof i === "object")
          .sort((a, b) => sortData(a) - sortData(b));
        const showArr = arr.map(
          ({
            condition,
            light,
            date,
            humidity,
            prec_sum,
            pressure,
            temp,
            feels_like,
            wind_dir,
            wind_speed,
          }) => {
            return {
              date,
              hour: date.split("T")[1].slice(0, 5),
              condition,
              light,
              humidity: {
                unit: languageExpressions(getLocales, "units", "percent")[0],
                value: humidity,
              },
              prec_sum: {
                value: prec_sum,
                unit: languageExpressions(getLocales, "units", "precSum")[0],
              },
              temp: {
                value: temp,
                unit: languageExpressions(getLocales, "units", "temp")[0],
              },
              feels_like: {
                value: feels_like,
                unit: languageExpressions(getLocales, "units", "temp")[0],
              },
              pressure: {
                value: pressure,
                unit: languageExpressions(getLocales, "units", "pressure")[0],
              },
              wind: {
                value: wind_speed,
                unit: languageExpressions(getLocales, "units", "speed")[0],
                wind_dir: [
                  wind_dir,
                  languageExpressions(getLocales, "windDir", wind_dir)[1],
                ],
              },
            };
          }
        );
        obj[key] = showArr;
      }
      const length = Object.keys(obj).length;
      obj.length = length;
      return obj;
    },
    /**
     * Возвращает скорректированные данные для отображения дельта графика подробного
     * почасового прогноза с разбивкой на часовые интервалы.
     * @param datasetsHourly Текущее состояние store.state.datasetsHourly.
     * @param datasetsFact Текущее состояние store.state.datasetsFact.
     * @param elem Объект с настройками для отрисовки графика.
     * @param getLocales Языковая метка.
     */
    calcAdjustingForecast:
      ({ datasetsFact, datasetsHourly }, { getLocales }) =>
      (elem) => {
        if (Object.keys(datasetsHourly).length === 0) return {};
        const periodAdjusted = elem.periodAdjusted;
        const obsTimeFact = {
          time: datasetsFact.obs_time,
          temp: datasetsFact.temp,
        };
        const firstForecastTime = {
          time: datasetsHourly[0][1].date,
          temp: datasetsHourly[0][1].temp,
        };
        const diffTime =
          (new Date(firstForecastTime.time) - new Date(obsTimeFact.time)) /
            (1000 * 60 * 60) -
          1;
        const deltaTemp = Math.abs(firstForecastTime.temp - obsTimeFact.temp);
        const indexPointMerge = periodAdjusted - diffTime;

        const sortData = (el) => {
          return parseInt(el.date.split("T")[1].slice(0, 2));
        };
        let dataArr = [];
        for (const key in datasetsHourly) {
          const arr = Object.values(datasetsHourly[key])
            .filter((i) => typeof i === "object")
            .map(({ temp, prec_sum, date, feels_like }) => {
              return {
                date,
                temp: {
                  value: temp,
                  unit: languageExpressions(getLocales, "units", "temp")[0],
                },
                prec_sum: {
                  value: prec_sum,
                  unit: languageExpressions(getLocales, "units", "precSum")[0],
                },
                feels_like: {
                  value:
                    periodAdjusted !== 0 && deltaTemp > 1
                      ? feels_like + deltaTemp
                      : feels_like,
                  unit: languageExpressions(getLocales, "units", "temp")[0],
                },
              };
            })
            .sort((a, b) => sortData(a) - sortData(b));
          dataArr = dataArr.concat(arr);
        }
        const ajustingDataArr = dataArr.map((e, index) => {
          let calcTemp;
          /**
           * Задаем условия применения функции корректировки.
           */
          if (
            index < indexPointMerge &&
            periodAdjusted !== 0 &&
            deltaTemp > 1
          ) {
            calcTemp =
              e.temp.value +
              deltaTemp * elem.func(periodAdjusted, diffTime, index);
          } else {
            calcTemp = e.temp.value;
          }
          return {
            ...e,
            temp: {
              value: Math.round(calcTemp),
              unit: languageExpressions(getLocales, "units", "temp")[0],
            },
          };
        });
        return {
          value: ajustingDataArr,
          descr: elem.title,
        };
      },
    /**
     * Данные со стороннего API.
     * GFS & HRRR Forecast API
     */
    datasetsAPI: (
      { datasetsHourly, dataFromAPI, chartSettings },
      { getLocales, calcAdjustingForecast }
    ) => {
      if (
        Object.keys(datasetsHourly).length === 0 ||
        Object.keys(dataFromAPI).length === 0
      )
        return {};

      const copyAPITime = [...dataFromAPI.time];
      const copyAPITemp = [...dataFromAPI.temperature_2m];
      const startTime = datasetsHourly[0][1].date;
      const isEqualTime = (elem) => new Date(startTime) - new Date(elem) === 0;
      const startIndex = copyAPITime.findIndex(isEqualTime);
      const finishedIndex = calcAdjustingForecast(chartSettings[0]).value
        .length;
      const spliceArrTime = copyAPITime.splice(startIndex, finishedIndex);
      const spliceArrTemp = copyAPITemp.splice(startIndex, finishedIndex);
      const arr = spliceArrTime.map((elem, index) => {
        return {
          temp: {
            value: Math.round(spliceArrTemp[index]),
            unit: languageExpressions(getLocales, "units", "temp")[0],
          },
          prec_sum: {
            value: 0,
            unit: languageExpressions(getLocales, "units", "precSum")[0],
          },
          feels_like: {
            value: "",
            unit: "",
          },
        };
      });
      return {
        value: arr,
        descr: "api",
      };
    },
    /**
     * Возвращает объект данных для отображения графиков подробного
     * почасового прогноза с разбивкой на часовые интервалы.
     * @param chartSettings Текущее состояние store.state.chartSettings.
     * @param calcAdjustingForecast Геттер вычисления данных для графика.
     */
    datasetsForHourlyCharts: (
      { chartSettings },
      { calcAdjustingForecast, datasetsAPI }
    ) => {
      if (
        Object.keys(calcAdjustingForecast).length === 0 &&
        Object.keys(datasetsAPI).length === 0
      )
        return {};
      const data = chartSettings.map((e) => calcAdjustingForecast(e));
      data.push(datasetsAPI);
      const arr = data.reduce((total, current) => {
        return [...total, ...current.value];
      }, []);
      const min = Math.min(...arr.map((e) => e.temp.value));
      const max = Math.max(...arr.map((e) => e.temp.value));
      return {
        min,
        max,
        data,
      };
    },
    /**
     * Возвращает данные для температурных карточек на корте.
     */
    cardMapData: ({ datasetsMap }) => {
      return datasetsMap;
    },
    /**
     *
     * Возвращает список городов.
     */
    getListCities: ({ listOfCities }) => {
      return listOfCities
        .sort((a, b) => a.name_ru.localeCompare(b.name_ru))
        .map((e) => {
          return { ...e, name_en: e.name_en.toLocaleLowerCase() };
        });
    },
  },
  mutations: {
    /**
     * Заполняет store данными, полученными с бэкэнда, предварительно их модифицировав.
     * @param state Текущее состояние store.state.
     * @param forecast_1 Прогноз по часу начиная с текущего часа.
     * @param forecast_24  Прогноз по полусуткам "день" (с 9:00 до 21:00),
     * "ночь" (с 21:00 до 09:00).
     * @param forecast_3 Прогноз по 3 часа начиная с текущего часа.
     * @param fact Информация о фактической погоде.
     */
    setData(state, { forecast_1, forecast_24, forecast_3, fact }) {
      //fact datasets
      state.datasetsFact = fact;
      /**
       * Выбираем необходимые данные для часового прогноза.
       * hourly datasets
       */
      const filteredDatasets = Object.keys(forecast_1)
        .filter((key) => key !== "3" && key !== "start_date")
        .reduce((obj, key) => {
          const addObj = Object.keys(forecast_1[key]).reduce((total, p) => {
            total[p] =
              typeof forecast_1[key][p] === "object"
                ? {
                    ...forecast_1[key][p],
                    prec_sum: +(Math.random() * 10).toFixed(1),
                  }
                : forecast_1[key][p];
            return total;
          }, {});
          obj[key] = addObj;
          return obj;
        }, {});
      state.datasetsHourly = filteredDatasets;
      /**
       * Выбираем необходимые данные для подробного прогноза с разбивой на 3 часа.
       * Three Hour Datasets
       */
      const filteredThreeHourDatasets = Object.keys(forecast_3)
        .filter((key) => key !== "start_date")
        .reduce((obj, key) => {
          const addObj = Object.keys(forecast_3[key]).reduce((total, p) => {
            total[p] =
              typeof forecast_3[key][p] === "object"
                ? {
                    ...forecast_3[key][p],
                    prec_sum: +(Math.random() * 10).toFixed(1),
                  }
                : forecast_3[key][p];
            return total;
          }, {});
          obj[key] = addObj;
          return obj;
        }, {});
      state.datasetsThreeHour = filteredThreeHourDatasets;
      /**
       * Выбираем необходимые данные для прогноза  на 7-14 дней.
       * 7-14 days datasets
       */
      const filteredTenDatasets = Object.keys(forecast_24).reduce(
        (obj, key, index) => {
          const addObj = Object.keys(forecast_24[key]).reduce((total, p) => {
            total[p] =
              typeof forecast_24[key][p] === "object"
                ? {
                    ...forecast_24[key][p],
                    prec_sum: +(Math.random() * 10).toFixed(1),
                  }
                : forecast_24[key][p];
            return total;
          }, {});
          addObj.isOpen = index === 1 ? true : false;
          obj[key] = addObj;
          return obj;
        },
        {}
      );
      state.datasetsTenDays = filteredTenDatasets;
    },
    /**
     *
     * @param state Текущее состояние store.state.
     * @param hourly Прогноз по часу начиная с текущего часа.
     */
    setDataAPI(state, { hourly }) {
      state.dataFromAPI = hourly;
    },
    /**
     * Вызывается когда пользователь кликает на
     * карточку с подробным прогнозом.
     * Закрываем все открытые графики и открываем выбранный.
     * Данное поведение реализовано через смену значения поля isOpen.
     * @param state Текущее состояние store.state.
     * @param index Код карточки.
     */
    toggleDetails(state, [index, num]) {
      // Object.keys(state.datasetsTenDays).map(
      //   (e) => (state.datasetsTenDays[e].isOpen = false)
      // );
      // state.datasetsTenDays[index].isOpen = true;
      if (index < num) {
        Object.keys(state.datasetsTenDays).map(
          (e) => (state.datasetsTenDays[e].isOpen = false)
        );
        state.datasetsTenDays[index].isOpen = true;
      }
    },
  },
  actions: {
    /**
     * Вызывается когда пользователь кликает на
     * карточку с подробным прогнозом.
     * @param index Код карточки.
     */
    index({ commit, getters }, index) {
      const num = getters.tenDaysDetailsChart.length + 1;
      commit("toggleDetails", [index, num]);
    },
  },
});
