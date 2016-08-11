# Frampton-App

A module for wiring an application with frampton.js

This is essentially a pure JavaScript implementation of Elm's StartApp.

[The Elm Architecture](http://guide.elm-lang.org/architecture/index.html)


## Install

```
npm install --save frampton
npm install --save frampton-dom
npm install --save frampton-app
```

## Include

```
<script src="./node_modules/frampton/dist/frampton.js"></script>
<script src="./node_modules/frampton-dom/dist/frampton-dom.js"></script>
<script src="./node_modules/frampton-app/dist/frampton-app.js"></script>
```

## BasicApp

A basic app updates a state based on a list of inputs

```
const BasicApp = Frampton.App.basic;
const Never = Frampton.Data.Task.never;
const Signal = Frampton.Signal.create;

const inputs = Signal();

// Get the initial app state and initial tasks to run
function init() {
  const initialState = { name : 'Larry' };
  const initialTask = Never();
  return [initialState, initialTask];
}

// Update state based on messages
function update(msg, state) {
  switch(msg) {
    case 'input happened':
      const newState = { name : 'Bob' };
      return [newState, Never()];

    default:
      return [state, Never()];
  }
}

// Create app
// Inputs is an array of Signal objects used to introduce events to the system.
const app = BasicApp({
  init : init,
  update : update,
  inputs : [inputs]
});

// The return value is a Signal of the current app state
app.value((currentState) => {
  console.log('The current app state: ', currentState);
});

inputs.push('input happened');

```

## WithViewApp

An app with a view take two additional parameters, a function to render a view and a DOM node to attach the view to.

```
const WithViewApp = Frampton.App.withView;
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
const app = WithViewApp({
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
