# Library components

This directory contains the library components of the application. The library components are the components that are shared across
the application. They are the components that are used in multiple places in the application. Some examples of library components
are buttons, inputs, modals, etc.

The library components are placed in the `app/library` directory. And you can import them like so:

```js
import { Button } from '~/library/button'
```

As you can see, the library components are imported from the `~/library` directory. This is because the `~/` alias is set to the `app` directory.
Please do not use barrel files to export from the library directory. Instead, import the files directly where you need them.

For example, do this:

```js
import { Button } from '~/library/button'
```

Instead of this:

```js
import { Button } from '~/library'
```

It can cause circular dependencies in your project and make it harder to understand where things are coming from.


