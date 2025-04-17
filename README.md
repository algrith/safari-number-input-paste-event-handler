<h4 align="center">
  <a href="#">Algrith Safari Number Fix (safari-numfix)</a>
</h4>

<div align="center">
  <h2>
    🧩 A lightweight utility to safely handle paste and keydown events on number input fields in Safari.
  </h2>
</div>

Safari has a sanitization deficiency in `<input type="number">` fields compared to modern browsers. It allows non-numeric characters and multiple decimal points, leading to unexpected or invalid values. This package provides a browser-aware workaround that intercepts paste & keydown events, corrects invalid numeric formats, and updates the input value correctly.

<br />
<p align="center">
  <a href="https://github.com/astongemmy/safari-numfix/main/LICENSE">
    <img alt="Algrith Safari Number Fix (safari-numfix) is released under the MIT license." src="https://img.shields.io/badge/license-MIT-blue.svg" />
  </a>
  <a href="https://www.npmjs.com/package/@algrith/safari-numfix">
    <img alt="npm downloads/month" src="https://img.shields.io/npm/dm/@algrith/safari-numfix" />
  </a>
</p>


##  🚀 Features

- ✅ Ignores paste actions that include non-numeric characters
- ✅ Fixes Safari-specific paste behavior for number inputs
- ✅ Works with React, Vue, Angular, or plain JavaScript
- ✅ Maintains accurate caret position on insert
- ✅ Ensures only one decimal point is allowed
- ✅ Restricts non-numeric entries on keydown
- ✅ TypeScript support


##  📦 Installation

```bash
npm install @algrith/safari-numfix
# or
yarn add @algrith/safari-numfix
```


##  🔧 Usage

### ReactJs

```tsx
import { keyDownEventHandler, pasteEventHandler } from '@algrith/safari-numfix';

const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  console.log(event.target.value);
};

<input
  onPaste={(e) => pasteEventHandler(e, handleChange)}
  onKeyDown={keyDownEventHandler}
  onChange={handleChange}
  type="number"
/>
```


### VueJs

```vue
<script setup>
import { keyDownEventHandler, pasteEventHandler } from '@algrith/safari-numfix';

const handleChange = (e) => {
  console.log(e.target.value);
};
</script>

<template>
  <input
    @paste="(e) => pasteEventHandler(e, handleChange)"
    @keydown="keyDownEventHandler"
    @input="handleChange"
    type="number"
  />
</template>
```

### Angular

```ts
import { keyDownEventHandler, pasteEventHandler } from '@algrith/safari-numfix';

onKeyDown(event: KeyboardEvent) {
  keyDownEventHandler(event);
};

onPaste(event: ClipboardEvent) {
  pasteEventHandler(event, this.onChange.bind(this));
}
```

### VanillaJs

```html
<input id="numInput" type="number" />

<script type="module">
  import { keyDownEventHandler, pasteEventHandler } from 'https://cdn.skypack.dev/@algrith/safari-numfix';

  const input = document.getElementById('numInput');

  input.addEventListener('keydown', keyDownEventHandler);

  input.addEventListener('paste', (e) => {
    pasteEventHandler(e, (event) => {
      console.log('Updated value:', event.target.value);
    });
  });
</script>
```


##  TypeScript Support

Types files can be found at https://github.com/algrith/safari-numfix/tree/main/src/types.ts.


## Contributing

- Missing something or found a bug? [Report here](https://github.com/algrith/safari-numfix/issues).