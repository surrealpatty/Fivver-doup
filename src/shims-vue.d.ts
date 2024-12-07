// src/shims-vue.d.ts
declare module '*.vue' {
  import { DefineComponent } from 'vue'; // Make sure you're importing from 'vue'
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
