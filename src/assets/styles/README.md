# styles

一些公用的 styles

## utils

scss 工具样式

1. `@mixin btn-ripple`

    button 点击后出现涟漪效果

    ```scss
    .control-btn {
      /* ... */
      border: none;
      outline: none;
      @include btn-ripple;
    }
    ```
