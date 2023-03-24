export default {
  data() {
    return {
      /**
       * Название элемента, в котором будет прокрутка.
       */
      elemNameScroll: "",
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
  methods: {
    /**
     * Блок функций, отвечающий за реализацию кинетического скроллинга
     * при помощи мыши.
     */
    mouseDown(event) {
      this.dragMouseScroll.isDown = true;
      this.dragMouseScroll.startX =
        event.pageX - this.$refs[this.elemNameScroll].offsetLeft;
      this.dragMouseScroll.scrollLeft =
        this.$refs[this.elemNameScroll].scrollLeft;
      this.cancelMomentumTracking();
    },
    mouseLeave() {
      this.dragMouseScroll.isDown = false;
    },
    mouseUp() {
      this.dragMouseScroll.isDown = false;
      this.beginMomentumTracking();
    },
    mouseMove(event) {
      if (!this.dragMouseScroll.isDown) return;
      const x = event.pageX - this.$refs[this.elemNameScroll].offsetLeft;
      const walk = x - this.dragMouseScroll.startX;
      let prevScrollLeft = this.$refs[this.elemNameScroll].scrollLeft;
      this.$refs[this.elemNameScroll].scrollLeft =
        this.dragMouseScroll.scrollLeft - walk;
      this.momentum.velX =
        this.$refs[this.elemNameScroll].scrollLeft - prevScrollLeft;
    },
    beginMomentumTracking() {
      this.cancelMomentumTracking();
      this.momentummomentumID = requestAnimationFrame(this.momentumLoop);
    },
    cancelMomentumTracking() {
      cancelAnimationFrame(this.momentum.momentumID);
    },
    momentumLoop() {
      if (this.$refs[this.elemNameScroll]) {
        this.$refs[this.elemNameScroll].scrollLeft += this.momentum.velX * 2;
        this.momentum.velX *= 0.95;
        if (Math.abs(this.momentum.velX) > 0.5) {
          this.momentum.momentumID = requestAnimationFrame(this.momentumLoop);
        }
      }
    },
  },
};