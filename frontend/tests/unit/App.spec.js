import {
  mount,
} from '@vue/test-utils';
import './test-setup';

import App from '@/App.vue';

describe('App.vue', () => {
  it('snapshot check', () => {
    const wrapper = mount(App, {
      stubs: ['router-link', 'router-view'],
    });

    expect(wrapper.vm.$el).toMatchSnapshot();
  });

  it('application id check', () => {
    const wrapper = mount(App, {
      stubs: ['router-link', 'router-view'],
    });

    expect(wrapper.find('div').attributes('id')).toEqual('chat-app');
  });
});
