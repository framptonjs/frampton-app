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
define('frampton-app', ['frampton/namespace', 'frampton-app/app', 'frampton-app/scene'], function (_namespace, _app, _scene) {
  'use strict';

  var _namespace2 = _interopRequireDefault(_namespace);

  var _app2 = _interopRequireDefault(_app);

  var _scene2 = _interopRequireDefault(_scene);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * @name App
   * @namespace
   * @memberof Frampton
   */
  _namespace2.default.App = {};
  _namespace2.default.App.VERSION = '0.0.3';
  _namespace2.default.App.app = _app2.default;
  _namespace2.default.App.scene = _scene2.default;
});
define('frampton-app/app', ['exports', 'frampton-list/prepend', 'frampton-list/first', 'frampton-list/second', 'frampton-data/task/execute', 'frampton-signal/create', 'frampton-app/scene', 'frampton-app/utils/with_valid_config'], function (exports, _prepend, _first, _second, _execute, _create, _scene, _with_valid_config) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _prepend2 = _interopRequireDefault(_prepend);

  var _first2 = _interopRequireDefault(_first);

  var _second2 = _interopRequireDefault(_second);

  var _execute2 = _interopRequireDefault(_execute);

  var _create2 = _interopRequireDefault(_create);

  var _scene2 = _interopRequireDefault(_scene);

  var _with_valid_config2 = _interopRequireDefault(_with_valid_config);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = (0, _with_valid_config2.default)(function app(config) {

    function update(acc, next) {
      var model = acc[0];
      return config.update(next, model);
    }

    var messages = (0, _create2.default)();
    var initialState = config.init();
    var inputs = (0, _create.mergeMany)((0, _prepend2.default)(config.inputs, messages));
    var stateAndTasks = inputs.fold(update, initialState);
    var state = stateAndTasks.map(_first2.default);
    var tasks = stateAndTasks.map(_second2.default);

    // Run tasks and publish any resulting actions back into messages
    (0, _execute2.default)(tasks, messages);

    if (config.rootElement && config.view) {
      (function () {
        var schedule = (0, _scene2.default)(config.rootElement, messages);
        var html = state.map(config.view);
        html.value(function (tree) {
          schedule(tree);
        });
      })();
    }

    return state;
  });
});
define('frampton-app/scene', ['exports', 'frampton-app/utils/request_frame', 'frampton-dom/update'], function (exports, _request_frame, _update) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = scene;

  var _request_frame2 = _interopRequireDefault(_request_frame);

  var _update2 = _interopRequireDefault(_update);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

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
      (0, _update2.default)(rootNode, savedDOM, scheduledDOM, messages);
      savedDOM = scheduledDOM;
      state = STATES.NOTHING;
    }

    return function scheduler(dom) {
      scheduledDOM = dom;

      switch (state) {

        case STATES.NOTHING:
          (0, _request_frame2.default)(draw);
          state = STATES.PENDING;
          break;

        default:
          state = STATES.PENDING;
          break;
      }
    };
  }
});
define('frampton-app/utils/is_valid_config', ['exports', 'frampton-utils/is_function'], function (exports, _is_function) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = is_valid_config;

  var _is_function2 = _interopRequireDefault(_is_function);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function is_valid_config(config) {
    if (!(0, _is_function2.default)(config.init)) {
      return false;
    } else if (!(0, _is_function2.default)(config.update)) {
      return false;
    } else if (!(0, _is_function2.default)(config.view)) {
      return false;
    } else {
      return true;
    }
  }
});
define('frampton-app/utils/request_frame', ['exports', 'frampton-utils/is_function'], function (exports, _is_function) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (callback) {
    if ((0, _is_function2.default)(window.requestAnimationFrame)) {
      window.requestAnimationFrame(callback);
    } else {
      setTimeout(callback, 1000 / 60);
    }
  };

  var _is_function2 = _interopRequireDefault(_is_function);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
});
define('frampton-app/utils/with_valid_config', ['exports', 'frampton-app/utils/is_valid_config'], function (exports, _is_valid_config) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = with_valid_config;

  var _is_valid_config2 = _interopRequireDefault(_is_valid_config);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function with_valid_config(fn) {
    return function (config) {
      if ((0, _is_valid_config2.default)(config)) {
        return fn(config);
      } else {
        throw new Error('App config is invalid');
      }
    };
  }
});
require("frampton-app");
})();
