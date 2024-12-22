// src/shims-vue.d.ts
import { ComponentCustomProperties } from 'vue';
import { Router } from 'vue-router';

declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

