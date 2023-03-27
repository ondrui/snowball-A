export default {
  inserted: (el, binding) => {
    let timeout = null; // holder for timeout id
    const delay = 100;
    const onResizeCallback = binding.value;
    el.handler = () => {
      clearTimeout(timeout);
      timeout = setTimeout(onResizeCallback, delay);
    };
    window.addEventListener("resize", el.handler);
  },
  unbind: (el) => window.addEventListener("resize", el.handler),
  name: "resize",
};
