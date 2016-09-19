import prepend from 'frampton-list/prepend';
import first from 'frampton-list/first';
import second from 'frampton-list/second';
import execute from 'frampton-data/task/execute';
import createSignal from 'frampton-signal/create';
import { mergeMany } from 'frampton-signal/create';
import scene from 'frampton-dom/scene';
import withViewConfig from 'frampton-app/utils/with_view_config';
import withValidConfig from 'frampton-app/utils/with_valid_config';

/**
 * {
 *   update : Function,
 *   view : Function,
 *   init : Function,
 *   inputs : []
 * }
 */
export default withValidConfig(withViewConfig, function with_view_app(config) {

  if (typeof scene !== 'function') {
    throw new Error('Frampton.App.withView requires Frampton.DOM');
  }

  function update(acc, next) {
    const model = acc[0];
    return config.update(next, model);
  }

  const messages = createSignal();
  const initialState = config.init();
  const inputs = (config.inputs || []);
  const allInputs = mergeMany(prepend(inputs, messages));
  const stateAndTasks = allInputs.fold(update, initialState);
  const state = stateAndTasks.map(first);
  const tasks = stateAndTasks.map(second);

  const schedule = scene(config.rootElement, messages.push);
  const html = state.map((next) => {
    return config.view(next);
  });

  html.value((tree) => {
    schedule(tree);
  });

  // Run tasks and publish any resulting actions back into messages
  execute(tasks, messages.push);

  return state;
});
