import { mount } from '@vue/test-utils';
import MyComponent from '@/components/MyComponent.vue'; // Ensure the path is correct

describe('MyComponent.vue', () => {
  it('renders props.title when passed', () => {
    const title = 'Hello World';
    const wrapper = mount(MyComponent, {
      props: { title }, // Use `props` for Vue 3 instead of `propsData`
    });

    // Check if the title passed as a prop is rendered correctly
    expect(wrapper.text()).toContain(title);
  });

  it('renders default content when no title is passed', () => {
    const wrapper = mount(MyComponent);

    // Ensure 'Default Title' is present in your component when no props are passed
    // This assumes that the default content in MyComponent is "Default Title"
    expect(wrapper.text()).toContain('Default Title');
  });
});
