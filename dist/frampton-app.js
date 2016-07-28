(function() {
/*globals Frampton:true */
var define, require;
var global = this;

(function() {

  if (typeof Frampton === 'undefined') {
    throw new Error('Frampton is undefined');
  };

  define = Frampton.__loader.define;
  require = Frampton.__loader.require;

}());
define('frampton-app', ['exports', 'frampton/namespace', 'frampton-app/app', 'frampton-app/scene'], function (exports, _framptonNamespace, _framptonAppApp, _framptonAppScene) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _Frampton = _interopRequireDefault(_framptonNamespace);

  var _app = _interopRequireDefault(_framptonAppApp);

  var _scene = _interopRequireDefault(_framptonAppScene);

  /**
   * @name App
   * @namespace
   * @memberof Frampton
   */
  _Frampton['default'].App = {};
  _Frampton['default'].App.VERSION = '0.0.1';
  _Frampton['default'].App.app = _app['default'];
  _Frampton['default'].App.scene = _scene['default'];
});
define('frampton-app/app', ['exports', 'module', 'frampton-list/prepend', 'frampton-list/first', 'frampton-list/second', 'frampton-data/task/execute', 'frampton-signal/create', 'frampton-app/scene', 'frampton-app/utils/with_valid_config'], function (exports, module, _framptonListPrepend, _framptonListFirst, _framptonListSecond, _framptonDataTaskExecute, _framptonSignalCreate, _framptonAppScene, _framptonAppUtilsWith_valid_config) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _prepend = _interopRequireDefault(_framptonListPrepend);

  var _first = _interopRequireDefault(_framptonListFirst);

  var _second = _interopRequireDefault(_framptonListSecond);

  var _execute = _interopRequireDefault(_framptonDataTaskExecute);

  var _create = _interopRequireDefault(_framptonSignalCreate);

  var _scene = _interopRequireDefault(_framptonAppScene);

  var _withValidConfig = _interopRequireDefault(_framptonAppUtilsWith_valid_config);

  module.exports = _withValidConfig['default'](function app(config) {

    function update(acc, next) {
      var model = acc[0];
      return config.update(next, model);
    }

    var messages = _create['default']();
    var initialState = config.init();
    var inputs = _framptonSignalCreate.mergeMany(_prepend['default'](config.inputs, messages));
    var stateAndTasks = inputs.fold(update, initialState);
    var state = stateAndTasks.map(_first['default']);
    var tasks = stateAndTasks.map(_second['default']);

    // Run tasks and publish any resulting actions back into messages
    _execute['default'](tasks, messages);

    if (config.rootElement && config.view) {
      (function () {
        var schedule = _scene['default'](config.rootElement, messages);
        var html = state.map(config.view);
        html.value(function (tree) {
          schedule(tree);
        });
      })();
    }

    return state;
  });
});
define('frampton-app/scene', ['exports', 'module', 'frampton-app/utils/request_frame', 'frampton-dom/update'], function (exports, module, _framptonAppUtilsRequest_frame, _framptonDomUpdate) {
  'use strict';

  module.exports = scene;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _requestFrame = _interopRequireDefault(_framptonAppUtilsRequest_frame);

  var _update = _interopRequireDefault(_framptonDomUpdate);

  var STATES = {
    NOTHING: 0,
    PENDING: 1
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

  function scene(rootNode, messages) {

    var savedDOM = null;
    var scheduledDOM = null;
    var state = STATES.NOTHING;

    function draw() {
      _update['default'](rootNode, savedDOM, scheduledDOM, messages);
      savedDOM = scheduledDOM;
      state = STATES.NOTHING;
    }

    return function scheduler(dom) {
      scheduledDOM = dom;

      switch (state) {

        case STATES.NOTHING:
          _requestFrame['default'](draw);
          state = STATES.PENDING;
          break;

        default:
          state = STATES.PENDING;
          break;
      }
    };
  }
});
define('frampton-app/utils/is_valid_config', ['exports', 'module', 'frampton-utils/is_function'], function (exports, module, _framptonUtilsIs_function) {
  'use strict';

  module.exports = is_valid_config;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _isFunction = _interopRequireDefault(_framptonUtilsIs_function);

  function is_valid_config(config) {
    if (!_isFunction['default'](config.init)) {
      return false;
    } else if (!_isFunction['default'](config.update)) {
      return false;
    } else if (!_isFunction['default'](config.view)) {
      return false;
    } else {
      return true;
    }
  }
});
define('frampton-app/utils/request_frame', ['exports', 'module', 'frampton-utils/is_function'], function (exports, module, _framptonUtilsIs_function) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _isFunction = _interopRequireDefault(_framptonUtilsIs_function);

  module.exports = function (callback) {
    if (_isFunction['default'](window.requestAnimationFrame)) {
      window.requestAnimationFrame(callback);
    } else {
      setTimeout(callback, 1000 / 60);
    }
  };
});
define('frampton-app/utils/with_valid_config', ['exports', 'module', 'frampton-app/utils/is_valid_config'], function (exports, module, _framptonAppUtilsIs_valid_config) {
  'use strict';

  module.exports = with_valid_config;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _isValidConfig = _interopRequireDefault(_framptonAppUtilsIs_valid_config);

  function with_valid_config(fn) {
    return function (config) {
      if (_isValidConfig['default'](config)) {
        return fn(config);
      } else {
        throw new Error('App config is invalid');
      }
    };
  }
});
require("frampton-app");

})();