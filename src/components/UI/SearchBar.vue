<template>
  <div class="search-header">
    <input
      type="text"
      class="input-search-header"
      placeholder=""
      :value="getCitySelected"
      @change="handler"
    />
    <div class="history-icon-container">
      <BaseIcon
        nameIcon="history"
        pick="common"
        width="23"
        class="history-icon"
      />
    </div>
    <div class="search-icon-container">
      <BaseIcon
        nameIcon="search"
        pick="common"
        width="23"
        class="search-icon"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  computed: {
    getCitySelected() {
      return this.$store.getters.getCitySelected;
    },
  },
  methods: {
    handler(e) {
      const city = e.target.value;
      if (!city) return;
      this.$store.commit("setCity", city);
      localStorage.setItem("cities", JSON.stringify({ default: city }));
      this.$router.push({ path: `/pogoda/${city}/hourly` });
    },
  },
};
</script>

<style lang="scss" scoped>
.search-header {
  position: relative;
  margin-bottom: 50px;
}
.input-search-header {
  height: 50px;
  width: 100%;
  padding-left: 13px;
  background-color: #f0f7fc;
  border: 1px solid #b2d3e8;
  border-radius: 4px;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  color: #04569c;
}

.search-icon-container {
  position: absolute;
  right: 13px;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.history-icon-container {
  position: absolute;
  right: 45px;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
