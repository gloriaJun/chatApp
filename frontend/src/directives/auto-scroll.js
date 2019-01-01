import Vue from 'vue';

Vue.directive('auto-scroll-bottom', {
  update: (el) => {
    setTimeout(() => {
      el.scrollTop = el.scrollHeight;
    }, 200);
  },
});
