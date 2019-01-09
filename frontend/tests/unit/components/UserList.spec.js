import {
  mount,
} from '@vue/test-utils';
import '../test-setup';

import UserList from '@/components/UserList.vue';

describe('UserList.vue', () => {
  it('snapshot check', () => {
    const wrapper = mount(UserList);

    expect(wrapper.vm.$el).toMatchSnapshot();
  });

  it('snapshot check with items', () => {
    const items = [{
      socketId: 'afefeffa',
      username: 'user01',
    }];
    const wrapper = mount(UserList, {
      propsData: { items },
    });

    expect(wrapper.vm.$el).toMatchSnapshot();
  });

  it('set title', () => {
    const items = [{
      socketId: 'afefeffa',
      username: 'user01',
    }];
    const title = 'subTitle';
    const wrapper = mount(UserList, {
      propsData: {
        items,
        title,
      },
    });

    expect(wrapper.find('.v-subheader').text()).toBe(title);
    expect(wrapper.vm.$el).toMatchSnapshot();
  });

  it('click room', () => {
    const items = [{
      socketId: 'afefeffa',
      username: 'user01',
    }];
    const wrapper = mount(UserList, {
      propsData: { items },
    });

    wrapper.find('.v-list__tile').trigger('click');
    expect(wrapper.emitted().click[0]).toEqual([items[0]]);
  });
});
