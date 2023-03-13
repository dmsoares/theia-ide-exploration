# MIT CodeIDE

## Application Architecture

This solution implements a client/server architecture. It uses the [Theia](https://theia-ide.org) platform for building IDEs. A Theia IDE consists of two separate processes (a backend and a frontend) communicating through JSON-RPC messages over WebSockets or REST APIs over HTTP. This makes it a good fit for having the frontend running in the browser while both the backend and the development environment are being run and hosted in a remote server.

Note that, by default, the `backend` process is also responsible for serving the `frontend` to the client. Once started on the client (e.g., a browser), the frontend requests a websocket connection to the backend, through which all communication is done.

Importantly, while a `backend` instance allows multiple client connections, all of these share the same environment. Thus, typically, a dedicated `backend` process should be running for each user.

### About Theia

[Theia](https://theia-ide.org) is a self-advertised _Open, Flexible and Extensible Cloud & Desktop IDE Platform_. It is open-source (Eclipse Public License v. 2.0) and actively under development.

Its design is extension-based. What this means is that an IDE is the composite of different extensions (installed at compile time), which all have _full access to internals of Theia via dependency injection_.

It also supports VSCode extensions (installable at runtime), as it shares the same (limited) API.

![Alt text](https://theia-ide.org/extensiontypes.png)

Dependency injection (provided by [InversifyJS](https://inversify.io/)) is an integral part of developing extensions. This allows interface-oriented programming and rebinding interfaces to our own implementations, replacing implementations from other extensions (including from the `core` extension).

## Application Deployment

## Infrastructure

We need to have live servers dedicated to running the backends.

We also need to provide a way for persisting each user's workspace (possibly via [EFS](https://aws.amazon.com/efs/)).

A way must be found to contain each user to their own workspace. Since there is a 1:1 relation between users and IDE backend processes, a couple of possible solutions are:

-   running a containerized backend for each active user;
-   running multiple backends on the same host, while putting each user inside a jail;

Since users will have access to a shell running on our servers, another challenge would be how to avoid abuse of server resources by a bad actor with access to a client/server connection. That is, extra care must be put on how to limit what a user can do. Possible abuse can range from excessively consuming internet traffic, to compromising the whole Mit infrastructure.

## Features

### Code Editor

Runs [Monaco](https://microsoft.github.io/monaco-editor/), provided by a `Theia` extension.

### Interactive Shell

Runs [XTermJS](http://xtermjs.org/), provided by a `Theia` extension.

### NodeJS Runtime

Runs every process the host machine allows.

### Persist/Restore User State

User data persistence is handled server-side.

![UI Example](/ui-example.png)

# Installation

The example of how to build the Theia-based applications with the mit-extension.

## **Nota bene**:

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
