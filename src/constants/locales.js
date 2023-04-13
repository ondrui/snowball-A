const dataLocales = {
  am: {
    sectionOtherCities: "եղանակը $ քաղաքներում",
    asideHistory: "զննարկման պատմություն",
    viewsSwitcher: ["քարտեզ", "քաղաքներ"],
    LinkTitleCardCity: "ավելին",
    /**
     * Массив содержит слова-указатели времен.
     */
    timeMarker: [
      ["now", "Հիմա"],
      ["yesterday", "երեկ"],
      ["today", "Այսօր"],
      ["tomorrow", "Վաղը"],
      ["overmorrow", "վաղը չէ մյուս օրը"],
      ["morning", "առավոտ"],
      ["day", "օր"],
      ["evening", "երեկո"],
      ["night", "գիշեր"],
    ],
    allCityBtnCaption: "$ բոլոր $ վայրերը",
    breadcrumbs: {
      main: "տուն",
      weather: "եղանակ",
      cities: "քաղաքների ցանկը",
    },
    currentBlock: {
      now: "հիմա",
      forecast: "ըստ կանխատեսման",
      feelsLike: "Զգում է",
    },
    tabsDescr: {
      main: "տուն",
      hourly: "ժամային կանխատեսում",
      day: "եղանակի կանխատեսում $ օրվա համար",
    },
    detailsSegmentTitle: "եղանակը $ - մանրամասն կանխատեսում $ օրվա համար",
    climateIndicators: {
      temp: "ջերմաստիճանը",
      pressure: "ճնշում",
      wind: "քամի",
      main: "տուն",
      windDirSpeed: "քամու ուղղությունը և արագությունը",
      windGust_1: "քամու պոռթկումները",
      windGust_2: "նախքան",
      humidity: "խոնավություն",
      precSum: "տեղումներ",
      precProb: "տեղումների հավանականությունը",
      uvi: "UFI",
      daytime: "օրվա երկայնությունը",
      comfort: "հարմարավետություն",
    },
    units: {
      time: ["ժամացույց", "րոպե"],
      temp: ["°", "°С"],
      pressure: ["մմ Hg."],
      speed: ["մ/վրկ"],
      percent: "%",
      precSum: ["մմ"],
    },
    windDir: {
      calm: [-1111, ""],
      variable: [-111, ""],
      n: [180, "с"],
      ne: [225, "св"],
      e: [270, "в"],
      se: [315, "юв"],
      s: [0, "ю"],
      sw: [45, "юз"],
      w: [90, "з"],
      nw: [135, "сз"],
    },
    weekendDays: ["вс", "сб"],
    polar: {
      day: "բևեռային օր",
      night: "բևեռային գիշեր",
    },
    listAllCities: ["շրջան", "Բոլորը"],
    weather_sign: {
      cloudy_rain_1: "ամպամած, անձրև",
      cloudy_snow_1: "ամպամած, ձյուն",
      "partly-cloudy_rain_1_hail_1_thunderstorm_1":
        "մասամբ ամպամած, հնարավոր է անձրև, ամպրոպ, կարկուտ",
      cloudy_sleet_1: "ամպամած, տեղումներ",
      cloudy: "ամպամած",
      "partly-cloudy": "մասամբ ամպամած",
      clear: "պարզ",
      "partly-cloudy_rain_1_thunderstorm_1": "մասամբ ամպամած, անձրև, ամպրոպ",
      "partly-cloudy_rain_1": "մասամբ ամպամած, անձրև",
      "partly-cloudy_rain_0": "մասամբ ամպամած, թույլ անձրև",
      cloudy_rain_0: "ամպամած, թույլ անձրև",
      "partly-cloudy_snow_0": "մասամբ ամպամած, թույլ ձյուն",
      cloudy_snow_0: "ամպամած, թույլ ձյուն",
      "partly-cloudy_sleet_0": "մասամբ ամպամած, թույլ տեղումներ",
      cloudy_sleet_0: "ամպամած, փոքր անձրև",
      cloudy_snowstorm_1: "ամպամած, բուք",
      "mainly-clear": "մասամբ ամպամած",
      semitransparent: "կիսաթափանցիկ ամպամածություն",
      "partly-cloudy_snow_1": "մասամբ ամպամած, ձյուն",
      "partly-cloudy_sleet_1": "մասամբ ամպամած, տեղումներ",
      "partly-cloudy_rain_0_thunderstorm_1":
        "մասամբ ամպամած, հնարավոր է թույլ անձրև, ամպրոպ",
      cloudy_rain_0_thunderstorm_1:
        "Հնարավոր է ամպամածություն, թույլ անձրև, ամպրոպ",
      "mainly-clear_rain_1_thunderstorm_1":
        "մասամբ ամպամած, ընդհատվող անձրև, ամպրոպ",
      "mainly-clear_rain_0_thunderstorm_1":
        "մասամբ ամպամած, թույլ անձրև, հնարավոր է ամպրոպ",
      cloudy_rain_1_thunderstorm_1_hail_1:
        "ամպամած, անձրեւ, ամպրոպ, կարկուտի հավանականություն",
      cloudy_rain_1_thunderstorm_1: "ամպամած, անձրև, ամպրոպ",
      "mainly-clear_rain_0": "մասամբ ամպամած, թույլ անձրև",
      "mostly-cloudy": "մասամբ ամպամած",
    },
  },
  ru: {
    sectionOtherCities: "погода в городах $",
    asideHistory: "история просмотров",
    viewsSwitcher: ["карта", "города"],
    LinkTitleCardCity: "подробнее",
    /**
     * Массив содержит слова-указатели времен.
     */
    timeMarker: [
      ["now", "сейчас"],
      ["yesterday", "вчера"],
      ["today", "сегодня"],
      ["tomorrow", "завтра"],
      ["overmorrow", "послезавтра"],
      ["morning", "утро"],
      ["day", "день"],
      ["evening", "вечер"],
      ["night", "ночь"],
    ],
    allCityBtnCaption: "Все $ населенных пункта $",
    breadcrumbs: {
      main: "главная",
      weather: "погода",
      cities: "список городов",
    },
    currentBlock: {
      now: "сейчас в",
      forecast: "по прогнозу",
      feelsLike: "ощущается",
    },
    tabsDescr: {
      main: "главная",
      hourly: "почасовой прогноз",
      day: "прогноз погоды на $ дней",
    },
    detailsSegmentTitle: "погода в $ - подробный прогноз на $ дней",
    climateIndicators: {
      temp: "температура",
      pressure: "давление",
      wind: "ветер",
      main: "главная",
      windDirSpeed: "направление и скорость ветра",
      windGust_1: "порывы ветра",
      windGust_2: "до",
      humidity: "влажность",
      precSum: "кол-во осадков",
      precProb: "вер. осадков",
      uvi: "УФИ",
      daytime: "долгота дня",
      comfort: "комфорт",
    },
    units: {
      time: ["ч", "мин"],
      temp: ["°", "°С"],
      pressure: ["мм.рт.ст."],
      speed: ["м/с"],
      percent: "%",
      precSum: ["мм"],
    },
    windDir: {
      calm: [-1111, ""],
      variable: [-111, ""],
      n: [180, "с"],
      ne: [225, "св"],
      e: [270, "в"],
      se: [315, "юв"],
      s: [0, "ю"],
      sw: [45, "юз"],
      w: [90, "з"],
      nw: [135, "сз"],
    },
    weekendDays: ["вс", "сб"],
    polar: {
      day: "полярный день",
      night: "полярная ночь",
    },
    listAllCities: ["область", "все"],
    weather_sign: {
      cloudy_rain_1: "облачно, дождь",
      cloudy_snow_1: "облачно, снег",
      "partly-cloudy_rain_1_hail_1_thunderstorm_1":
        "переменная облачность, дождь, гроза, возможен град",
      cloudy_sleet_1: "облачно, осадки",
      cloudy: "облачно",
      "partly-cloudy": "переменная облачность",
      clear: "ясно",
      "partly-cloudy_rain_1_thunderstorm_1":
        "переменная облачность, дождь, гроза",
      "partly-cloudy_rain_1": "переменная облачность, дождь",
      "partly-cloudy_rain_0": "переменная облачность, небольшой дождь",
      cloudy_rain_0: "облачно, небольшой дождь",
      "partly-cloudy_snow_0": "переменная облачность, небольшой снег",
      cloudy_snow_0: "облачно, небольшой снег",
      "partly-cloudy_sleet_0": "переменная облачность, небольшие осадки",
      cloudy_sleet_0: "облачно, небольшие осадки",
      cloudy_snowstorm_1: "облачно, метель",
      "mainly-clear": "малооблачно",
      semitransparent: "полупрозрачная облачность",
      "partly-cloudy_snow_1": "переменная облачность, снег",
      "partly-cloudy_sleet_1": "переменная облачность, осадки",
      "partly-cloudy_rain_0_thunderstorm_1":
        "переменная облачность, небольшой дождь, возможна гроза",
      cloudy_rain_0_thunderstorm_1: "облачно, небольшой дождь, возможна гроза",
      "mainly-clear_rain_1_thunderstorm_1":
        "малооблачно, кратковременный дождь, гроза",
      "mainly-clear_rain_0_thunderstorm_1":
        "малооблачно, небольшой дождь, возможна гроза",
      cloudy_rain_1_thunderstorm_1_hail_1:
        "облачно, дождь, гроза, возможен град",
      cloudy_rain_1_thunderstorm_1: "облачно, дождь, гроза",
      "mainly-clear_rain_0": "малооблачно, небольшой дождь",
      "mostly-cloudy": "облачно с прояснениями",
    },
  },
  en: {
    sectionOtherCities: "weather for cities in the $",
    asideHistory: "browsing history",
    viewsSwitcher: ["map", "sity"],
    LinkTitleCardCity: "more",
    /**
     * Массив содержит слова-указатели времен.
     */
    timeMarker: [
      ["now", "now"],
      ["yesterday", "yesterday"],
      ["today", "today"],
      ["tomorrow", "tomorrow"],
      ["overmorrow", "overmorrow"],
      ["morning", "morning"],
      ["day", "day"],
      ["evening", "evening"],
      ["night", "night"],
    ],
    allCityBtnCaption: "All $ locations in $",
    breadcrumbs: {
      main: "home",
      weather: "weather",
      cities: "list of cities",
    },
    currentBlock: {
      now: "now at",
      forecast: "according to the forecast",
      feelsLike: "feels like",
    },
    tabsDescr: {
      main: "main",
      hourly: "hourly",
      day: "$ day forecast",
    },
    detailsSegmentTitle: "weather in $ - detailed forecast for $ days",
    climateIndicators: {
      temp: "temperature",
      pressure: "pressure",
      wind: "wind",
      main: "main",
      windDirSpeed: "wind direction and speed",
      windGust_1: "wind gust",
      windGust_2: "up to",
      humidity: "humidity",
      precSum: "precipitation",
      precProb: "precip chance",
      uvi: "UVI",
      daytime: "sunrise & sunset",
      comfort: "comfort",
    },
    units: {
      time: ["h", "m"],
      temp: ["°", "°С"],
      pressure: ["mmHg"],
      speed: ["m/s"],
      percent: "%",
      precSum: ["mm"],
    },
    windDir: {
      calm: [-1111, ""],
      variable: [-111, ""],
      n: [180, "n"],
      ne: [225, "ne"],
      e: [270, "e"],
      se: [315, "se"],
      s: [0, "s"],
      sw: [45, "sw"],
      w: [90, "w"],
      nw: [135, "nw"],
    },
    weekendDays: ["sun", "sat"],
    polar: {
      day: "polar day",
      night: "polar night",
    },
    listAllCities: ["region", "all"],
    weather_sign: {
      cloudy_rain_1: "cloudy, rain",
      cloudy_snow_1: "cloudy, snow",
      "partly-cloudy_rain_1_hail_1_thunderstorm_1":
        "partly cloudy, rain, thunderstorm, hail possible",
      cloudy_sleet_1: "cloudy, precipitation",
      cloudy: "cloudy",
      "partly-cloudy": "partly cloudy",
      clear: "clear",
      "partly-cloudy_rain_1_thunderstorm_1":
        "partly cloudy, rain, thunderstorm",
      "partly-cloudy_rain_1": "partly cloudy, rain",
      "partly-cloudy_rain_0": "partly cloudy, light rain",
      cloudy_rain_0: "cloudy, light rain",
      "partly-cloudy_snow_0": "partly cloudy, light snow",
      cloudy_snow_0: "cloudy, light snow",
      "partly-cloudy_sleet_0": "partly cloudy, light precipitation",
      cloudy_sleet_0: "cloudy, light rain",
      cloudy_snowstorm_1: "cloudy, blizzard",
      "mainly-clear": "mainly clear",
      semitransparent: "translucent cloudiness",
      "partly-cloudy_snow_1": "partly cloudy, snow",
      "partly-cloudy_sleet_1": "partly cloudy, precipitation",
      "partly-cloudy_rain_0_thunderstorm_1":
        "partly cloudy, light rain, thunderstorms possible",
      cloudy_rain_0_thunderstorm_1:
        "cloudy, light rain, thunderstorms possible",
      "mainly-clear_rain_1_thunderstorm_1":
        "mainly clear, intermittent rain, thunderstorm",
      "mainly-clear_rain_0_thunderstorm_1":
        "mainly clear, light rain, possible thunderstorm",
      cloudy_rain_1_thunderstorm_1_hail_1:
        "cloudy, rain, thunderstorm, chance of hail",
      cloudy_rain_1_thunderstorm_1: "cloudy, rain, thunderstorm",
      "mainly-clear_rain_0": "mainly clear, light rain",
      "mostly-cloudy": "mostly cloudy",
    },
  },

  fr: {},
};
/**
 * Функция возвращает языковую константу.
 */
