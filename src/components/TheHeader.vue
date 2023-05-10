<template>
  <header class="header">
    <div class="container">
      <router-link :to="pushNewURL(getLocaleURL)">
        <BaseIcon nameIcon="country-logo" pick="common" width="150" />
      </router-link>
      <div class="header-dropdown">
        <button @click.stop="showMenu" class="header-dropdown-btn">
          {{ langs[0].title.toUpperCase() }}
        </button>
        <div class="header-dropdown-icon">
          <BaseIcon nameIcon="chevron-dropdown" pick="common" width="10" />
        </div>
        <ul v-if="open">
          <li v-for="lang in langs" :key="lang.key">
            <router-link :to="pushNewURL(lang.key)">
              {{ lang.title.toUpperCase() }}</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      langs: [],
      open: false,
    };
  },
  created() {
    this.langs = this.getSupportedLocales;
    window.addEventListener("click", this.close);
  },

  beforeDestroy() {
    window.removeEventListener("click", this.close);
  },
  computed: {
    ...mapGetters([
      "tenDaysTabTable",
      "getLocale",
      "getCitySelected",
      "getLocaleURL",
      "getSupportedLocales",
    ]),
  },
  methods: {
    pushNewURL(value) {
      return {
        name: "main",
        params: {
          lang: value === "ru" ? undefined : value,
          city: this.getCitySelected.name_en,
        },
      };
    },
    showMenu() {
      this.open = true;
    },
    close(e) {
      console.log(e.target);
      console.log(this.$el);
      this.open = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  border-bottom: 1px solid rgba(160, 184, 212, 0.4);
  width: 100%;
  margin: 0 auto;
  margin-bottom: 19px;
  min-height: 56px;
  padding-top: 14px;
}
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: $width-page-xl;
  margin: 0 auto;
  padding: 0 18px 0 10px;
  width: 100%;
}
.header-dropdown {
  position: relative;
  display: flex;
  align-items: center;
  & button {
    border: none;
    background-color: transparent;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    color: #04569c;
    padding: 6px 4px 6px 9px;
    cursor: pointer;
  }
  & ul {
    position: absolute;
    top: -11px;
    left: -10px;
    min-width: 68px;
    margin: 0;
    padding: 9px 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2px;
    background: #ffffff;
    // opacity: 0.8;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.16);
    border-radius: 10px;
    & a {
      display: block;
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
      color: #04569c;
      padding: 8px 0;
      text-align: center;
    }
    & a:hover {
      background-color: #f0f7fc;
    }
  }
  & .header-dropdown-icon {
    display: flex;
    align-items: center;
  }
}
@media only screen and (max-width: $media-width-xl) {
  .container {
    max-width: $width-page-lg;
  }
}
</style>
