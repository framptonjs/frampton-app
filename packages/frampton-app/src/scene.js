import requestFrame from 'frampton-app/utils/request_frame';
import update from 'frampton-dom/update';

const STATES = {
  NOTHING : 0,
  PENDING : 1
};

/**
 * Start a new VirtualDOM scene. The scene takes a root node to attach
 * to and returns a function to schedule updates. You give the scheduler
 * a new VirtualNode and it will schedule the diff and update of the
 * previous DOM.
 *
 * @name scene
 * @memberOf Frampton.DOM
 * @method
 * @param {Element}
 * @returns {Function} A function to schedule updates
 */
export default function scene(rootNode, messages) {

  var savedDOM = null;
  var scheduledDOM = null;
  var state = STATES.NOTHING;

  function draw() {
    update(rootNode, savedDOM, scheduledDOM, messages);
    savedDOM = scheduledDOM;
    state = STATES.NOTHING;
  }

  return function scheduler(dom) {
    scheduledDOM = dom;

    switch (state) {

      case STATES.NOTHING:
        requestFrame(draw);
        state = STATES.PENDING;
        break;

      default:
        state = STATES.PENDING;
        break;
    }
  };
}