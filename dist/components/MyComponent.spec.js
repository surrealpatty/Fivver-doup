"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_utils_1 = require("@vue/test-utils");
const MyComponent_vue_1 = __importDefault(require("./components/MyComponent.vue")); // Adjusted path if it's inside the components folder
describe('MyComponent.vue', () => {
    it('renders props.title when passed', () => {
        const title = 'Hello World';
        const wrapper = (0, test_utils_1.mount)(MyComponent_vue_1.default, {
            props: { title },
        });
        // Assert that the rendered text includes the title prop
        expect(wrapper.text()).toContain(title);
    });
    it('renders default content when no title is passed', () => {
        const wrapper = (0, test_utils_1.mount)(MyComponent_vue_1.default);
        // Replace 'Default Title' with the actual default content of your component
        expect(wrapper.text()).toContain('Default Title'); // Ensure this matches your component's default behavior
    });
    // Additional tests can be added here
});
//# sourceMappingURL=MyComponent.spec.js.map