// src/shims-vue.d.ts
declare module "*.vue" {
  import { DefineComponent } from 'vue';  // Import DefineComponent correctly
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
