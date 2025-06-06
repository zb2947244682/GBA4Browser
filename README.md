# GBA4Browser

A web-based Game Boy Advance emulator built with React and TypeScript, powered by the [@thenick775/mgba-wasm](https://www.npmjs.com/package/@thenick775/mgba-wasm) package.

## Features

- Play GBA games directly in your browser
- Load your own ROM files
- Keyboard controls
- Pause, resume, and reset functionality

## Development

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Setup

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Deployment

For proper functionality, the server must provide the following headers:

```
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

This is required for WebAssembly threading support.

## Controls

- D-Pad: Arrow Keys
- A Button: Z
- B Button: X
- L Button: A
- R Button: S
- Start: Enter
- Select: Backspace

## License

This project is licensed under the ISC License. 