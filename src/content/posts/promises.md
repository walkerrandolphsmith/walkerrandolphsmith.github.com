---
title: Promises
template: posts.hbt
date: 1477775004363
description: From callbacks to promises.
author: Walker Randolph Smith
type: article
public: true
tags: javascript
hero: default.jpg
---

Asynchronous programming in Javascript involves a control flow that is not sequential like what is
expected from most programming languages. This non-sequence nature is due to the result of a function
not being available immediately. In this scenario the program continues execution despite the result of the first
function not returning and the subsequent operations on that result not occurring. Asynchronous code may be a result of
physical limitations causing the reults to not be instant or guaranteed like file IO and network requests.
Asynchronous programming can be a challenging task and it has evolved quite a bit in Javascript since I began programming.
In a few short years I have solved this problem like many other Javascript developers: using callbacks, promises, and now
even `async` and `await`. Each of these approaches changes the structure of the asynchronous code as well as the control flow.
For many people seeing the differences between these techniques will actually feel like a stroll down memory lane.

## callbacks

The first technique I learned involved a pattern called callbacks. This term describes a technique of invoking a "callback"
function that will operate on the results of an asynchronous function invocation when the result is available. As mentioned
file IO is a great example of asynchronous code. Consider reading a file from disk:
```js
const contents = fs.readFile("my-file");
console.log(contents)
```

Unlike synchronous functions, `undefined` will be printed as contents because the file's contents have not yet been read from disk.
However if we need to perform an action with contents of the file we can accomplish this with a callback function.

```js
const action = (error, contents) => {
    if(error) console.log(error);
    else console.log("File was read! ", contents);
}
fs.readFile("my-file", action);
console.log("end");
```

In this example `action` is a callback function that will print the contents of the file when they have **eventually**
been retrieved. Understanding this code is not too difficult but is critical to understand the order in which things occur.
First the callback function, action, is declared. Then the `readFile` function is invoked. Immediately afterwards
`"end"` is printed to the console. Lastly the error or contents are printed to the console despite appearing
in the script prior to the last console statement. Callbacks allow us to handle asynchronous programming, great.
One common issue that occurs when using callbacks is described as `callback hell`. Often we find code in which
more asynchronous functions are called within the context of a callback function. Sticking with the file IO example lets
consider reading all files from a directory.

```js
fs.readdir('my-dir', (error, files) => {
    if(error) return error;
    files.forEach(file => {
        fs.readFile(file, (err, contents) => {
            if(err) return err;
            console.log(contents);
        });
    });
});
```

In this example a callback function is passed to `readdir` that performs some action once the directory has been read from disk.
Within that callback function, the retrieved files are iterated over and each read, which required another callback function
to handle the contents of the file read when the operation has completed. There are a few side effects of writing this code as
seen. It is very difficult to wrap the inner most callback function under test. Over shadowing of variables
like `error` become more likely. In this example I differentiated between the two with `error` and `err`. Is `readdirError`
and `readFileError` better? Likely not and the more nested asynchronous calls that are made the more difficult this naming
becomes. It also complicates the intention, read files from a directory, with the implementation details of doing so.
Lastly one common complaint of this code gives rise to the term callback hell, the further and further indentation of the callback functions.
The trail of `});` symbols at the end indicates how deeply nested this block has become. One solution to avoid this deep nesting is to
declare each callback function instead of using anonymous functions. This allows the function to be written with the same
indentation as the top level call to `readdir`.

## promises

A promise is an alternative construct that enables us to write more readable asynchronous code. Before the advent of ES2015 there
were many great node modules like `Q`, `bluebird`, `RSVP`, and many more that provided promises. Now Promise is a first class
citizen of the language. So what is a promise? It is merely a function that is passed the arguments resolve and reject.
The function is executed immediately by the Promise implementation, passing resolve and reject functions and after
some asynchronous work is complete the resolve or reject functions are called. As describe by MDN, a Promise is a proxy
for a value that has yet to be determined. A promise begins in a pending state and once the asynchronous call has completed
it is fulfilled with a value or rejected with an error. Upon its fulfillment or rejection a promise is ready to invoke a callback function.
```js
const handler = (err, response) => {
    if(err) return err;
    else return response.text();
};
fetch('http://resource').then(handler);
```

The `then` and `catch` function also return a promise so calls to them can be chained.

```js
fetch('http://resource')
    .then(res => res.text())
    .then(text => convertToXML(text))
    .then(xml => convertToJson(xml))
    .catch(err => console.log(err));
```

Often we find ourselves needing to wait for many asynchronous calls to be resolved before taking action. Consider
making a http request to a resource like the previous example and the response contained ids needed to make subsequent
http request for more detailed data. We can use `Promise.all` to ensure every promise has been fulfilled before invoking our
callback function by passing an array of promises and/or scalar values to the function.
```js
fetch('http://resource')
    .then(res => res.text())
    .then(text => convertToXML(text))
    .then(xml => convertToJson(xml))
    .then(items => Promise.all(
        items.map(i => fetch(`http://resource/details/${i.id}`))
    ))
    .catch(err => console.log(err));
```


## async await
Now ES2016 has described a new language feature to help us handle promises with the keywords `async` and `await`!
A function can de decorated with the `async` keyword that indicates it returns a Promise.
It's invocation can be decorated with the `await` keyword which allows us to read and write asynchronous code synchronously.
The await keyword indicates there is a blocking call and further execution will wait for the promises resolution.
```js
const getItems = async fetch('http://resource')
    .then(res => res.body);

const items = await getItems();
console.log(items);
```

In the previous example printing items is not `undefined`! Now we can write asynchronous code as if it were synchronous.
The subsequent lines are not executed until `getItems` has resolved or rejected the Promise.
In the case of a rejection the caller of getItems can be wrapped in a `try`/`catch` statement.

```js
try {
    const items = await getItems();
    console.log(items);
} catch(exception) {
    console.log("Oh no an error");
```

The synchronous structure has eliminated the every growing indentation of callback hell. Unfortunately this is not part
 of the ES2015 specification so in order to use this feature you'll need a bit of configuration.
The async-await node module can be a good candidate if your environment does not support `generators` because the module
is built on node-fibers allowing a function to be suspended without blocking Node's event loop. In my case I was already
using a JavaScript transpiler, Babel, and able to configure it with an additional plugin to get the new feature.
First I had to install the module using `npm install babel-plugin-transform-async-to-generator` and then update my babel configuration.
```
{
  "plugins": ["transform-async-to-generator"]
}
```