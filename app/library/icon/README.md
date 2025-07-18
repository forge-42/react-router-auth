# Icon generation and spritesheets

This directory is the output directory for the icons. The icons are generated from the `resources/icons` directory.

The icons are generated using the `vite-plugin-icons-spritesheet` package.

All the icons are generated as symbols inside of a spritesheet svg element and the `Icon.tsx`
component uses the spritesheet to display the icons.

The `Icon.tsx` component is a simple component that takes a `name` prop and displays the icon. It is fully
type-safe and highly configurable.