export default {
  inserted: (el, binding) => {
    const options = {
      rootMargin: "0px",
      threshold: 1,
    };
    const callback = (entries) => {
      console.log(entries, el);
      if (entries[0].isIntersecting) {
        binding.value(el);
      }
    };
    const observer = new IntersectionObserver(callback, options);
    const rootElem = document.querySelector("#app");
    observer.observe(rootElem);
  },
  name: "observe",
};
