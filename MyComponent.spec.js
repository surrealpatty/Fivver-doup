import { mount } from '@vue/test-utils';
import MyComponent from '../src/components/MyComponent.vue';

describe('MyComponent.vue', () => {
  it('renders props.title when passed', () => {
    const title = 'Hello World';
    const wrapper = mount(MyComponent, {
      props: { title },
    });
    expect(wrapper.text()).toMatch(title);
  });
});

