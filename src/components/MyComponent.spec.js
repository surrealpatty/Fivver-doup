// src/components/MyComponent.spec.js

import { mount } from '@vue/test-utils';
import MyComponent from './MyComponent.vue'; // Ensure this path is correct

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

  // Additional tests can be added here
});