export const languageExpressions = (locales, key, name) => {
  const lang = locales ?? "ru";
  return key !== undefined && name !== undefined
    ? dataLocales[lang][key][name]
    : key !== undefined
    ? dataLocales[lang][key]
    : (console.log("Не найден ключ и/или имя параметра в языковых константах!"),
      undefined);
};

/**
 * Возможные значения формата отображения времени и даты.
 * Ключи - символы описывающие возможный формат даты и времени.
 * Значения - массив с параметрами для объекта options, который
 * настраивает формат даты и времени и передается аргументом
 * в конструктор new Intl.DateTimeFormat
 * @property d - День месяца, от 1 до 31. День месяца без нуля в начале.
 * @property D - Текстовое представление дня недели, 2 символа.
 * @property l - Полное наименование дня недели.
 * @property m - Порядковый номер месяца с ведущим нулём.
 * @property F - Полное наименование месяца. Строка.
 * @property M - Сокращённое наименование месяца, 3 символа.
 * @property Y - Полное числовое представление года, 4 цифры.
 * @property H - Часы в 24-часовом формате с ведущим нулём.
 * @property i - Минуты с ведущим нулём.
 * @property S - Секунды с ведущим нулём.
 */
export const formatListDateTime = {
  d: ["day", "numeric"],
  D: ["weekday", "short"],
  l: ["weekday", "long"],
  m: ["month", "2-digit"],
  F: ["month", "long"],
  M: ["month", "short"],
  Y: ["year", "numeric"],
  H: ["hour", "2-digit"],
  i: ["minute", "2-digit"],
  S: ["second", "2-digit"],
};

/**
 * Объект с дефолтными значениями свойств форматирования даты и времени.
 */
export const defaultOptionsDateTimeFormat = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
};
