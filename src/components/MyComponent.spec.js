import { mount } from '@vue/test-utils';
import MyComponent from '@/components/MyComponent.vue'; // Ensure this points to the correct file path

describe('MyComponent.vue', () => {
  it('renders props.title when passed', () => {
    const title = 'Hello World';
    const wrapper = mount(MyComponent, {
      props: { title },
    });
    expect(wrapper.text()).toContain(title);
  });

  it('renders default content when no title is passed', () => {
    const wrapper = mount(MyComponent);
    expect(wrapper.text()).toContain('Default Title');
  });
});
