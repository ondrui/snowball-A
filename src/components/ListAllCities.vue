<template>
  <div class="cities">
    <div class="cities-sticky">
      <span>Область </span>
      <select name="" id="" v-model="selected" class="cities-select">
        <option value="all">выберите область</option>
        <option
          :value="item"
          v-for="(item, index) in getListArea"
          :key="`opt-${index}`"
        >
          {{ item }}
        </option>
      </select>
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
    };
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
              : value.filter((f) => f.area_ru === this.selected);
          return [key, filteredValue];
        })
        .filter(([_, value]) => {
          console.log(_);
          return value.length !== 0;
        });
      const filtredObj = Object.fromEntries(filtered);
      console.log(filtredObj);
      return filtredObj;
    },
    getFormatedFilteredCities() {
      return this.getFilteredCities;
    },
  },
  methods: {
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
.cities {
  box-shadow: 0 0 0 2px teal;
  padding: 10px;
}
.cities-sticky {
  position: sticky;
  top: 0;
  background-color: #fff;
  padding: 20px;
}
.cities-select {
  margin-bottom: 20px;
  &::first-letter {
    text-transform: capitalize;
  }
}
.cities-abc {
  display: flex;
  flex-wrap: wrap;
  column-gap: 6px;
  // justify-content: space-between;
  margin-bottom: 10px;
}
.cities-table-list {
  display: flex;
  flex-wrap: wrap;
  column-gap: 6px;
  // justify-content: space-between;
}
.cities-table-block {
  margin-bottom: 20px;
  & h2 {
    margin-bottom: 10px;
  }
}
.cities-table-item {
  flex: 0 1 30%;
  text-transform: capitalize;
  padding: 10px;
}
</style>
