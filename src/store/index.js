import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import {
  SET_DATA_FORECAST,
  setDataForecast,
  SET_DATA_API,
  setDataAPI,
  CHANGE_OPENING_CARD,
  changeOpeningCard,
  SET_LIST_ALL_CITIES,
  setListAllCities,
  SET_MAP_DATA_SET,
  setMapDataset,
  SET_LIST_TOP_CITIES,
  setListTopCities,
  SET_CONSTANTS,
  setConstants,
  SET_CITY,
  setCity,
  SET_LOCALE,
  setLocale,
  SET_SUPPORTED_LOCALES,
  setSupportedLocales,
  LOADING,
  loading,
  INIT_COMMIT,
  initCommit,
  SET_INITIAL_LS,
  setInitialLS,
} from "./mutations";
/**
 * Вспомогательные функции:
 * @func setTimeFormat Возвращает в заданном формате время, доту.
 * @func daytime Возвращает долготу дня в часах и минутах.
 * @func addPlus Добовляет знак +, если значение парометра больше нуля.
 */
import {
  setTimeFormat,
  daytime,
  addPlus,
  choiceNameByLocale,
  choiceAreaByLocale,
  capitalize,
} from "@/constants/functions";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    /**
     * Свойство определяет текущую языковую локаль.
     * Значение по умолчанию undefined.
     */
    currentLocale: undefined,
    /**
     * Массив с поддерживаемыми языками.
     */
    supportedLocales: [],
    /**
     * Объект с переводами.
     */
    translatedConstants: {},
    /**
     * Название страны с учетом локалей.
     */
    country_loc: {
      ru: "Армения",
      en: "Armenia",
      am: "Հայաստանի",
    },
    /**
     * Устанавливаем город по умолчанию.
     */
    defaultCity: "yerevan",
    /**
     * Устанавливаем город по умолчанию.
     */
    defaultLocale: "ru",
    /**
     * Город для которого выводится прогноз погоды.
     */
    citySelected: "",
    /**
     * Лоадер.
     */
    loading: false,
    /**
     * Флаг состояния загрузки данных с сервера.
     */
    isDataLoad: false,
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
      // {
      //   title: "linear_8",
      //   periodAdjusted: 8,
      //   func: (periodAdjusted, diffTime, index) =>
      //     (periodAdjusted - diffTime - index - 1) / (periodAdjusted - 1),
      // },
      // {
      //   title: "exp_12",
      //   periodAdjusted: 12,
      //   func: (periodAdjusted, diffTime, index) => 1 / Math.exp(index),
      // },
    ],
    /**
     * Данные для карточек на карте.
     */
    datasetsMap: [],
    /**
     * Список всех городов Армении.
     */
    listAllCities: [],
    /**
     * Самые населенные города Армении.
     */
    listTopCities: [],
  },
  getters: {
    /**
     * Возвращает языковую метку.
     * @example
     * "ru"
     * @param state Текущее состояние store.
     */
    getLocale(state) {
      return state.currentLocale;
    },
    /**
     * Возвращает языковую метку для отображения ее в URL.
     * @example
     * "en"
     * @param state Текущее состояние store.
     */
    getLocaleURL(state) {
      return state.currentLocale === state.defaultLocale
        ? undefined
        : state.currentLocale;
    },
    /**
     * Возвращает массив с поддерживаемыми языками.
     * @param state Текущее состояние store.
     */
    SupportedLocalesForSwitcher(state, { getLocale }) {
      const orderedByLocale = (locale) => {
        const filtred = state.supportedLocales.filter(
          ({ key }) => key !== locale
        );
        const found = state.supportedLocales.find(({ key }) => key === locale);
        filtred.unshift(found);
        return filtred;
      };
      switch (getLocale) {
        case state.defaultLocale:
          return orderedByLocale(getLocale);
        case "en":
          return orderedByLocale(getLocale);
        default:
          return state.supportedLocales;
      }
    },
    /**
     * Возвращает зодонную порометрами языковую константу.
     */
    getConstantLocale:
      ({ translatedConstants }, { getLocale }) =>
      (key, name) => {
        return key !== undefined && name !== undefined
          ? translatedConstants[getLocale][key][name]
          : key !== undefined
          ? translatedConstants[getLocale][key]
          : (console.log(
              "Не найден ключ и/или имя параметра в языковых константах!"
            ),
            undefined);
      },
    /**
     * Геттер с условиями для отображения лоадера.
     * @param state Текущее состояние store.
     */
    loading(state) {
      return state.loading;
    },
    getCountryNameLoc({ country_loc }, { getLocale }) {
      const countryName = country_loc[getLocale];
      return capitalize(countryName);
    },
    /**
     * Возвращает город для которого будет выводится прогноз.
     * @param citySelected Текущее значение store.citySelected.
     * @param listAllCities Текущее значение store.listAllCities.
     * @param getLocale Текущее значение store.getLocale.
     * @example
     * {name_en:"amasia",name_loc_choice:"Амасия"}
     */
    getCitySelected({ listAllCities, citySelected }, { getLocale }) {
      const city = listAllCities.find(
        ({ name_en }) => name_en.toLowerCase() === citySelected.toLowerCase()
      );
      if (!city) {
        return;
      }
      const cityName = choiceNameByLocale(getLocale, city);
      return {
        name_en: city.name_en.toLowerCase(),
        name_loc_choice: capitalize(cityName),
      };
    },
    getListAllCities({ listAllCities }) {
      return listAllCities;
    },
    /**
     * Возвращает данные для отображения в шапке виджета.
     * Левая часть.
     * @param state Текущее состояние store.
     * @param getLocale Языковая метка.
     */
    currentBlock(
      state,
      { getLocale, datasetsForHourlyCharts, getConstantLocale }
    ) {
      if (Object.keys(state.datasetsHourly).length === 0) return {};
      /**
       * Данные используемые для отоброжения. Берем прогнозные данные
       * за текущий час из часового прогноза.
       */
      const data = state.datasetsHourly[0][1];
      const time = setTimeFormat(new Date(), "H:i", getLocale);
      const tempData = datasetsForHourlyCharts.data[1].value[0];
      return {
        timeText: `${getConstantLocale(
          "currentBlock",
          "now"
        )} ${time} ${getConstantLocale("currentBlock", "forecast")}`,
        condition: data.condition,
        condition_s:
          // Проверяем из какого поля брать данные для отображения.
          getLocale !== "ru"
            ? getConstantLocale("weather_sign", data.condition)
            : data.condition_s,
        temp: `${addPlus(tempData.temp.value)}${
          getConstantLocale("units", "temp")[0]
        }`,
        realFeel: `${getConstantLocale("currentBlock", "feelsLike")} ${addPlus(
          tempData.feels_like.value
        )}`,
      };
    },
    /**
     * Возвращает данные для отображения в шапке виджета.
     * Правая часть.
     * @param state Текущее состояние store.
     * @param getLocale Языковая метка.
     */
    datasetCurrentBlockItem(state, { getConstantLocale }) {
      if (Object.keys(state.datasetsHourly).length === 0) return {};
      const data = state.datasetsHourly[0][1];
      return [
        {
          icon: "wind-direction-grey",
          title: `${getConstantLocale("climateIndicators", "wind")}:`,
          value: `${data.wind_speed} ${getConstantLocale("units", "speed")[0]}`,
          wind_dir: [
            data.wind_dir,
            getConstantLocale("windDir", data.wind_dir)[1],
          ],
        },
        {
          icon: "wind-gust",
          title: `${getConstantLocale("climateIndicators", "windGust_1")}:`,
          value: `${data.wind_gust} ${getConstantLocale("units", "speed")[0]}`,
          wind_dir: [data.wind_dir],
        },
        {
          icon: "pressure",
          title: `${getConstantLocale("climateIndicators", "pressure")}:`,
          value: `${data.pressure} ${
            getConstantLocale("units", "pressure")[0]
          }`,
        },
        {
          icon: "humidity",
          title: `${getConstantLocale("climateIndicators", "humidity")}:`,
          value: `${data.humidity}${getConstantLocale("units", "percent")[0]}`,
        },
      ];
    },
    /**
     * Возвращает значения температур и другие данные для таблицы и графика на вкладке
     * "Прогноз погоды на 7-14 дней".
     * @param datasetsTenDays Текущее состояние store.state.datasetsTenDays.
     * @param getLocale Языковая метка.
     */
    tenDaysTabTable: (
      { datasetsTenDays },
      { getLocale, getConstantLocale }
    ) => {
      const valuesArr = Object.values(datasetsTenDays);
      if (valuesArr.length === 0) return {};
      /**
       * Если количество дней больше 12, то отбрасываем данные за последний
       * день. Если меньше 12, то то отбрасываем данные за 2 последних дня.
       */
      const sliceEndIndex = valuesArr.length > 12 ? -1 : -2;
      const arr = valuesArr.slice(0, sliceEndIndex).map((e) => {
        const weekday = setTimeFormat(
          e.start_date,
          "D",
          getLocale
        ).toLowerCase();
        return {
          weekday: weekday,
          weekend:
            weekday === `${getConstantLocale("weekendDays")[0]}` ||
            weekday === `${getConstantLocale("weekendDays")[1]}`,
          date: setTimeFormat(e.start_date, "d.m", getLocale),
          condition: e.day.condition,
          prec_sum: {
            value: e.day.prec_sum,
            unit: getConstantLocale("units", "precSum")[0],
          },
          wind: {
            value: e.day.wind_speed,
            unit: getConstantLocale("units", "speed")[0],
            wind_dir: [
              e.day.wind_dir,
              getConstantLocale("windDir", e.day.wind_dir)[1],
            ],
          },
          pressure: {
            value: e.day.pressure,
            unit: getConstantLocale("units", "pressure")[0],
          },
          humidity: {
            value: e.day.humidity,
            unit: getConstantLocale("units", "percent")[0],
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
    tenDaysTabTempCharts: ({ datasetsTenDays }, { getConstantLocale }) => {
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
      const unit = getConstantLocale("units", "temp")[0];
      return [
        { unit, value: dayTemp, descr: "day", min, max },
        { unit, value: nightTemp, descr: "night", min, max },
      ];
    },
    /**
     * Возвращает данные для отображения таблицы подробного
     * почасового прогноза с разбивкой на часовые интервалы.
     * @param datasetsHourly Текущее состояние store.state.datasetsHourly.
     * @param getLocale Языковая метка.
     */
    hourlyTabTable({ datasetsHourly }, { getLocale, getConstantLocale }) {
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
        const weekday = setTimeFormat(arr[0].date, "l", getLocale);
        const day = setTimeFormat(arr[0].date, "d F", getLocale);
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
                getConstantLocale("units", "percent")[0]
              }`,
              prec_sum: `${prec_sum} ${
                getConstantLocale("units", "precSum")[0]
              }`,
              pressure,
              temp: `${temp}${getConstantLocale("units", "temp")[0]}`,
              feels_like: `${feels_like}${
                getConstantLocale("units", "temp")[0]
              }`,
              wind_dir: [
                wind_dir,
                `${getConstantLocale("windDir", wind_dir)[1]}`,
              ],
              wind_speed: `${wind_speed} ${
                getConstantLocale("units", "speed")[0]
              }`,
            };
          }
        );
        const time =
          datasetsHourly[key]["sunrise"] && datasetsHourly[key]["sunset"]
            ? daytime(
                datasetsHourly[key]["sunrise"],
                datasetsHourly[key]["sunset"],
                getConstantLocale
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
              ? setTimeFormat(datasetsHourly[key]["sunrise"], "H:i", getLocale)
              : undefined,
            sunset: datasetsHourly[key]["sunset"]
              ? setTimeFormat(datasetsHourly[key]["sunset"], "H:i", getLocale)
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
     * @param getLocale Языковая метка.
     */
    tenDaysDetailsCard: (
      { datasetsTenDays },
      { getLocale, getConstantLocale }
    ) => {
      const valuesArr = Object.values(datasetsTenDays);
      if (valuesArr.length === 0) return {};
      const sliceEndIndex = valuesArr.length > 12 ? 12 : valuesArr.length;
      const arr = valuesArr
        .slice(1, sliceEndIndex)
        .map((e, index, array) => {
          const formatWeekday = ["D", "l"];
          const weekday = formatWeekday.map((el) =>
            setTimeFormat(e.start_date, el, getLocale).toLowerCase()
          );
          const formatDate = ["d.m", "d F"];
          const date = formatDate.map((el) =>
            setTimeFormat(e.start_date, el, getLocale)
          );
          const time =
            e.sunrise && e.sunset
              ? daytime(e.sunrise, e.sunset, getConstantLocale)
              : undefined;
          return {
            weekday,
            date,
            isOpen: e.isOpen,
            weekend:
              weekday[0] === getConstantLocale("weekendDays")[0] ||
              weekday[0] === getConstantLocale("weekendDays")[1],
            condition: e.day.condition,
            condition_s:
              // Проверяем из какого поля брать данные для отображения.
              getLocale !== "ru"
                ? getConstantLocale("weather_sign", e.day.condition)
                : e.day.condition_s,
            precProb: {
              title: getConstantLocale("climateIndicators", "precProb"),
              value: `${e.day.prec_prob}${
                getConstantLocale("units", "percent")[0]
              }`,
            },
            wind: {
              title: getConstantLocale("climateIndicators", "wind"),
              value: `${getConstantLocale(
                "windDir",
                e.day.wind_dir
              )[1].toUpperCase()} ${e.day.wind_speed} ${
                getConstantLocale("units", "speed")[0]
              }`,
            },
            pressure: {
              title: getConstantLocale("climateIndicators", "pressure"),
              value: `${e.day.pressure}`,
            },
            wind_gust: {
              title: getConstantLocale("climateIndicators", "windGust_1").split(
                " "
              )[0],
              value: `${e.day.wind_gust} ${
                getConstantLocale("units", "speed")[0]
              }`,
            },
            comf_idx: {
              title: getConstantLocale("climateIndicators", "comfort"),
              value: `${e.day.comf_idx}0 ${
                getConstantLocale("units", "percent")[0]
              }`,
            },
            humidity: {
              title: getConstantLocale("climateIndicators", "humidity"),
              value: `${e.day.humidity} ${
                getConstantLocale("units", "percent")[0]
              }`,
            },
            temp: {
              min: `${addPlus(array[index + 1]?.night.temp_min)}${
                getConstantLocale("units", "temp")[0]
              }`,
              max: `${addPlus(e.day.temp_max)}${
                getConstantLocale("units", "temp")[0]
              }`,
            },
            uvi: {
              title: getConstantLocale("climateIndicators", "uvi"),
              value: e.day.uvi,
            },
            dayLength: {
              daytime: {
                title: getConstantLocale("climateIndicators", "daytime"),
                value_mob: time,
                value: time,
              },
              sunrise: e.sunrise
                ? setTimeFormat(e.sunrise, "H:i", getLocale)
                : undefined,
              sunset: e.sunset
                ? setTimeFormat(e.sunset, "H:i", getLocale)
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
     * @param getLocale Языковая метка.
     */
    tenDaysDetailsChart: ({ datasetsThreeHour }, { getConstantLocale }) => {
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
                unit: getConstantLocale("units", "percent")[0],
                value: humidity,
              },
              prec_sum: {
                value: prec_sum,
                unit: getConstantLocale("units", "precSum")[0],
              },
              temp: {
                value: temp,
                unit: getConstantLocale("units", "temp")[0],
              },
              feels_like: {
                value: feels_like,
                unit: getConstantLocale("units", "temp")[0],
              },
              pressure: {
                value: pressure,
                unit: getConstantLocale("units", "pressure")[0],
              },
              wind: {
                value: wind_speed,
                unit: getConstantLocale("units", "speed")[0],
                wind_dir: [wind_dir, getConstantLocale("windDir", wind_dir)[1]],
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
     * @param getLocale Языковая метка.
     */
    calcAdjustingForecast:
      ({ datasetsFact, datasetsHourly }, { getConstantLocale }) =>
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
        const deltaTemp = obsTimeFact.temp - firstForecastTime.temp;
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
                  unit: getConstantLocale("units", "temp")[0],
                },
                prec_sum: {
                  value: prec_sum,
                  unit: getConstantLocale("units", "precSum")[0],
                },
                feels_like: {
                  value:
                    periodAdjusted !== 0 && Math.abs(deltaTemp) > 1
                      ? feels_like + deltaTemp
                      : feels_like,
                  unit: getConstantLocale("units", "temp")[0],
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
            Math.abs(deltaTemp) > 1
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
              unit: getConstantLocale("units", "temp")[0],
            },
          };
        });
        return {
          value:
            elem.title === "linear_6"
              ? ajustingDataArr.slice(0, 7)
              : ajustingDataArr,
          descr: elem.title,
        };
      },
    /**
     * Данные со стороннего API.
     * GFS & HRRR Forecast API
     */
    datasetsAPI: (
      { datasetsHourly, dataFromAPI, chartSettings },
      { getConstantLocale, calcAdjustingForecast }
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
            unit: getConstantLocale("units", "temp")[0],
          },
          prec_sum: {
            value: 0,
            unit: getConstantLocale("units", "precSum")[0],
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
      // data.push(datasetsAPI);

      //---finding min max
      // const redArr = data.map(({ value }) => {
      //   const arr = value.map((e) => e.temp.value);
      //   const min = Math.min(...arr);
      //   const max = Math.max(...arr);
      //   return { min, max };
      // });

      // const min = Math.min(...redArr.map((e) => e.min));
      // const max = Math.max(...redArr.map((e) => e.max));

      const obj = data.reduce((total, { value }) => {
        const arr = value.map((e) => e.temp.value);
        const min = Math.min(...arr);
        const max = Math.max(...arr);
        total.min < min ? total.min : min;
        total.max > max ? total.max : max;
        // total.min = total.min < min ? total.min : min;
        // total.max = total.max > max ? total.max : max;
        // return total;
        return {
          ...total,
          min: total.min < min ? total.min : min,
          max: total.max > max ? total.max : max,
        };
      }, {});
      return {
        min: obj.min,
        max: obj.max,
        data,
      };
    },
    /**
     * Возвращает данные для температурных карточек на корте.
     */
    cardMapData: (
      { datasetsMap, listAllCities },
      { getLocale, getConstantLocale }
    ) => {
      // Добавляем ключ name_loc в state.datasetMap
      const arr = datasetsMap.map((value) => {
        const { name_loc } = listAllCities.find(
          ({ name_en }) => name_en === value.name_en
        );
        return { ...value, name_loc };
      });
      return arr.map((e) => {
        const cityName = choiceNameByLocale(getLocale, e);
        const localDetails = e.details?.map((value) => {
          const nameDaymarker = getConstantLocale("timeMarker").find(
            ([key]) => key === value.name
          );
          return {
            ...value,
            name: nameDaymarker[1],
          };
        });
        const localCondition = getConstantLocale(
          "weather_sign",
          e.now.condition
        );
        e.now.condition_s = localCondition;
        return {
          area_en: e.area_en,
          details: localDetails,
          home: e.home,
          name_en: e.name_en.toLowerCase(),
          name_loc_choice: cityName,
          now: e.now,
          overmorrow: e.overmorrow,
          tomorrow: e.tomorrow,
          x_svg: e.x_svg,
          y_svg: e.y_svg,
        };
      });
    },
    /**
     *
     * Возвращает самые населенные города Армении.
     */
    getListTopCities: ({ listTopCities }, { getLocale }) => {
      return listTopCities
        .map((e) => {
          const cityName = choiceNameByLocale(getLocale, e);
          return {
            temp: e.temp,
            name_en: e.name_en.toLowerCase(),
            name_loc_choice: cityName,
          };
        })
        .sort((a, b) => a.name_loc_choice.localeCompare(b.name_loc_choice));
    },
    /**
     * Возвращает сгрупированный по алфавиту список городов.
     */
    getGroupListAllCities:
      ({ listAllCities }, { getLocale }) =>
      (name) => {
        const callback = (acc, cur) => {
          const city = cur.name_loc_choice;
          if (city) {
            const firstLetter = city[0].toUpperCase();
            // if (!Object.hasOwn(acc, firstLetter)) {
            //   acc[firstLetter] = [];
            // }
            // acc[firstLetter].push(cur);

            acc[firstLetter] === undefined
              ? (acc[firstLetter] = [cur])
              : acc[firstLetter].push(cur);
            // { ...acc, [firstLetter]: [...(acc[firstLetter] || []), cur] };
          }
          return acc;
        };
        const obj = listAllCities
          .map((e) => {
            const cityName = choiceNameByLocale(getLocale, e);
            const area = choiceAreaByLocale(getLocale, e, "");
            const area_l5 = choiceAreaByLocale(getLocale, e, "_l5");
            const formatArea_ru = (str) =>
              str.split(" ").length > 1 ? `${str.slice(0, -4)}.,` : str;
            const formatArea_ru_l5 = (str) => {
              if (str === "") return "";
              const arr = str.split("");
              arr.splice(-4, 3, "-");
              return arr.join("");
            };
            return {
              name_en: e.name_en.toLowerCase(),
              name_loc_choice: cityName,
              area,
              area_l5,
              /**
               * Для русского языка используем заданное форматирование.
               * @example
               * Гехаркуникская обл., Чамбаракский р-н
               */
              area_f: getLocale === "ru" ? formatArea_ru(area) : `${area}, `,
              area_l5_f:
                getLocale === "ru" ? formatArea_ru_l5(area_l5) : `${area_l5}`,
            };
          })
          .sort((a, b) => a.name_loc_choice.localeCompare(b.name_loc_choice))
          .reduce(callback, {});
        const entries = Object.entries(obj);
        const filtered = entries
          .map(([key, value]) => {
            const filteredValue =
              name === "all"
                ? value
                : value.filter((f) => {
                    return f.area.toLowerCase() === name.toLowerCase();
                  });
            return filteredValue.length > 0 ? [key, filteredValue] : undefined;
          })
          .filter((f) => f);
        const filtredObj = Object.fromEntries(filtered);
        return filtredObj;
      },
    /**
     * Возвращает список областей.
     */
    getListArea: ({ listAllCities }, { getLocale }) => {
      const obj = {};
      listAllCities.forEach(
        (val) => (obj[choiceAreaByLocale(getLocale, val, "")] = true)
      );
      const arr = Object.keys(obj).sort((a, b) => a.localeCompare(b));
      return arr;
    },
  },
  mutations: {
    [SET_DATA_FORECAST]: setDataForecast,
    [SET_DATA_API]: setDataAPI,
    [CHANGE_OPENING_CARD]: changeOpeningCard,
    [SET_LIST_ALL_CITIES]: setListAllCities,
    [SET_MAP_DATA_SET]: setMapDataset,
    [SET_LIST_TOP_CITIES]: setListTopCities,
    [SET_CONSTANTS]: setConstants,
    [SET_CITY]: setCity,
    [SET_LOCALE]: setLocale,
    [SET_SUPPORTED_LOCALES]: setSupportedLocales,
    [LOADING]: loading,
    [INIT_COMMIT]: initCommit,
    [SET_INITIAL_LS]: setInitialLS,
  },
  actions: {
    /**
     * Вызывается когда пользователь кликает на
     * карточку с подробным прогнозом.
     * @param index Код карточки.
     */
    setCardIndex({ commit }, index) {
      commit(CHANGE_OPENING_CARD, index);
    },
    /**
     * Get data from Internal vs External APIs.
     */
    loadData: async ({ commit }) => {
      commit(LOADING, true);
      try {
        const res = await Promise.all([
          axios.get("/forecast.json"),
          axios.get("/forecastFromAPI.json"),
          axios.get("/cities_all.json"),
          axios.get("/map_dataset.json"),
          axios.get("/top_cities.json"),
          axios.get("/translated_constants.json"),
          axios.get("/supported-locales.json"),
          new Promise((resolve) => setTimeout(() => resolve("done"), 500)),
        ]);
        const [
          total,
          data,
          cities,
          mapDataset,
          topCities,
          constants,
          supportedLocales,
        ] = res.map(({ data }) => data);

        commit(SET_DATA_FORECAST, total);
        commit(SET_DATA_API, data);
        commit(SET_LIST_ALL_CITIES, cities);
        commit(SET_MAP_DATA_SET, mapDataset);
        commit(SET_LIST_TOP_CITIES, topCities);
        commit(SET_CONSTANTS, constants);
        commit(SET_SUPPORTED_LOCALES, supportedLocales);
      } catch (error) {
        console.error("Error! Could not reach the API. " + error);
      }
    },

    setParams: async ({ state, commit, dispatch }, { langURL, cityURL }) => {
      if (state.isDataLoad) {
        commit(SET_LOCALE, langURL);
        commit(SET_CITY, cityURL);
        return 200;
      }

      const defaultCity = state.defaultCity;
      const langLS = localStorage.getItem("lang");
      const cityLS = localStorage.getItem("city");
      await dispatch("loadData");

      const setLang = () => {
        if (!langURL) {
          return langLS ?? undefined;
        }

        const isLocaleSupported = state.supportedLocales.some(
          (obj) => obj.key.toLowerCase() === langURL.toLowerCase()
        );

        return isLocaleSupported ? langURL : null;
      };

      const selectCity = () => {
        if (!cityURL) {
          return cityLS ?? defaultCity;
        }

        const hasCityInTheList = state.listAllCities.some(
          (obj) => obj.name_en.toLowerCase() === cityURL.toLowerCase()
        );

        return hasCityInTheList ? cityURL : null;
      };

      const city = selectCity();
      const lang = setLang();

      if (lang === null || city === null) {
        commit(SET_LOCALE, langLS ?? undefined);
        commit(SET_CITY, cityLS ?? defaultCity);
        commit(INIT_COMMIT, true);
        return 404;
      }

      commit(SET_LOCALE, lang);
      commit(SET_CITY, city);
      commit(INIT_COMMIT, true);
      return 100;
    },
  },
});
