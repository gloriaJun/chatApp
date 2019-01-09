import {
  mount,
} from '@vue/test-utils';
import '../test-setup';

import RoomList from '@/components/RoomList.vue';

describe('RoomList.vue', () => {
  it('snapshot check', () => {
    const wrapper = mount(RoomList);

    expect(wrapper.vm.$el).toMatchSnapshot();
  });

  it('snapshot check with items', () => {
    const items = [{
      id: 1,
      name: 'New Year',
    }];
    const wrapper = mount(RoomList, {
      propsData: { items },
    });

    expect(wrapper.vm.$el).toMatchSnapshot();
  });

  it('click room', () => {
    const items = [{
      id: 1,
      name: 'New Year',
    }];
    const wrapper = mount(RoomList, {
      propsData: { items },
    });

    wrapper.find('.v-list__tile').trigger('click');
    expect(wrapper.emitted()['click-room'][0]).toEqual([items[0].id]);
  });
});
