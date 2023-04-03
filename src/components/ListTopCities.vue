<template>
  <div class="table-wrapper">
    <div class="table">
      <router-link
        :to="`/${item.name_en}`"
        :class="['table-item', { 'empty-cell': !item }]"
        v-for="(item, index) in addEmptyCell"
        :key="`l-${index}`"
      >
        <span>{{ item.name_ru }}</span
        ><span>{{ item.temp }}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    itemList: {
      type: Array,
      required: true,
    },
  },
  computed: {
    addEmptyCell() {
      const expArr = this.itemList.slice(0, -3);
      const remainder = 4 - (expArr.length % 4);
      console.log(expArr.length % 4, remainder);
      return remainder < 4 ? [...expArr, ...Array(remainder).fill("")] : expArr;
    },
  },
};
</script>

<style lang="scss" scoped>
.table-wrapper {
  padding: 50px 40px 127px 40px;
  background-color: #f0f7fc;
}
.table {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));

  column-gap: 1px;
  background-color: #d6ebff;
}
.table-item {
  display: flex;
  justify-content: space-between;
  padding: 9px 24px 9px 18px;
  background-color: #f0f7fc;
  &.empty-cell {
    padding: 0;
    pointer-events: none;
  }
  & span {
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #04569c;
    white-space: nowrap;
  }
  &:hover > span:first-child {
    text-decoration: underline;
  }
}
@media only screen and (max-width: $media-width-2xl) {
  .table-wrapper {
    padding: 30px 10px 108px 10px;
  }
}
</style>
