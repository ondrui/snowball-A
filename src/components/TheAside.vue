<template>
  <aside class="asidebar">
    <div class="asidebar-ad-1"></div>
    <slot />
    <div class="asidebar-ad-2"></div>
  </aside>
</template>

<style lang="scss" scoped>
.asidebar {
  display: flex;
  flex-direction: column;
  row-gap: 30px;
}
.asidebar-ad-1 {
  min-width: 300px;
  min-height: 800px;
  background: url("@/assets/images/ad_1.jpg") no-repeat;
}
.asidebar-ad-2 {
  min-width: 300px;
  min-height: 800px;
  background: url("@/assets/images/ad_2.jpg") no-repeat;
}
</style>
