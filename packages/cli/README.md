# nativecn-ui

A CLI for adding components to your project.

Inspired by [shadcn/ui CLI](https://github.com/shadcn-ui/ui/tree/main/packages/cli).

## Usage

Use the `init` command to initialize dependencies for a new project.

The `init` command installs dependencies and adds a basic `tailwind.config.js`.

```bash
npx nativecn-ui init
```

## add

Use the `add` command to add components to your project.

The `add` command adds a component to your project and installs all required dependencies.

```bash
npx nativecn-ui add [component]
```

### Example

```bash
npx nativecn-ui add Button
```

You can also run the command without any arguments to view a list of all available components:

```bash
npx nativecn-ui add
```

## Documentation

Visit https://nativecn.mintlify.app/introduction to view the documentation.

## License

Licensed under the [MIT license](https://github.com/Mobilecn-UI/nativecn-ui/blob/main/LICENSE).
