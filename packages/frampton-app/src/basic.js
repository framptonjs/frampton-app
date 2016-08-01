import prepend from 'frampton-list/prepend';
import first from 'frampton-list/first';
import second from 'frampton-list/second';
import execute from 'frampton-data/task/execute';
import createSignal from 'frampton-signal/create';
import { mergeMany } from 'frampton-signal/create';
import scene from 'frampton-app/scene';
import withValidConfig from 'frampton-app/utils/with_valid_config';

/**
 * {
 *   update : Function,
 *   view : Function,
 *   init : Function,

 * }
 */
export default withValidConfig(function basic_app(config) {

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

  // Run tasks and publish any resulting actions back into messages
  execute(tasks, messages.push);

  if (config.rootElement && config.view) {
    const schedule = scene(config.rootElement, messages);
    const html = state.map((next) => {
      return config.view(messages, next);
    });
    html.value((tree) => {
      schedule(tree);
    });
  }

  return state;
});
