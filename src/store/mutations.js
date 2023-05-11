/**
 * Заполняет store прогнозными данными, полученными с
 * бэкэнда, предварительно их модифицировав.
 * @param state Текущее состояние store.state.
 * @param forecast_1 Прогноз по часу начиная с текущего часа.
 * @param forecast_24  Прогноз по полусуткам "день" (с 9:00 до 21:00),
 * "ночь" (с 21:00 до 09:00).
 * @param forecast_3 Прогноз по 3 часа начиная с текущего часа.
 * @param fact Информация о фактической погоде.
 */
export const SET_DATA_FORECAST = "setDataForecast";
export const setDataForecast = (
  state,
  { forecast_1, forecast_24, forecast_3, fact }
) => {
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
};
/**
 * Заполняет store прогнозными данными, полученными со
 * стороннего API.
 * @param state Текущее состояние store.state.
 * @param hourly Прогноз по часу начиная с текущего часа.
 */
export const SET_DATA_API = "setDataAPI";
export const setDataAPI = (state, { hourly }) => {
  state.dataFromAPI = hourly;
};
/**
 * Вызывается когда пользователь кликает на
 * карточку с подробным прогнозом.
 * Закрываем все открытые графики и открываем выбранный.
 * Данное поведение реализовано через смену значения поля isOpen.
 * @param state Текущее состояние store.state.
 * @param index Код карточки.
 */
export const CHANGE_OPENING_CARD = "changeOpeningCard";
export const changeOpeningCard = (state, index) => {
  Object.keys(state.datasetsTenDays).map(
    (e) => (state.datasetsTenDays[e].isOpen = false)
  );
  state.datasetsTenDays[index].isOpen = true;
};
/**
 * Массив объектов с данными по всем городам.
 * @param state Текущее состояние store.state.
 * @param cities Массив с данными по городам.
 */
export const SET_LIST_ALL_CITIES = "setListAllCities";
export const setListAllCities = (state, { cities }) => {
  state.listAllCities = cities;
};
/**
 * Массив объектов с данными для карточек на карте.
 * @param state Текущее состояние store.state.
 * @param datasetsMap Данные для карточек на карте.
 */
export const SET_MAP_DATA_SET = "setMapDataset";
export const setMapDataset = (state, { datasetsMap }) => {
  state.datasetsMap = datasetsMap;
};
/**
 * Массив объектов с данными по наиболее крупным городам.
 * @param state Текущее состояние store.state.
 * @param topCities Массив с данными по городам.
 */
export const SET_LIST_TOP_CITIES = "setListTopCities";
export const setListTopCities = (state, { topCities }) => {
  state.listTopCities = topCities;
};
/**
 * Записываем в стор объект с переводами.
 */
export const SET_CONSTANTS = "setConstants";
export const setConstants = (state, constants) => {
  state.translatedConstants = constants;
};
/**
 * Изменяем город для которого выводится прогноз в сторе.
 */
export const SET_CITY = "setCity";
export const setCity = (state, city) => {
  if (city === undefined) return;
  state.citySelected = city.toLowerCase();
  // Сохраняем название города на английском в local storage.
  localStorage.setItem("city", state.citySelected);
};
/**
 * Изменяем текущую локаль в сторе.
 */
export const SET_LOCALE = "setLocale";
export const setLocale = (state, localeStr) => {
  if (localeStr === undefined || localeStr === null) {
    state.currentLocale = state.defaultLocale;
    // Удаляем локаль из local storage, если выбран язык по умолчанию.
    localStorage.removeItem("lang");
  } else {
    state.currentLocale = localeStr.toLowerCase();
    // Сохраняем локаль в local storage.
    localStorage.setItem("lang", state.currentLocale);
  }
};
/**
 * Массив с поддерживаемыми языками.
 */
export const SET_SUPPORTED_LOCALES = "setSupportedLocales";
export const setSupportedLocales = (state, { supportedLocales }) => {
  state.supportedLocales = supportedLocales;
};
/**
 * Управляет состоянием лоадера.
 */
export const LOADING = "loading";
export const loading = (state, bol) => {
  state.loading = bol;
};
/**
 * Устанавливает флаг состояния первоначальной загрузки данных.
 */
export const INIT_COMMIT = "initCommit";
export const initCommit = (state, bol) => {
  state.isDataLoad = bol;
};
/**
 *
 */
export const SET_INITIAL_LS = "setInitialLS";
export const setInitialLS = (state) => {
  state.localStorage.lang = localStorage.getItem("lang");
  state.localStorage.city = localStorage.getItem("city");
};
