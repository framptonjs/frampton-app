import createApp from 'frampton-app/basic';
import createSignal from 'frampton-signal/create';
import Never from 'frampton-data/task/never';
import { div, text } from 'frampton-dom/html/dom';

QUnit.module('Frampton.App.basic', {
  beforeEach() {
    this.fixture = document.getElementById('qunit-fixture');
    this.rootElement = document.createElement('div');
    this.fixture.appendChild(this.rootElement);
  },
  afterEach() {
    this.fixture.innerHTML = '';
    this.rootElement = null;
    this.fixture = null;
  }
});

QUnit.test('Should create a functioning app', function(assert) {

  const done = assert.async();
  const inputs = createSignal();
  var count = 0;

  function init() {
    return [{ count : 0 }, Never()];
  }

  function update(msg, state) {
    assert.equal(msg, 'first', 'Message incorrect');
    assert.equal(state.count, 0, 'Initial state incorrect');

    switch(msg) {
      case 'first':
        count ++;
        const newState = { count : (state.count + 1) };
        return [newState, Never()];

      default:
        return [state, Never()];
    }
  }

  function view(messages, state) {

    assert.equal(state.count, count);
    if (state.count === 1) { done(); }

    const clickHandler = (evt) => {
      messages('click happened');
    };

    return div( { onClick : clickHandler }, [
      text('click me')
    ]);
  }

  createApp({
    init : init,
    update : update,
    view : view,
    inputs : [inputs],
    rootElement : this.rootElement
  });

  inputs.push('first');
});
