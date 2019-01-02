import {
  mount,
} from '@vue/test-utils';
import '../test-setup';

import ChatTextInput from '@/components/ChatTextInput.vue';

describe('ChatTextInput.vue', () => {
  it('snapshot check', () => {
    const wrapper = mount(ChatTextInput);

    expect(wrapper.vm.$el).toMatchSnapshot();
  });

  it('props - enter for send message', () => {
    const wrapper = mount(ChatTextInput);
    const message = 'Hello';

    const el = wrapper.find('input');
    el.setValue(message);
    el.trigger('keyup.enter');

    expect(wrapper.emitted().send[0]).toEqual([message]);
  });

  it('props - click icon for send message', () => {
    const wrapper = mount(ChatTextInput);
    const message = 'Hello';

    wrapper.find('input').setValue(message);
    expect(wrapper.vm.message).toEqual(message);

    wrapper.find('.icon-send').trigger('click');
    expect(wrapper.vm.message).toEqual('');
    expect(wrapper.emitted().send[0]).toEqual([message]);
  });

  it('props - placeholder', () => {
    const placeholder = 'Input Text';
    const wrapper = mount(ChatTextInput, {
      propsData: { placeholder },
    });

    expect(wrapper.find('input').attributes('placeholder')).toBe(placeholder);

    expect(wrapper.vm.$el).toMatchSnapshot();
  });
});
