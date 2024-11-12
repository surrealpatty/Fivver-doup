import { mount } from '@vue/test-utils'; // Make sure you're using Vue Test Utils for mounting the component
import MyComponent from '@/components/MyComponent.vue'; // The import path should resolve correctly now

describe('MyComponent.vue', () => {
  it('renders props.title when passed', () => {
    const title = 'Hello World';
    const wrapper = mount(MyComponent, {
      props: { title },
    });
    // Assert that the rendered text includes the title prop
    expect(wrapper.text()).toContain(title);
  });

  it('renders default content when no title is passed', () => {
    const wrapper = mount(MyComponent);
    // Replace 'Default Title' with the actual default content of your component
    expect(wrapper.text()).toContain('Default Title'); // Ensure this matches your component's default behavior
  });

  // Additional tests can be added here if needed
});
