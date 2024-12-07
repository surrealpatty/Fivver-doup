// src/shims-vue.d.ts
import { DefineComponent } from '@vue/runtime-core';

declare module '*.vue' {
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
