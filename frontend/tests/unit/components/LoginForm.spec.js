import {
  mount,
} from '@vue/test-utils';
import '../test-setup';

import LoginForm from '@/components/LoginForm.vue';

describe('LoginForm.vue', () => {
  it('snapshot check', () => {
    const wrapper = mount(LoginForm);

    expect(wrapper.vm.$el).toMatchSnapshot();
  });

  it('when rendering button should be inactive', () => {
    const wrapper = mount(LoginForm);
    const el = wrapper.find('.v-btn');

    expect(el.attributes('disabled')).toEqual('disabled');
  });


  it('when input set value, button should be active', () => {
    const wrapper = mount(LoginForm);
    const username = 'user01';

    const inputWrapper = wrapper.find('.v-input');
    const btn = wrapper.find('.v-btn');

    inputWrapper.find('input').setValue(username);

    expect(btn.attributes('disabled')).toBeUndefined();
  });
});
