declare module '*.vue' {
  import { DefineComponent } from 'vue';
  // Use 'object' instead of 'any' for a more specific type
  const component: DefineComponent<{}, {}, object>; // More specific than 'any'
  export default component;
}
