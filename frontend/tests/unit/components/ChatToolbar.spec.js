import {
  mount,
} from '@vue/test-utils';
import '../test-setup';

import ChatToolbar from '@/components/ChatToolbar.vue';

describe('ChatToolbar.vue', () => {
  it('snapshot check', () => {
    const wrapper = mount(ChatToolbar);

    expect(wrapper.vm.$el).toMatchSnapshot();
  });

  it('event emit - search', () => {
    const wrapper = mount(ChatToolbar);

    wrapper.vm.search()

    expect(wrapper.emitted().search[0]).toEqual([]);
  });

  it('props - title', () => {
    const title = 'ChatRoom';
    const wrapper = mount(ChatToolbar, {
      propsData: { title },
    });

    expect(wrapper.find('.v-toolbar__title').text()).toBe(title);
    expect(wrapper.vm.$el).toMatchSnapshot();
  });
});
