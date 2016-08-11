import createApp from 'frampton-app/basic';
import createSignal from 'frampton-signal/create';
import Never from 'frampton-data/task/never';

QUnit.module('Frampton.App.basic');

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

  const model = createApp({
    init : init,
    update : update,
    inputs : [inputs]
  });

  model.next((current) => {
    const actual = current.count;
    const expected = 1;
    assert.equal(actual, expected);
    done();
  });

  inputs.push('first');
});
