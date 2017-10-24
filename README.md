# vue-lite-tooltip

> show tooltip to vue
[npm](https://www.npmjs.com/package/vue-lite-tooltip)

## Requirements

- vue: ^2.0.0

## Install

From npm:

``` sh
$ npm install vue-lite-tooltip --save
```

## use

``` js
import Vue from 'vue';
import { VueLiteTooltip } from 'vue-lite-tooltip';

Vue.use(VueLiteTooltip)

...

<button type="button" v-tooltip="{text: 'hello', position: 'right', width: 100}">test</button>

```


## Params

text - tooltip text
position - top, bottom, right, left
show - if false tooltip hidden
width - int size
color - text color
background - background color


## License

[MIT](https://opensource.org/licenses/MIT)
