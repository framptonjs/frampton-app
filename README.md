# Frampton-App

A module for wiring an application with frampton.js

This is essentially a pure JavaScript implementation of Elm's StartApp.

[The Elm Architecture](http://guide.elm-lang.org/architecture/index.html)


## Install

```
npm install --save frampton
npm install --save frampton-app
```

## Include

```
<script src="frampton.js"></script>
<script src="frampton-app.js"></script>
```

## Usage



```
const BasicApp = Frampton.App.basic;
const Never = Frampton.Data.Task.never;
const { div, text } = Frampton.Frampton.DOM.Html;

// Get the initial app state and initial tasks to run
function init() {
  const initialState = { name : 'Larry' };
  const initialTask = Never();
  return [initialState, initialTask];
}

// Update state based on messages
function update(msg, state) {
  switch(msg) {
    case 'click happened':
      const newState = { name : 'Bob' };
      return [newState, Never()];

    default:
      return [state, Never()];
  }
}

// Render view based on state
function view(messages, state) {
  const clickHandler = (evt) => {
    messages('click happened');
  };

  return div( { onClick : clickHandler }, [
    text('click me')
  ]);
}

// Create app
const app = BasicApp({
  init : init,
  update : update,
  view : view,
  rootElement : document.getElementById('app-root')
});

// The return value is a Signal of the current app state
app.value((currentState) => {
  console.log('The current app state: ', currentState);
});

```
