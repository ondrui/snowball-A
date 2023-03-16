<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      /**
       * Объект со свойствами отвечающие за перемещение графика с помощью
       * мыши.
       */
      dragMouseScroll: {
        isDown: false,
        startX: 0,
        scrollLeft: 0,
      },
      /**
       * Объект со свойствами отвечающие за кинетический (инерционный) скроллинг.
       */
      momentum: {
        velX: 0,
        momentumID: null,
      },
    };
  },
  mounted() {
    console.log(document.querySelector(".swiper-container"));
    console.log(this.$el);
  },
};
</script>

<style lang="scss" scoped></style>
