# Quatro Desktop Client

A native desktop wrapper over the [quatro-web-client](https://github.com/usequatro/quatro-web-client).

The application is built with [Nativefier](https://github.com/nativefier/nativefier), a tool to create desktop apps by wrapping them with Electron in an OS executable.

## Building

Execute the `build` command passing the `--platform` and the `--environment` options. Example:

```bash
npm run build --platform=mac --environment=production
```

Allowed environments: `production`, `development` and `local`.

Allowed platforms: `mac`, `linux` and `windows`. Note that you'll likely need to be running these commands from a host machine using the same OS.
