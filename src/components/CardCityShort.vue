<template>
  <router-link to="/go" class="card-link">
    <div class="city-title">
      <span>{{ data.name_ru }}</span>
    </div>
    <div class="card-body-temp">
      <div class="icon-temp">
        <BaseIcon width="32" :name="data.now.condition" pick="light" />
      </div>
      <div class="value-temp">
        <span>{{ data.now.temp }}</span>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      require: true,
    },
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
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.12);
  border-radius: 10px;
  width: 100%;
  height: 100%;
  transition: 200ms box-shadow ease-in-out;
  &:hover {
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.31);
  }
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
