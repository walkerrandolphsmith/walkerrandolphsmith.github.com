---
title: VersionOne JavaScript SDK
template: posts.hbt
postId: 2
date: 2016-10-21
description: Getting started with the VersionOne JavaScript SDK
author: Walker Randolph Smith
type: article
public: true
tags: VersionOne, JavaScript
related: [0,1]
hero: workshop.png
---

Recently the VersionOne JavaScript SDK received some love and got a major version release.
The SDK allows communication with a VersionOne instance by exposing some of the well documented apis including
 `query.v1`, `rest-1.v1`, and `metav1`. The SDK ultimately makes HTTP requests to a specified VersionOne instance.
In this scenario I will not consider CORS and make all the requests from a server.
This article assumes prior knowledge around Node.js and javascript.
I will cover how to set up a minimal node application that uses an express server and the SDK to make queries to VersionOne.
You can follow along with this git repo [sample-v1sdk-app](https://github.com/walkerrandolphsmith/sample-v1sdk-app).

 ## Getting Started
This is a node application and therefore we will start by creating our `package.json`.

```
npm init --yes
```

After generating a minimal package we can edit it to specify things about our app.
At this point we may also want to create a `README.md` to describe the application and a `.gitignore` file to ignore
certain files and directories, such as `node_modules` directory, from version control.

Let's create a git repo and commit our first change.
```
git init
git add .
git commit -m "Initial commit to our app"
```

## VersionOne SDK
Lets setup the VersionOne SDK.
First we need to install it.
```
npm install --save v1sdk
```
The SDK does not directly require a dependency on an AJAX library to make HTTP requests, but instead allows the consumer
to choose the library of their choice and pass it as a parameter to the SDK.
In this case we will use `axios` as our library of choice so we need to install it as well.
```
npm install --save axios
```

Now that we have installed our dependencies we can create an instance of the SDK.
Let's create a file that exports the constructed instance and call it `V1Server`.

```js
const axios = require('axios');
const v1sdk = require('v1sdk/dist/index');
const sdk = v1sdk.default;
const axiosConnector = v1sdk.axiosConnector;

const axiosConnectedSdk = axiosConnector(axios)(sdk);
module.exports = axiosConnectedSdk('V1Host', 'v1Instance')
    .withCreds('v1User', 'v1Password');
    //.withAccessToken('token');
```

Note the `V1Host`, `V1Instance`, `V1User`, and `V1Password`.
The host and instance can be found on the url you use to access your VersionOne instance.
For example if your VersionOne instance is found at `https://CompanyA/Production`, then
`V1Host` is `CompanyA` and `V1Instance` is `Production`.
`V1User` and `V1Password` are a valid username and password pair for the instance.
The SDK currently supports Basic authentication with and username and password and
also supports VersionOne AccessTokens. In the above example the SDK is using Basic authenticaion
but the commented line shows how to use an AccessToken.

The module that is exported is an object that contains methods for `create`, `update` and `query` of VersionOne Assets.
In addition in version 2.1.0 of the SDK methods `queryDefinition` and `activityStream` are available.

Let's use this module to query our VersionOne instance for PrimaryWorkitems' names. We need to create a `server.js` file.

```js
var v1 = require('./V1Server');

v1.query({
    'from': 'PrimaryWorkitem',
    'select': [
        'Name'
    ]
}).then(assets => {
    console.log(assets);
});
```

In order to make this easier to run lets add an npm script to `package.json` that runs the app.
Edit the package to contain a start command within the scripts.

```
"scripts": {
    "start": "node server.js"
}
```

Now when we run the app it will immediately make a request to the VersionOne instance
and print the response to the console.

## Express
Now we can start building the web server. I will choose express, lets install it.

```
npm install --save express
```

Let's update `server.js`
to create an express server and listen on port 3000. It will look something like:

```js
var express = require('express');

const app = express();
const v1 = require('./V1Server');

app.use('/', (request, response) => {
    response.status(200).send('hello world');
});

app.use('/backlog', (request, response) => {
    v1.query({
        'from': 'PrimaryWorkitem',
        'select': [
            'Name'
        ]
    }).then(assets => {
        response.status(200).send(assets);
    });
});

app.listen(3000, error => {
    if(error) {
        console.error(error);
    } else {
        console.info(`
            ==> Listening on port 3000.
            Open http://localhost:3000/.
         `);
    }
});
```

The server returns the text hello world when requesting the root route, `/` and the response from the v1 query when
requesting the `backlog` route.