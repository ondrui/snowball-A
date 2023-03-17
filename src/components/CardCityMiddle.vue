<template>
  <div @mousedown="isMove" @mouseup="go" class="card-link">
    <div class="card-left-side">
      <div class="card-title">
        <div class="card-title-marker">
          <BaseIcon name="map-marker" pick="common" width="8" />
        </div>
        <div class="card-title-text">
          <span>{{ data.name_ru }}</span>
        </div>
        <div class="card-title-arrow">
          <BaseIcon
            name="arrow-right"
            pick="common"
            width="9"
            fill="#04569c"
            fill-opacity="1"
          />
        </div>
      </div>
      <div class="card-value">
        <span>{{ data.now.temp }}C</span>
      </div>
    </div>
    <div class="card-right-side">
      <BaseIcon width="40" :name="data.now.condition" pick="light" />
    </div>
  </div>
</template>

<script>
import { eventBus } from "../main.js";

export default {
  props: {
    data: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      /**
       * Сохраняем в переменную значение координаты Х мышки при нажатии на элемент.
       */
      mouseStartX: 0,
    };
  },
  methods: {
    /**
     * Обработчик вызывается когда нажали кнопку мыши на элементе.
     * Сохраняем в переменную значение координаты Х.
     * @param event Объект события.
     */
    isMove(event) {
      this.mouseStartX = event.x;
    },
    /**
     * Обработчик для осуществления маршрутизации на главную страницу.
     * В дальнейшем этот обработчик будет отвечать за переход на город.
     * @param event Объект события.
     */
    go(event) {
      /**
       * Обработчик вызывается когда отжали кнопку мыши на элементе.
       * Сначала проверяем не произошло ли изменение координаты Х мыши после нажатия на
       * элемент. Если координата изменилась, то выходим из функции.
       * Если выбран текущий день переходим на вкладку с часовым прогнозом. В остальных случаях
       * переходим  к карточке и графику с подробным прогнозом выбранного дня,
       * путем изменения значения флага isOpen в сторе store.state.datasetsTenDays.
       */
      if (this.mouseStartX !== event.x) return;
      eventBus.$emit("go", "main");
    },
  },
};
</script>

<style lang="scss" scoped>
.card-link {
  display: flex;
  text-decoration: none;
  background-color: #ffffff;
  cursor: pointer;
  padding: 9px 16px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.12);
  border-radius: 10px;
  width: 100%;
  transition: 200ms box-shadow ease-in-out;
  &:hover {
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.31);
  }
}
.card-left-side {
  display: flex;
  flex-direction: column;
  flex: 1;
  row-gap: 6px;
}
.card-title {
  display: flex;
  column-gap: 6px;
}
.card-title-marker {
  display: flex;
}
.card-title-arrow {
  width: 24px;
  height: 16px;
  margin-left: 4px;
  display: flex;
  justify-content: center;
  align-self: center;
  background: #f0f7fc;
  border-radius: 8px;
}
.card-title-text span {
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #04569c;
  text-transform: capitalize;
}
.card-value span {
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  color: #333333;
}
.card-right-side {
  display: flex;
}
</style>
