---
title: Electron Native Apps
template: posts.hbt
date: 2016-10-22
postId: 0
description: A introduction to building Election native applications with JavaScript
author: Walker Randolph Smith
type: article
public: true
tags: electron, javascript
related: [2]
hero: default.jpg
---

Electron allows for creating cross platform, native applications that run on the Node.js runtime.
Today, native applications can be created with a consistent set of tools including Javascript, HTML, and CSS.
Electron, developed by Github, was orginally known as Atom Shell as it powered the homegrown text editor created at Github, Atom.
Now well known applications such as Slack, Atom, Visual Studio Code, and more have been developed with Electron.
I am going to cover creating a minimal Electron application.

## Getting Started
First, let's add a `README.md` to describe the project. Next we will create a `.gitignore` file to ignore certain
files and directories from version control. Since we are creating a node application lets add the following lines to
the `.gitignore`.

```
node_modules/
*.log
```


Now we will create our `package.json` to configure aspects of the application. In order to pre-fill the package with default
values we can use the `--yes` flag at the end our the following command:

```
npm init --yes
```

Let's create a git repo and commit our first change.
```
git init
git add .
git commit -m "Initial commit to our app"
```

## Dependencies
Electron can come in a pre-packaged manner and we will install this with the following command:
```
npm install --save electron-prebuilt
```

## Setup

The entire application can be created with only three files: `package.json`, `index.js`, and `index.html`.
We will create a directory like
```
app/
├── README.md
├── .gitignore
├── package.json
├── index.js
└── index.html
```
The `index.html` file serves as the user interface. In our case we want a document that contains the text "hello world".

```html
<html>
    <body>
        Hello World
    </body>
</html>
```

The `index.js` file will be used to manage opening a window and loading our user interface.

```js
const { app, BrowserWindow } = require('electron');

let win;
const createWindow = () => {
    win = new BrowserWindow({width: 800, height: 600});

    win.loadURL(`file://${__dirname}/index.html`);

    win.webContents.openDevTools();

    win.on('closed', () => {
        win = null;
    });
};

app.on('ready', createWindow);
```

First we import portions of electron, the app and BrowserWindow. We declare win to ensure it is not removed
by garbage collection. `createWindow` is a function that creates a new BrowserWindow, loads the user interface from disk,
opens Chrome Developer Console, and creates an event listener for when the window is closed. Lastly,
when the app is ready we invoke the `createWindow` function.

## Running the app
In order for electron to process our `index.js` file and open a window we must tell it to do so.
```
./node_modules/.bin/electron index.js
```

In order to make this easier to run lets add an npm script to `package.json` that runs the app.
Edit the package to contain a start command within the scripts.
```
"scripts": {
    "start": "electron index.js"
}
```

Now when we run the app it will open the application in a new window that contains our text hello world!
