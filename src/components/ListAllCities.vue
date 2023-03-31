<template>
  <div class="cities">
    <div class="cities-sticky">
      <BreadCrumbs :crumbsKeys="crumbsKeys" />
      <SearchBar class="cities-search" />
      <div class="cities-select">
        <span>Область: </span>
        <select name="" id="" v-model="selected" @change="scrollTTT">
          <option value="all">Все</option>
          <option
            :value="item"
            v-for="(item, index) in getListArea"
            :key="`opt-${index}`"
          >
            {{ item }}
          </option>
        </select>
      </div>
      <div class="cities-abc">
        <button
          @click="scrollToCity"
          :data-name="item"
          class="cities-abc-item"
          v-for="(item, index) in getABC"
          :key="`i-${index}`"
        >
          {{ item }}
        </button>
      </div>
    </div>
    <div class="cities-table">
      <div
        class="cities-table-block"
        v-for="(item, index) in getABC"
        :key="`b-${index}`"
      >
        <h2 :data-letter="item">{{ item }}</h2>
        <div class="cities-table-list">
          <router-link
            :to="`/${value.name_en}`"
            class="cities-table-item"
            v-for="(value, index) in getFormatedFilteredCities[item]"
            :key="`city-${index}`"
          >
            <div>
              {{ value.name_ru }}
            </div>
            <div>{{ value.area_ru }}, {{ value.area_ru_l5 }}</div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListAllCities",
  data() {
    return {
      selected: "all",
      crumbsKeys: [],
    };
  },
  created() {
    const VALID_KEYS_CRUMBS = ["main", "citiesList"];
    this.crumbsKeys = VALID_KEYS_CRUMBS;
  },
  // watch: {
  //   selected: function () {
  //     console.log("watch", window.scrollY);
  //     window.scroll(0, 0);
  //     console.log("watch", window.scrollY);
  //   },
  // },
  computed: {
    /**
     * Возвращает языковую метку.
     * @example
     * "ru"
     */
    getLocales() {
      return this.$store.getters.getLocales;
    },
    getGroupListAllCities() {
      return this.$store.getters.getGroupListAllCities;
    },
    getListArea() {
      return this.$store.getters.getListArea;
    },
    getABC() {
      return Object.keys(this.getFormatedFilteredCities);
    },
    getFilteredCities() {
      const entries = Object.entries(this.getGroupListAllCities);
      const filtered = entries
        .map(([key, value]) => {
          const filteredValue =
            this.selected === "all"
              ? value
              : value.filter((f) => {
                  return (
                    f.area_ru.split(" ")[0] === this.selected.split(" ")[0]
                  );
                });
          return [key, filteredValue];
        })
        .filter((f) => {
          return f[1].length !== 0;
        });
      const filtredObj = Object.fromEntries(filtered);
      return filtredObj;
    },
    getFormatedFilteredCities() {
      console.log(this.getFilteredCities);
      return this.getFilteredCities;
    },
  },
  methods: {
    scrollTTT() {
      console.log("A");
      document.querySelector("header").focus();
    },
    scrollToCity(event) {
      const el = document.querySelector(
        `[data-letter=${event.target.dataset.name}]`
      );
      el.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
/* remove the original arrow */
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  -o-appearance: none;
  appearance: none;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #04569c;
  min-width: 264px;
  padding: 8px 0 8px 14px;
  border: 1px solid #b2d3e8;
  border-radius: 4px;
  background: url(@/assets/images/common/triangle-select.svg?external) no-repeat
    right #f0f7fc;
  background-position-x: calc(100% - 12px);
  &::first-letter {
    text-transform: capitalize;
  }
}
.cities {
  & .cities-search {
    margin-bottom: 61px;
  }
}
.cities-sticky {
  position: sticky;
  top: 0;
  background-color: #fff;
  padding: 20px 0;
}
.cities-select {
  display: flex;
  justify-content: end;
  align-items: center;
  margin-bottom: 30px;
  & span {
    margin-right: 16px;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #9c9c9c;
  }
}
.cities-abc {
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  column-gap: 10px;
  row-gap: 12px;
  margin-bottom: 50px;
  // justify-content: space-between;
  & button {
    background: #f0f7fc;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    padding: 5px 10px;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #04569c;
    &:hover {
      background: #e1ecf9;
    }
  }
}
.cities-table-list {
  display: flex;
  flex-wrap: wrap;
  column-gap: 20px;
  & a {
    text-decoration: none;
  }
  // justify-content: space-between;
}
.cities-table-block {
  margin-bottom: 20px;
  & h2 {
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;
    color: #000000;
    margin-bottom: 18px;
  }
}
.cities-table-item {
  flex: 0 1 30%;
  padding-bottom: 16px;
  border-right: 1px solid #d6ebff;
  & div:first-child {
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #04569c;
    margin-bottom: 4px;
    &::first-letter {
      text-transform: capitalize;
    }
  }
  & div:nth-child(2) {
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    color: #9c9c9c;
    &::first-letter {
      text-transform: capitalize;
    }
  }
  &:nth-child(3n) {
    border-right: none;
  }
}
@media only screen and (max-width: $media-width-lg) {
  .cities-table-list {
    column-gap: 10px;
  }
  .cities-abc {
    margin-bottom: 10px;
  }
  .cities {
    & .cities-search {
      margin-bottom: 30px;
    }
  }
  .cities-select {
    margin-bottom: 20px;
  }
}
</style>
