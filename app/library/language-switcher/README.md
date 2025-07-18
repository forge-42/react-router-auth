# Language switcher

This is a simple language switcher for your website. It uses a simple JavaScript to switch between languages.

It comes with minimal styling so you can style it however you want.

## How to use

1. Import into wherever you want to use the component.
2. Use the `LanguageSwitcher` component.

```js
import { LanguageSwitcher } from '~/library/language-switcher'

export default function MyComponent() {
  return (
    <LanguageSwitcher />
  )
}
```

## Benefits

- It changes the url with the current location by pre-pending the language code.
- It uses all available languages from the `i18n` configuration.
- It uses the `useI18n` hook to get the current language and the available languages.