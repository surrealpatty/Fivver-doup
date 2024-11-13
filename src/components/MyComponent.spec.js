import { mount } from '@vue/test-utils';
import MyComponent from '@/components/MyComponent.vue'; // Ensure the path is correct

describe('MyComponent.vue', () => {
  it('renders props.title when passed', () => {
    const title = 'Hello World';
    const wrapper = mount(MyComponent, {
      props: { title }, // Use `props` for Vue 3 instead of `propsData`
    });
    expect(wrapper.text()).toContain(title);
  });

  it('renders default content when no title is passed', () => {
    const wrapper = mount(MyComponent);
    expect(wrapper.text()).toContain('Default Title'); // Ensure 'Default Title' is present in your component
  });
});
