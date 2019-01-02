import { mount } from '@vue/test-utils';
import '@/plugins/vuetify';

import App from '@/App.vue';

describe('App.vue', () => {
  test('renders correctly', () => {
    const wrapper = mount(App);

    // console.log(wrapper.find('div'));
    expect(wrapper.element).toMatchSnapshot();
  });

  // it('tag check - router-view', () => {
  //   const wrapper = mount(App);
  //   expect(wrapper.html()).to.include('<router-view></router-view>');
  // });
});


// import { shallowMount } from '@vue/test-utils'
// import HelloWorld from '@/components/HelloWorld.vue'
//
// describe('HelloWorld.vue', () => {
//   it('renders props.msg when passed', () => {
//     const msg = 'new message'
//     const wrapper = shallowMount(HelloWorld, {
//       propsData: { msg }
//     })
//     expect(wrapper.text()).toMatch(msg)
//   })
// })
