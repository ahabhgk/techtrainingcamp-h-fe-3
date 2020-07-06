# utils

各种工具函数或 hooks

## use-router

在 App.vue 中通过 provideRouter 后，即可在子组件中使用

```js
// App.vue
import { provideRouter } from 'utils/use-router';

export default {
  setup(props, context) {
    provideRouter(context.root.$router);
  },
};
```

```js
// Child.vue
import useRouter from 'utils/use-router';

export default {
  setup() {
    const { currentRoute } = useRouter();
    console.log(currentRoute);
    // {name: undefined, meta: {…}, path: "/god/game", hash: "", query: {…}, …}
  },
};
```
