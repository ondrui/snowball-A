<template>
  <div class="scrolltop-wrap">
    <router-link to="#top" class="top-of-site-link">
      <BaseIcon width="10" nameIcon="chevron-scroll-left" pick="common" />
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.scrolltop-wrap {
  position: absolute;
  top: 104vh;
  right: 16vw;
  bottom: -10px;
  pointer-events: none;
  backface-visibility: hidden;
  // prevent extra page height if content is smaller than viewport
  // Firefox only
  @supports (-moz-appearance: meterbar) {
    clip: rect(0, 40px, auto, 0);
  }
}
.top-of-site-link {
  position: fixed;
  position: sticky;
  top: calc(100vh - 5rem);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
  pointer-events: auto;
  background-color: #dbeaf4;
  box-shadow: 0 0 5px 5px white;
  border-radius: 50px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  touch-action: manipulation;
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
  & svg {
    transform: rotate(90deg);
  }
  &:hover {
    background-color: #a6d3f1;
  }
  &:active {
    background-color: #76bff0;
  }
}
@media only screen and (max-width: $media-width-xl) {
  .scrolltop-wrap {
    right: 12vw;
  }
}
@media only screen and (max-width: $media-width-lg) {
  .scrolltop-wrap {
    right: 10vw;
  }
}
</style>
