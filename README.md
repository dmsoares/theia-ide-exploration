# mit-extension

The example of how to build the Theia-based applications with the mit-extension.

## NOTA BENE:

Edit the file `/mit-extension/config.json` and set the value `FILE_URI` to point to a valid file in your filesystem.
For now, this is the file which is open by default when the editor is opened.

## Getting started

Please install all necessary [prerequisites](https://github.com/eclipse-theia/theia/blob/master/doc/Developing.md#prerequisites).

## Running the browser example

    yarn start:browser

_or:_

    yarn rebuild:browser
    cd browser-app
    yarn start

_or:_ launch `Start Browser Backend` configuration from VS code.

Open http://localhost:3000 in the browser.

## Running the Electron example

    yarn start:electron

_or:_

    yarn rebuild:electron
    cd electron-app
    yarn start

_or:_ launch `Start Electron Backend` configuration from VS code.

## Developing with the browser example

Start watching all packages, including `browser-app`, of your application with

    yarn watch

_or_ watch only specific packages with

    cd mit-extension
    yarn watch

and the browser example.

    cd browser-app
    yarn watch

Run the example as [described above](#Running-the-browser-example)

## Developing with the Electron example

Start watching all packages, including `electron-app`, of your application with

    yarn watch

_or_ watch only specific packages with

    cd mit-extension
    yarn watch

and the Electron example.

    cd electron-app
    yarn watch

Run the example as [described above](#Running-the-Electron-example)

## Publishing mit-extension

Create a npm user and login to the npm registry, [more on npm publishing](https://docs.npmjs.com/getting-started/publishing-npm-packages).

    npm login

Publish packages with lerna to update versions properly across local packages, [more on publishing with lerna](https://github.com/lerna/lerna#publish).

    npx lerna publish
