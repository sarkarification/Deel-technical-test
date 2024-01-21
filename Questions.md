# Part 2: Questions from Deel

## What is the difference between Component and PureComponent? Give an example where it might break my app.

In the case of "PureComponents" and "components", they both are used to create components, but have a basic difference, they both implement / handle updates differently.

Components implement shouldComponentUpdate with its default behaviour, where it re-renders everytime the state gets updated. This might affect performance of the app and we might need to do the optimisation manually.

PureComponents implements shouldComponentUpdate with some modified behaviours like it cheks the state before re-rendering. This helps in unnecessary re renders. The drawback of PureComponents is that it might not check the state properly, i.e, it does shallow comparison. I have provided an example below.

```
For Example:
//state definition
state = {
    user: { name: 'John', age: 25 },
  };

// Modifying the user object in a way that doesn't change its reference
const newUser = this.state.user;
newUser.age = 26;

// This will not trigger a re-render of MyPureComponent
this.setState({ user: newUser });
```

The shallow comparison will not let the componrnt to be re-rendered. It is better to use a component and then write the function manually to avoid issues. Fortunately we are done with class components and have moved on to class-less components.

## Context + ShouldComponentUpdate might be dangerous. Why is that?

When the context value changes, all components that are consuming that context will rerender, regardless of the shouldComponentUpdate or PureComponent optimizations. This is because context changes act like global state changes. If a component uses shouldComponentUpdate to optimize rendering by preventing unnecessary rerenders, changes to the context could bypass this optimization and lead to performance issues. 

## Describe 3 ways to pass information from a component to its PARENT.

We can achieve this in multiple ways, the usage of these ways depend on the use case and application architecture. Each approach has its strengths and may be more suitable for specific scenarios.

1. **using useState**:

   This is by using the state setting callback function into the child component. Useful when any child action or value affects the re-render of the parent component.

2. **using callback functions**:

   Javascript enables us to pass functions inside functions so we can create a function in the parent component and call the function with arguments in the child component.

3. **using Context API**:

   We could use context api where we can use the useContext hook to share states throught the app. The scope of the context can be defined by the user. The parent component can define a context, and the child component can consume and update the context.

4. **using Redux**:

   In larger applications, we can use Redux to share states in the app. This approqach requires a lot of boilerplate code. It's potential can be truly achieved in a large application.

## Give 2 ways to prevent components from re-rendering.

In functional components, we can use **React.useMemo**, **React.useCallback** and for class components we can use **PureComponent**.

**React.useMemo** is a HOC which memoizes the result of a functional component where it compares the old and the new props/state and then re-renders depending on the change. It is worthy to note that the comparison happens only on a shallow level and not at deep level.

**PureComponent** is used by extending class component and depends on the usage of **shouldComponentUpdate**. Just like **React.useMemo**, it checks the past and the presenrt state and re-renders if anything changes. This approach also checks on a shallow level.

**React.useCallback** this is also and HOC and a close relative of **React.useMemo**. **React.useCallback** serves the same purpose as **React.useMemo**, but it's built specifically for functions. We hand it a function directly, and it memoizes that function, threading it between renders.

## What is a fragment and why do we need it? Give an example where it might break my app.

React fragments are used as a wrapper to html in place of a div. It serves as a cleaner alternative to using unnecessary divs in our code. These fragments do not produce any extra elements in the DOM, which means that a fragment’s child components will render without any wrapping DOM node.

React fragments enable us to group multiple sibling components without introducing any unnecessary markup in the rendered HTML.

While fragments are generally beneficial, there might be scenarios where their usage could lead to unexpected behavior or issues. One such example involves using fragments inside certain parent components that rely on specific child structures.

## Give 3 examples of the HOC pattern.

There are multiple examples of HOC patterns and can be created for anything. Some of the most used ones are:

1.  Styling:

    Instead of creating a style object locally each time, we can simply create a HOC that adds the style objects to the component that we pass to it.

2. Loading: 

    This can be done by creating a function which calls the api and as it takes some time to load, it returns some loading component and once loading is complete, it returns the actual component with the result.

3. Authorisation:

    This is basically a function which can be used to check if the user is authorised to view the content. The function can have a check inside and return the components conditionally, depending on the auth status.


## What's the difference in handling exceptions in promises, callbacks and async…await?

The most significant differences in handling exceptions are:

1. **Promises** that use a .then(()=>{}) syntax can have a .catch(()=>{}) block which catches any error thrown manually in the then blocks or generated by a rejected promise. We can handle teh error however we see fit in the catch block.

2. **Callbacks**: In callback-style asynchronous code, errors are conventionally passed as the first argument to the callback function. You need to check for errors manually in the callback.

3. **Async/Await**: With async/await, error handling is done using try and catch blocks. The await expression is used inside a try block, and if any error occurs during the awaited operation, the control flow jumps to the catch block.


## How many arguments does setState take and why is it async.

**setState** is used to update the state of a component.

Two overloads of the function are:

1. **setState(updater, [callback])** - updater is a function that takes the previouState as arg and returns the new state or null. Callback is an optional arg which is a function, if passed, it will get executed after state updation.

2. **setState(newState, [callback])** - newState is an object that represents the new state. Callback is an optional arg which is a function, if passed, it will get executed after state updation.

The setState function is asynchronous in React, and the state updates do not happen immediately after calling setState. React batches state updates for performance reasons. When you call setState, React schedules an update and continues with its current execution flow without waiting for the state to be updated.

Just to note, the setState function is not a promise, it will definitely be fullfilled.

## List the steps needed to migrate a Class to Function Component.

Steps:

1. Convert the Class Declaration.
2. Remove Render functions
3. Remove Lifecycle Methods
4. Update Event Handlers
5. Check for Stateful Logic
6. Move to hooks


## List a few ways styles can be used with components.

Approaches:

1. Inline styles
2. CSS Modules
3. Use a library like styled-components to write styles directly within your JavaScript code using tagged template literals.
4. Css libraries
5. Import css files
6. Sass or Less
7. Utility-First CSS Frameworks like Tailwind

## How to render an HTML string coming from the server.

We can use **dangerouslySetInnerHTML** to show HTML coming from a server. However this can add risks to an app as it can make it vulnerable to cross-site scripting attacks or XSS attacks. 