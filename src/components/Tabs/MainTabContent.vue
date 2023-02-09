<template>
  <div>
    <div class="switcher">
      <div class="radio-btn-nav">
        <label
          :class="{ checked: isChecked(value[0]) }"
          :for="value[0]"
          v-for="value in radioValues"
          :key="value[0]"
        >
          <input
            type="radio"
            name="radios"
            :id="value[0]"
            :value="value[0]"
            @change="radioHandler"
          />
          {{ value[1] }}
        </label>
      </div>
    </div>
    <div class="btn-all-city">
      <button>ddddd</button>
    </div>
    <div class="map-container">
      <div class="selectors">
        <div class="left">
          <div></div>
        </div>
        <div class="right">
          <div></div>
        </div>
      </div>
    </div>
    <ArmeniaMap />
  </div>
</template>

<script>
import ArmeniaMap from "@/components/Maps/ArmeniaMap.vue";

export default {
  components: {
    ArmeniaMap,
  },
};
</script>

<style lang="scss" scoped>
.switcher {
  margin: 0 auto;
}
.radio-btn-nav {
  display: flex;
  justify-content: space-around;
  gap: 6px;
  padding: 4px;
  align-items: center;
  // background: $color-pr;
  border-radius: 10px;

  &:focus-within {
    outline: 2px solid #6ec0fc;
  }

  & label {
    padding: 2px 8px;
    color: black;
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
    text-align: center;
    cursor: pointer;
    border-radius: 8px;

    & input[type="radio"] {
      appearance: none;
      margin: 0;
      clip: rect(0 0 0 0);
      clip-path: inset(50%);
      height: 1px;
      overflow: hidden;
      position: absolute;
      white-space: nowrap;
      width: 1px;
    }

    &.checked {
      background: white;
      box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
    }
  }
}
// box-shadow: 0 0px 8px 4px rgb(0 70 128 / 81%);
</style>
