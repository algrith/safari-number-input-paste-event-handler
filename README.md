# safari-number-paste-handler

> 🧩 A lightweight utility to safely handle paste events on `<input type="number">` fields in Safari.

Safari does not properly sanitize pasted content in `<input type="number">` fields. It allows non-numeric characters and multiple decimal points, leading to unexpected or invalid values. This package provides a browser-aware workaround that intercepts paste events, resolves invalid numeric formats, and updates the input value correctly.

---

##  🚀 Features

- ✅ Fixes Safari-specific paste behavior for number inputs
- ✅ Ignores paste action when non-numeric characters are found in pasted value
- ✅ Ensures only one decimal point is allowed
- ✅ Maintains accurate caret position on insert
- ✅ TypeScript support
- ✅ Works with React, Vue, Angular, or plain JavaScript

---

##  📦 Installation

```bash
npm install @algrith/safari-number-paste-handler
# or
yarn add @algrith/safari-number-paste-handler
```

---

##  🔧 Usage

### ReactJs

```jsx
import { formatNumberInputValue } from 'safari-number-paste-handler';

const handleChange = (e) => {
  console.log(e.target.value);
};

<input
  type="number"
  onPaste={(e) => formatNumberInputValue(e, handleChange)}
  onChange={handleChange}
/>
```

### VueJs

```vue
<script setup>
import { formatNumberInputValue } from 'safari-number-paste-handler';

const handleChange = (e) => {
  console.log(e.target.value);
};
</script>

<template>
  <input
    type="number"
    @paste="(e) => formatNumberInputValue(e, handleChange)"
    @input="handleChange"
  />
</template>
```

### Angular

```
import { formatNumberInputValue } from 'safari-number-paste-handler';

onPaste(event: ClipboardEvent) {
  formatNumberInputValue(event, this.onChange.bind(this));
}
```

### Vanila JavaScript

```
<input id="numInput" type="number" />

<script type="module">
  import { formatNumberInputValue } from 'https://cdn.skypack.dev/safari-number-paste-handler';

  const input = document.getElementById('numInput');
  input.addEventListener('paste', (e) => {
    formatNumberInputValue(e, (event) => {
      console.log('Updated value:', event.target.value);
    });
  });
</script>
```

##  TypeScript Support

Types files can be found at https://github.com/algrith/safari-number-paste-handler/tree/main/src/types.

## Contributing

- Missing something or found a bug? [Report here](https://github.com/algrith/safari-number-paste-handler/issues).