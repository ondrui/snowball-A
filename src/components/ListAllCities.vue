<template>
  <div class="cities">
    <div class="sticky">
      <span>Область </span>
      <select name="" id="" v-model="selected" class="cities-select">
        <option disabled value="">Выберите область</option>
        <option
          :value="index"
          v-for="(item, index) in getListArea"
          :key="`opt-${index}`"
        >
          {{ item }}
        </option>
      </select>
      <div class="cities-abc">
        <div
          class="cities-abc-item"
          v-for="(item, index) in getABC"
          :key="`i-${index}`"
        >
          {{ item }}
        </div>
      </div>
    </div>
    <div class="cities-table">
      <div
        class="cities-table-block"
        v-for="(item, index) in getABC"
        :key="`b-${index}`"
      >
        <h2>{{ item }}</h2>
        <div class="cities-table-list">
          <div
            class="cities-table-item"
            v-for="(value, index) in getGroupListAllCities[item]"
            :key="`city-${index}`"
          >
            {{ value.name_ru }}
          </div>
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
      selected: "",
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
      return Object.keys(this.getGroupListAllCities);
    },
    getFilteredCities() {
      return this.getGroupListAllCities;
    },
  },
};
</script>

<style lang="scss" scoped>
.cities {
  box-shadow: 0 0 0 2px teal;
  padding: 10px;
}
.sticky {
  position: sticky;
  top: 0;
  background-color: #fff;
  padding: 20px;
}
.cities-select {
  margin-bottom: 20px;
}
.cities-abc {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 10px;
}
.cities-abc-item {
  text-transform: capitalize;
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
    text-transform: uppercase;
  }
}
.cities-table-item {
  flex: 0 1 30%;
}
</style>
