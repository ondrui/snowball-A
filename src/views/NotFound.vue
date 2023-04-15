<template>
  <div class="container">
    <div>
      <h1>404! Page Not Found!</h1>
      <h2>it seems you're in the wrong page</h2>
      <router-link to="/">Перейти на главную</router-link>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  & h2 {
    margin-bottom: 20px;
  }
}
</style>
