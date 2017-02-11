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

```shell
npm init --yes
```

After generating a minimal package we can edit it to specify things about our app.
At this point we may also want to create a `README.md` to describe the application and a `.gitignore` file to ignore
certain files and directories, such as `node_modules` directory, from version control.

Let's create a git repo and commit our first change.
```shell
git init
git commit -am "Initial commit to our app"
```

## VersionOne SDK
Lets setup the VersionOne SDK.
First we need to install it.
```shell
npm install --save v1sdk
```
The SDK does not directly require a dependency on an AJAX library to make HTTP requests, but instead allows the consumer
to choose the library of their choice and pass it as a parameter to the SDK.
In this case we will use `axios` as our library of choice so we need to install it as well.
```shell
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
module.exports = axiosConnectedSdk('V1Host', 'V1Instance', 443, true)
    .withCreds('v1User', 'v1Password');
    //.withAccessToken('token');
```

Note the `V1Host`, `V1Instance`, `V1User`, and `V1Password`.
The host and instance can be found on the url you use to access your VersionOne instance.
For example if your VersionOne instance is found at `https://CompanyA/Production`, then
`V1Host` is `CompanyA` and `V1Instance` is `Production`.
`443` and `true` indicate the port and a boolean that represents whether the instance uses https.
`V1User` and `V1Password` are a valid username and password pair for the instance.
The SDK currently supports Basic authentication with and username and password and
also supports VersionOne AccessTokens. In the above example the SDK is using Basic authenticaion
but the commented line shows how to use an AccessToken.

If you are leveraging ES2015 you can include the SDK using `import` syntax as opposed to CommonJS `require`: 

```js
 import axios from 'axios';
 import sdk, { axiosConnector } from 'v1sdk';
 
 const axiosConnectedSdk = axiosConnector(axios)(sdk);
 const v1 = axiosConnectedSdk('V1Host', 'V1Instance', 443, true)
    .withCreds('v1User', 'v1Password');
  //.withAccessToken('token');
 ```

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

```shell
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



The sdk supports much more than querying Assets. In order to fully leverage 
the sdk lets look into the anatomy of its API.


## Attributes

The Create and Update commands provided by the SDK take an object of Attributes.
Create takes Attributes that will exist on the new asset,
and Update takes Attributes that will modify an existing Asset.
The object is structured the same in both cases:

Given the following object as an example: 

```js
{
    Name: 'My Bundle',
    Phase: 'Phase:123',
    ChangeSets: ['ChangeSet:123', 'ChangeSet:456']
}
```

The keys are valid Attribute names for a given Asset.
The value of each key is valid based on the following:

1. **Scalars:** like `Name` take a string value.  

2. **Single-value relation:** like `Phase` takes a string that is a valid Oid of
an existing asset.  

3. **Multi-value relations:** like `ChangeSets` take an array.
If the array contains string Oids then a relationship is added.
This is merely a short hand for `{ "value": "ChangeSet:123", "act": "add" }`  
If you want to remove an asset from the relationship then an object must be in 
the array that is of the form `{ "value": "ChangeSet:123", "act": "remove" }`

## Create

Create has two parameters an AssetType and Attributes:

```js
.create('Bundle', {
    Name: 'My Bundle',
    Phase: 'Phase:123',
    ChangeSets: ['ChangeSet:123', 'ChangeSet:456']
});
```


## Update

Update has two parameters an Oid of an existing Asset and Attributes:

```js
.create('Bundle:123', {
    Name: 'My Bundle',
    Phase: 'Phase:123',
    ChangeSets: ['ChangeSet:123', 'ChangeSet:456']
});
```


## Query

Query via the SDK leverages the `query.v1` endpoint. The SDK accepts an object
That contains these keys: `from`, `select`, `filter`, `find`. 

`from`: is a valid AssetType to query on  
`select`: is an array of Attributes and Related Assets' Attributes to include in your projection  
`filter`: is a array of filters to apply to your query  
`find`: is a string that further filters the results  

The following is a way to search for all Epics that are not Closed and have a name that begin's with "My Epic Name"
The result set will be an array of objects with the shape described by the select key.

```js
v1.query({
      'from': 'Epic',
      'select': [
          'Name',
          'Scope',
          'AssetType',
          'Category',
          'Category.Name'
      ],
      'filter': [
          "AssetState!='Closed'"
      ],
      'find': 'My Epic Name*'
  }

```

## Operations

VersionOne provides operations that can be issued on Assets. The SDK
allows for those operations to be invoked with an Oid of an existing Asset
 and the name of the operation. Note: Supported operations are dependent on the 
 AssetType!

```js
v1.executeOperation('Story:123', 'Close')
```