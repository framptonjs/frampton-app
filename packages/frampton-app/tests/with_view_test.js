import createApp from 'frampton-app/with_view';
import createSignal from 'frampton-signal/create';
import Never from 'frampton-data/task/never';
import { div, text } from 'frampton-dom/html/dom';

QUnit.module('Frampton.App.withView', {
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

const clickHandler = (evt) => {
  return 'click happened';
};

const initState = (count) => ({
  count : count
});

QUnit.test('Should create a functioning app', function(assert) {
  assert.expect(4);
  const done = assert.async();
  const inputs = createSignal();
  var count = 0;

  function init() {
    return [initState(0), Never()];
  }

  function update(msg, state) {
    assert.equal(msg, 'first', 'Message incorrect');
    assert.equal(state.count, 0, 'Initial state incorrect');

    switch(msg) {
      case 'first':
        count ++;
        const newState = initState(state.count + 1);
        return [newState, Never()];

      default:
        return [state, Never()];
    }
  }

  function view(state) {
    assert.equal(state.count, count);
    if (state.count > 0) { done(); }

    return div({ onClick : clickHandler }, [
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
