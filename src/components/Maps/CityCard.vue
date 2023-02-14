<template>
  <div>
    <a href="#" class="card-link">
      <div>
        <span>{{ data.name_ru }}</span>
      </div>
      <div></div>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
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
  border-radius: 3px;
  min-width: 70px;
  min-height: 54px;
}
</style>
