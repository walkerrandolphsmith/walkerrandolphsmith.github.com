---
title: Array
template: posts.hbt
date: 2016-10-29
description: filter, map, reduce, and beyond
author: Walker Randolph Smith
type: article
public: true
tags: javascript
hero: default.jpg
---

Sets, lists, and collections are structures I deal with almost everyday when programming. ES5 brought cool  features
like map and reduce, but prior to ES2015 I often used libraries like underscore and lodash to help me operate on arrays.
These libraries and another, Rambda, are still on my radar since they have optimized many of these operations, however
there are a couple common operations  I will cover.

## isArray?
Sometimes we need to know if a particular variable is an array. We may want to process the value differently if is an array.
```js
const isArray = Array.isArray(object);
```

## map
The single most used array operation I use is `map`. Map is useful when transforming one array to another.
When examining the anatomy of map we can see it is a function
that is on the array prototype. The function returns an array and accepts a single function as its arguments.
```js
const newList = [1, 2, 3].map(e => e * 2)
```
The argument to the map function is a function whose argument is an element in the list. The function
will be invoked for each element in the original array. The return value of each invocation will be an element in the
resulting array. In this example the original array is `[1, 2, 3]` and the function that is an argument to map is
`e => e * 2`. This function will operate on each element in the original list by returning its product with 2.
Each return value will be an element in the `newList` so its value will be `[2, 4, 6]`.


## filter
Filter is a function on the array prototype with a signature very similiar to `map`. Filter results in a new array
with the same elements or a subset of elements of the original array.
```js
const newList = [1, 2, 3].filter(e => e > 1)
```
The argument to the filter function is function that takes an element as a parameter and is also known as a predicate.
The result of its invocation is a boolean value indicating whether the element should be included in the resulting
array. The element is included in the resulting array only if the result is truthy, and otherwise the result will be
filtered out and not be included in the resulting array.

## some and every
In some cases we need to know if every element in an array satisfies a predicate. In other cases we would like to know
if at least one element in the array satisfies a predicate. We can use the `every` and `some` functions on the array
prototype!
```js
const every = [1, 2, 3].every(e >= 0);
const some = [1, 2, 3].some(e > 2);
```


## reduce
Reduce is another powerful operation that I often use. Reduce is helpful when coalescing an array into a single value.
Its signature is slightly different from map and filter. Reduce is a function on the array prototype. It results in a new
array and accepts two arguments, a function and a starting value. The first argument is a function that accepts four
arguments: The coalesced value, the current element in the original array, an index of iteration, and the original array.
Often you will see the third and forth parameter omitted from the signature if they are unused.
```js
const coalescedValue = [1, 2, 3].reduce((sum, e) => sum + e, 0)
```
In this example we are taking a collection of integers and coalescing them into a sum. The original array is `[1, 2, 3]`.
The first argument is the function `(sum, e) => sum + 3` describes how we will accumulate the sum over each iteration of the
original array, i.e. add each element of the array to a running total. The second argument is the starting value of the sum.
If the original array had no elements then the `coalescedValue` would be 0.

Consider the following example:

I have an object with key value pairs for each file.
If I wanted to convert this to an array of files I may decide reduce is a good candidate.
I can get an array of keys from the object using `Object.keys()` and call reduce starting with an empty array of files.
For each iteration of the keys I can concat an array containing the file to the resulting array of files.

```js
const files = {
    0: file1,
    1: file2,
    ...
  }
const array = Object.keys(files)
    .reduce((array, key) => array.concat([files[key]]), [])
```

## find
Finding a specific element in an array tends to be another common operation I find myself writing.
Find a person in an array where the name is `Tom` or find the first non negative value in the array.
Find is a function on the array prototype that returns the first element in the array that matches some predicate.
The function accepts one argument a predicate.
```js
const people = [{name: 'Walker'}, {name: 'Tome'}];
const element = people.find(e => e.name === 'Tom');
```

## find index
Sometimes when finding an element in an array we only care to know its position in the array.
findIndex allows us to use a predicate to find the first element in the array that satisfies a condition
but only return its index in the array.
```js
const index = [5, 9, 2].findIndex(e => e % 2 === 0);
```

## range
Often times I need to do something n times. Although this can be accomplished with a for loop we don't get the fluent
syntax. We can create an array with n elements with the following:
```js
Array.from(Array(n), (_, i) => i)
```

We can also shift the values of the elements by providing an offset
```js
Array.from(Array(n), (_, i) => offset + i)
```

I have found this to be a tad cumbersome and find myself creating a utility:
```js
range = (n, offset=0) => Array
    .from(Array(n), (_, i) => offset + i)
```

## distinct
Getting unique values from an array has never been easier. When leveraging a `Set`, by definition having distinct elements,
and spread operator we can retrieve unique members of an array.
```js
const unique = [...new Set([1, 2, 2, 3])]
```


## select many
Coming from a background using C# and LINQ I find myself missing the `SelectMany` function.
Sometimes I have a homogeneous array such that each element is an object with a property that contains an array and
I want an array which contains every element from every nested array. An example may be an array of teams in which
every team has an array of members that have membership in the team. I may need to get one array that contains all members
across all teams. This can be accomplished using reduce!
```js
const members = teams.reduce(
    (members, team) => members.concat(team.members), []
)
```


## group by
Group by is another aspect of LINQ I always loved. Given an array of elements divide the elements into a
collection of arrays such that each array is keyed by the property it is grouped by. Consider I have an array of shirts
and I want three new arrays where each array is filtered by size. I can accomplish this by grouping the shirts by size
which will result in a dictionary with keys for each unique size that are paired to the array of shirts of that size.
This can be accomplished by chaining `map` and  `reduce`!

```js
const groupBy = by => array => array
    .map(e => ({ [by(e)]: e }))
    .reduce((a,b) => Object.assign(a,b), {})
```

Let's see how we can leverage our group by with the shirt analogy.
```js
const shirts = [
    {id: 0, size: "L"},
    {id: 1, size: "L"},
    {id: 2, size: "S"}
]
const groupBySize = groupBy(e => e.size);
const groups = groupBySize(shirts)
```