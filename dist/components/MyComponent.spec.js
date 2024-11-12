"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_utils_1 = require("@vue/test-utils");
const MyComponent_vue_1 = __importDefault(require("@/components/MyComponent.vue")); // Ensure this points to the correct file path
describe('MyComponent.vue', () => {
    it('renders props.title when passed', () => {
        const title = 'Hello World';
        const wrapper = (0, test_utils_1.mount)(MyComponent_vue_1.default, {
            props: { title },
        });
        expect(wrapper.text()).toContain(title);
    });
    it('renders default content when no title is passed', () => {
        const wrapper = (0, test_utils_1.mount)(MyComponent_vue_1.default);
        expect(wrapper.text()).toContain('Default Title');
    });
});
//# sourceMappingURL=MyComponent.spec.js.map