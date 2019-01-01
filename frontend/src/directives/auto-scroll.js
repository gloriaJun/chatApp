module.exports = (Vue) => {
  Vue.directive('auto-bottom', {
    update: (el) => {
      el.scrollTop = el.scrollHeight;
    },
  });
};
