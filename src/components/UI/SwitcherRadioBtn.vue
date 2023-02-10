<template>
  <div class="radio-switcher">
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
</template>

<script>
export default {
  name: "SwitcherRadioBtn",
  model: {
    prop: "checked",
    event: "change",
  },
  props: ["radioValues", "checked"],
  methods: {
    /**
     * Используется для указания стилей внешнего вида кнопок при их выборе.
     * @param value - содержит значение атрибута value радиокнопки.
     */
    isChecked(value) {
      return this.checked === value;
    },
    /**
     * Обработчик события для радио кнопок.
     * Отправляет значение атрибута value радиокнопки в родительский компонент.
     * @param e - объект Event.
     */
    radioHandler(e) {
      this.$emit("change", e.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.radio-switcher {
  display: inline-flex;
  justify-content: space-around;
  gap: 6px;
  padding: 2px;
  align-items: center;
  background: #ffffff;
  border-radius: 20px;
  // height: 32px;
  // width: 200px;

  // &:focus-within {
  //   outline: 2px solid #6ec0fc;
  // }

  & label {
    // padding: 8px 32px;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #04569c;
    text-align: center;
    cursor: pointer;
    border-radius: 8px;
    padding: 5px 28px;

    &::first-letter {
      text-transform: capitalize;
    }

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
      background: #f0f7fc;
      border-radius: 20px;
      color: #000000;
      // padding: 5px 10px;
    }
  }
}
</style>
