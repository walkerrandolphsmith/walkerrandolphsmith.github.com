---
title: Knockout and Durandal
template: posts.hbt
postId: 3
date: 2014-04-15
description: Creating a single page application.
author: Walker Randolph Smith
type: article
public: true
tags: javascript
related: [2]
hero: city.jpg
---

Single page applications are web applications contained on a single HTML file that are dynamically updated using client side JavaScript in response to user interactions.
This article will discuss creating a SPA using Durandal and Knockout. This technology stack leverages a variation on
the traditional Model View Controller pattern called Model-View-View Model, **MVVM**, which a design pattern for building user interfaces.
The pattern divides the user interface into three major components.
The Models represent the application's stored data. Ajax can be used with server-side code to read and write the stored model data.
The View-Models are JavaScript objects that represent a subset of data and operations on that data required by a specific user interface to render.
The Views are UI components that graphically expose the View-Model data and operations.
Durandal is one of many JavaScript frameworks that leverage this design pattern. One emerging giant is Angular and yesterday it was announced, [here](http://eisenbergeffect.bluespire.com/angular-and-durandal-converge/), on Twitter that Durandal and Angular will converge!


## Dependency Management

Require.Js supports the AMD, Asynchronous Module Definition, API to enable application to manage JavaScript dependencies. JavaScript libraries are loaded by HTML script tags in which the order of the libraries in the tag determine when they are loaded.
The dependecy of one library on another is weakly stated because the order in which the libraries occur in the script tag must be known by the developer.

Require.Js looks for a `data-main` attribute to start script loading in which modules are loaded relative to a base URL.
The index.html should contain a script tag with said attribute which indicates the module ID to load, in this case `main`

```
<script data-main="scripts/main.js" src="scripts/require.js"></script>
```

The relative path can be configured in this script as follows:

```js
requirejs.config({
    baseUrl: '/',
    paths: {
        'text': '../Scripts/text',
        'durandal': '../Scripts/durandal',
        'plugins': '../Scripts/durandal/plugins',
        'transitions': '../Scripts/durandal/transitions'
    }
});
```

The next code block will be added to `main.js` and demonstrates the use of modules and the use of the define function to manage dependencies.

```js
define('jquery', function() { return jQuery; });
define('knockout', ko);

define(['durandal/system', 'durandal/app', 'durandal/viewLocator'],
 function (system, app, viewLocator) {
    system.debug(true);

    app.title = 'Durandal Starter Kit';

    app.configurePlugins({
        router: true,
        dialog: true,
        widget: true
    });

    app.start().then(function() {
        //Replace 'viewmodels' in the moduleId with 'views' to locate the view.
        //Look for partial views in a 'views' folder in the root.
        viewLocator.useConvention();

        //Show the app by setting the root view model with a transition.
        app.setRoot('viewmodels/shell', 'entrance');
    });
});
```

The define function is working with JavaScript modules opposed to script files to avoid global namespace issues.
Define can take an object literal or a function as a parameter if no dependencies exist.
If the module does have dependencies then the first argument to define is an array of dependency names.
The second argument, a function, called the factory function, returns an object that defines the module.
The dependency names in the array will be passed to this function as arguments and must be listed in the same order as they occur in the array.
In the code block above one define function has an array as the first argument and a function as the second argument.
The function's arguments are system, app, and viewLocator and directly correspond with the elements of the array.
The second parameter is registered with the define function so the dependencies have been loaded and executed before passed as modules as arguments to the function.

## Durnadal

Using Durandal, within the body of this factory function a module, app, sets its root view to `viewmodels/shell`.
This indicates the View-Model that is initially loaded is named shell and resides in the `viewmodels` directory.
The View-Models have corresponding Views and are associated by name. Therefore there is also a shell View.
The shell View-Model will be used to handle the routing of our SPA.

```js
define([
      'plugins/router',
      'durandal/app'
],
    function (
        router,
        app
    ) {
        "use strict";

        var obj = {
            router: router,
            activate: function () {
                router.map([
                    {
                      route: '',
                      title: 'Home',
                      moduleId: 'viewmodels/home',
                      nav: true
                    }
                ]).buildNavigationModel();

                return router.activate();
            }
        };

        return obj;
    });
```

Routes will be triggered when `router.navigate('your/hash/here');` is called or the typical trigger using an anchor, `a`, element.
The `shell` View is a simple `div` element with a `data-bind` attribute for the router.

```
<div class="container page-host"
     data-bind="router: { transition:'entrance', cacheViews:true }">
</div>
```


## Knockout

Now that the shell of the application is configured we can discuss how Knockout can be used to create responsive UI with a clean data model.

Knockout has two features that make it awesome, dependency tracking to automatically update UI based on model.
declarative binding to connect components of the UI to the model. As shown in the routing above the default route has a moduleId `viewmodels/home`.

```js
define([
        "knockout",
        "durandal/app",
        "viewmodels/toDoItem/list"
], function (
        ko,
        app,
        ToDoItems
    ) {
    "use strict";

    var isList = ko.observable("list");
    var obj = {
        tasksDueToday: new ToDoItems(),
    };

    obj.activate = function () {
    };

    return obj;
});
```

This View-Model uses the define function to pass three modules into its factory function, including the View-Model, `list`.
One property of the list is tasksDueToday which is a `new` ToDoItems.
Notice ToDoItems was passed as a module to the factory function using the name list in the dependencies array.

The corresponding View for the home View-Model is using declarative binding to connect the View-Model's tasksDueToday property and use dependency tracking to inject the View corresponding to the taskDueToday View-Model.

```
<section>
    <header>
        <h1>To Do List</h1>
    </header>
    <div class="to-do-list">
        <!--ko compose: tasksDueToday--><!--/ko-->
    </div>
</section>
```

The following is an example of a to do list with more features including
creating related tasks, adding labels, filtering by label, retrieving the list and its count.

```js
define([
       "durandal/app",
        "models/TaskStatus",
        "viewmodels/toDoItem/toDoItem",
        "viewmodels/toDoItem/summary",
        "viewmodels/toDoItem/new"
], function (
        app,
        TaskStatus,
        ToDoItem,
        ToDoItemSummary,
        CreateToDoItem
) {
    "use strict";

    var ctor = function () {
        var self = this;
        self.status = ko.observable('all');
        self.items = ko.observableArray();
        self.newTask = ko.observable();

        self.numberOfTasks = ko.computed(function() {
            if (self.status() == 'all') {
                return self.items().length;
            } else {
                return self.items().filter(function (task) {
                    return task.toDoItem().status() == self.status();
                }).length;
            }
        });

        self.filteredItems = ko.computed(function() {
            if (self.status() == 'all') {
                return self.items();
            } else {
                return self.items().filter(function(task) {
                    return task.toDoItem().status() == self.status();
                });
            }
        });


        self.getItems = function (status) {
            if (status === 'all') {
                return self.items();
            }else return ko.utils.arrayFilter(self.items(), function (item) {
                var st = item.toDoItem().status();
                return (st === status);
            });
        };

        self.getNumberOfItems = function (status) {
            if (status === 'all') {
                return self.items().length;
            } else return ko.utils.arrayFilter(self.items(), function (item) {
                var st = item.toDoItem().status();
                return (st === status);
            }).length;
        };

        createNewTask();
        self.addTask = addTask;
        self.activate = activate;

        function activate(activationData) {
            if (activationData == null) {
                return;
            }
            self.items(activationData.items);
        }

        function addTask(task) {
            if (task == null) {
                return;
            }
            var newTask = new ToDoItemSummary();
            newTask.activate({ toDoItem: task });
            self.items.push(newTask);
            createNewTask();
            newTask.on("task:removed", removeTask);
        }

        function createNewTask() {
            var newTask = new CreateToDoItem();
            var newToDoItem = new ToDoItem();
            newToDoItem.activate({
                status: TaskStatus.unstarted.label
            });
            newTask.activate({
                toDoItem: newToDoItem
            });
            self.newTask(newTask);
            newTask.on("task:new:saved", addTask);
        }

        function removeTask(task) {
            var taskToRemove = ko.utils.arrayFilter(
                self.items(), function(item) {
                    return (item.toDoItem === task);
                })[0];

            self.items.remove(taskToRemove);
        }

        self.filterAll = function() {
            self.status('all');
        };
        self.filterUnstarted = function() {
            self.status(TaskStatus.unstarted.label);
        };
        self.filterStarted = function() {
            self.status(TaskStatus.started.label);
        };
        self.filterComplete = function() {
            self.status(TaskStatus.complete.label);
        };
    };
    return ctor;
});
```