import prepend from 'frampton-list/prepend';
import first from 'frampton-list/first';
import second from 'frampton-list/second';
import execute from 'frampton-data/task/execute';
import createSignal from 'frampton-signal/create';
import { mergeMany } from 'frampton-signal/create';
import basicConfig from 'frampton-app/utils/basic_config';
import withValidConfig from 'frampton-app/utils/with_valid_config';

/**
 * {
 *   update : Function,
 *   init : Function,
 *   inputs : []
 * }
 */
export default withValidConfig(basicConfig, function basic_app(config) {

  function update(acc, next) {
    const model = acc[0];
    return config.update(next, model);
  }

  const messages = createSignal();
  const initialState = config.init();
  const inputs = (config.inputs || []);
  const allInputs = mergeMany(prepend(messages, inputs));
  const stateAndTasks = allInputs.fold(update, initialState);
  const state = stateAndTasks.map(first);
  const tasks = stateAndTasks.map(second);

  // Run tasks and publish any resulting actions back into messages
  execute(tasks, messages.push);

  return state;
});
