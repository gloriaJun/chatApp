import {
  mount,
} from '@vue/test-utils';
import '../test-setup';

import ChatImageUpload from '@/components/ChatImageUpload.vue';

describe('ChatImageUpload.vue', () => {
  it('snapshot check', () => {
    const wrapper = mount(ChatImageUpload);

    expect(wrapper.vm.$el).toMatchSnapshot();
  });

  // it('event emit - search', () => {
  //   const wrapper = mount(ChatImageUpload);
  //
  //   wrapper.find('.v-btn').trigger('click');
  //
  //   // wrapper.vm.$emit('foo');
  //
  //   // console.log(wrapper.emitted());
  //
  //   // expect(wrapper.emitted().search[0]).toEqual([]);
  // });
  //
  // // it('props - title', () => {
  // //   const title = 'ChatRoom';
  // //   const wrapper = mount(ChatToolbar, {
  // //     propsData: { title },
  // //   });
  // //
  // //   expect(wrapper.find('.v-toolbar__title').text()).toBe(title);
  // //   expect(wrapper.vm.$el).toMatchSnapshot();
  // // });
});
