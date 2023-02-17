<template>
  <div class="table">
    <router-link
      :to="`/${item.name_en}`"
      class="table-item"
      v-for="(item, index) in list"
      :key="`l-${index}`"
    >
      <span>{{ item.name_ru }}</span
      ><span>-2°</span>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.table {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(15, auto);
  padding: 50px 40px 108px 40px;
}
.table-item {
  display: flex;
  justify-content: space-between;
  padding: 9px 24px 9px 18px;
  border-right: 1px solid #d6ebff;
  &:nth-child(-n + 4) {
    padding: 0 24px 9px 18px;
  }
  &:nth-last-child(-n + 4) {
    padding: 9px 24px 0 18px;
  }
  &:nth-child(4n) {
    border-right: none;
  }
  & span {
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #04569c;
  }
  &:hover > span:first-child {
    text-decoration: underline;
  }
}
</style>
