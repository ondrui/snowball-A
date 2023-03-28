export default {
  inserted: (el, { modifiers, value, arg }, vnode) => {
    console.log(el);
    console.log(vnode);
    let timeout = null; // holder for timeout id
    const delay = Object.keys(modifiers)[0] ?? 100;
    let throttled = false;
    console.log(delay, arg);
    const onResizeCallback = value;
    switch (arg) {
      case "debounce":
        el.handler = () => {
          console.log("deb");
          clearTimeout(timeout);
          timeout = setTimeout(onResizeCallback, delay);
        };
        break;
      case "throttle":
        el.handler = () => {
          console.log("throt");
          if (!throttled) {
            onResizeCallback();
            throttled = true;
            setTimeout(() => {
              throttled = false;
            }, delay);
          }
        };
        break;
      default:
        el.handler = () => {
          console.log("def");
          onResizeCallback();
        };
        break;
    }
    window.addEventListener("resize", el.handler);
  },
  unbind: (el) => window.addEventListener("resize", el.handler),
  name: "resize",
};
