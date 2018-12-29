import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';

import Vue from 'vue';
import Vuetify from 'vuetify';

import ChatToolbar from '@/components/ChatToolbar.vue';

Vue.use(Vuetify);

describe('ChatToolbar.vue', () => {
  it('check props - title', () => {
    const title = 'ChatRoom';
    const wrapper = shallowMount(ChatToolbar, {
      propsData: { title },
    });
    expect(wrapper.text()).to.include(title);
  });
});
