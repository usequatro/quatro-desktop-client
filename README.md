# Quatro Desktop Client

A native desktop wrapper over Quatro - [https://usequatro.com](https://usequatro.com).

## Unused

🟡 After exploring this approach, we decided not to use this repository and instead rely on ToDesktop.

The Quatro desktop app is made with [ToDesktop](https://www.todesktop.com/). ToDesktop handles code signing and native installers, which is extremely convenient for us. Check it out!

<a href="https://www.todesktop.com/" target="_blank"><img src="https://www.todesktop.com/g/logo.png" alt="ToDesktop Logo" width="50"/></a>

## Implementation

A desktop app is bundled with [Nativefier](https://github.com/nativefier/nativefier), a tool to create desktop apps by wrapping them with Electron in an OS executable.

## Building

Execute the `build` command passing the `--platform` and the `--environment` options. Example:

```bash
npm run build -- --platform=mac -- --environment=production
```

Allowed platforms: `mac`, `linux` and `windows`.

Allowed environments: `production`, `development` and `local`.

## Creating Windows Installer

A Windows executable can be created by running the `dist-windows` command, it uses [Electron Installer](https://github.com/electron/windows-installer) to package our electron build in a single `.exe` file.

```bash
npm run dist-windows
```
