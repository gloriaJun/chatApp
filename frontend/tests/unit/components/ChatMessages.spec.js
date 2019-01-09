import {
  mount,
} from '@vue/test-utils';
import '../test-setup';

import ChatMessages from '@/components/ChatMessages.vue';

describe('ChatMessages.vue', () => {
  it('snapshot check', () => {
    const wrapper = mount(ChatMessages);

    expect(wrapper.vm.$el).toMatchSnapshot();
  });

  it('props - items : system message', () => {
    const items = [
      {
        type: 'system',
        message: 'left',
      },
    ];
    const wrapper = mount(ChatMessages, {
      propsData: { items },
    });
    const el = wrapper.find('.chat-system-message');

    expect(el.exists()).toBe(true);
    expect(el.find('.v-card__text').text()).toBe(items[0].message);

    expect(wrapper.find('.chat-message-box').exists()).toBe(false);

    expect(wrapper.vm.$el).toMatchSnapshot();
  });

  it('props - items : own message', () => {
    const items = [
      {
        type: 'message',
        message: 'my message',
        isOwn: true,
      },
    ];
    const wrapper = mount(ChatMessages, {
      propsData: { items },
    });
    const el = wrapper.find('.chat-message-box');

    expect(el.exists()).toBe(true);
    expect(el.classes()).toEqual(expect.arrayContaining(['chat-right']));
    expect(el.find('.chat-username').text()).toBe('');
    expect(el.find('.chat-message').text()).toBe(items[0].message);

    expect(wrapper.find('.chat-system-message').exists()).toBe(false);

    expect(wrapper.vm.$el).toMatchSnapshot();
  });

  it('props - items : foreign message', () => {
    const items = [
      {
        type: 'message',
        message: 'your message',
        username: 'user01',
      },
    ];
    const wrapper = mount(ChatMessages, {
      propsData: { items },
    });
    const el = wrapper.find('.chat-message-box');

    expect(el.exists()).toBe(true);
    expect(el.classes()).toEqual(expect.arrayContaining(['chat-left']));
    expect(el.find('.chat-username').text()).toBe(items[0].username);
    expect(el.find('.chat-message').text()).toBe(items[0].message);

    expect(wrapper.find('.chat-system-message').exists()).toBe(false);

    expect(wrapper.vm.$el).toMatchSnapshot();
  });


  it('props - items : image', () => {
    const items = [
      {
        type: 'image',
        imageUrl: 'imageUrl',
        username: 'user01',
      },
    ];
    const wrapper = mount(ChatMessages, {
      propsData: { items },
    });

    expect(wrapper.find('.chat-message-box').exists()).toBe(true);
    expect(wrapper.find('.chat-image').exists()).toBe(true);

    expect(wrapper.vm.$el).toMatchSnapshot();
  });
});
