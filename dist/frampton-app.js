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
define('frampton-app', ['frampton/namespace', 'frampton-app/basic', 'frampton-app/with_view'], function (_namespace, _basic, _with_view) {
  'use strict';

  var _namespace2 = _interopRequireDefault(_namespace);

  var _basic2 = _interopRequireDefault(_basic);

  var _with_view2 = _interopRequireDefault(_with_view);

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
  _namespace2.default.App.VERSION = '0.0.5';
  _namespace2.default.App.basic = _basic2.default;
  _namespace2.default.App.withView = _with_view2.default;
});
define('frampton-app/basic', ['exports', 'frampton-list/prepend', 'frampton-list/first', 'frampton-list/second', 'frampton-data/task/execute', 'frampton-signal/create', 'frampton-app/utils/basic_config', 'frampton-app/utils/with_valid_config'], function (exports, _prepend, _first, _second, _execute, _create, _basic_config, _with_valid_config) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _prepend2 = _interopRequireDefault(_prepend);

  var _first2 = _interopRequireDefault(_first);

  var _second2 = _interopRequireDefault(_second);

  var _execute2 = _interopRequireDefault(_execute);

  var _create2 = _interopRequireDefault(_create);

  var _basic_config2 = _interopRequireDefault(_basic_config);

  var _with_valid_config2 = _interopRequireDefault(_with_valid_config);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = (0, _with_valid_config2.default)(_basic_config2.default, function basic_app(config) {

    function update(acc, next) {
      var model = acc[0];
      return config.update(next, model);
    }

    var messages = (0, _create2.default)();
    var initialState = config.init();
    var inputs = config.inputs || [];
    var allInputs = (0, _create.mergeMany)((0, _prepend2.default)(inputs, messages));
    var stateAndTasks = allInputs.fold(update, initialState);
    var state = stateAndTasks.map(_first2.default);
    var tasks = stateAndTasks.map(_second2.default);

    // Run tasks and publish any resulting actions back into messages
    (0, _execute2.default)(tasks, messages.push);

    return state;
  });
});
define("frampton-app/utils/array_equal", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = array_equal;
  function array_equal(xs, ys) {
    var xsLen = xs.length;
    var ysLen = ys.length;

    if (xsLen !== ysLen) {
      return false;
    } else {
      for (var i = 0; i < xsLen; i++) {
        if (xs[i] !== ys[i]) {
          return false;
        }
      }
    }

    return true;
  }
});
define('frampton-app/utils/basic_config', ['exports', 'frampton-utils/is_function', 'frampton-utils/is_array'], function (exports, _is_function, _is_array) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _is_function2 = _interopRequireDefault(_is_function);

  var _is_array2 = _interopRequireDefault(_is_array);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = {
    init: _is_function2.default,
    update: _is_function2.default,
    inputs: _is_array2.default
  };
});
define("frampton-app/utils/is_valid_config", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = is_valid_config;
  /**
   * @name isValidConfig
   * @method
   * @private
   * @memberof Frampton.App.Utils
   * @param {Object} rules A hash of functions to validate config
   * @param {Object} config The config to validate
   * @returns {Boolean} Is the config valid
   */
  function is_valid_config(rules, config) {
    for (var key in rules) {
      var validator = rules[key];
      var next = config[key];
      if (!next) {
        return false;
      } else if (!validator(next)) {
        return false;
      }
    }

    return true;
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

  /**
   * @name withValidConfig
   * @method
   * @private
   * @memberof Frampton.App.Utils
   * @param {Object} rules An object containing validator functions
   * @param {Function} fn The function to gate
   * @returns {Function} A function that will only be called if rules are met
   */
  function with_valid_config(rules, fn) {
    return function (config) {
      if ((0, _is_valid_config2.default)(rules, config)) {
        return fn(config);
      } else {
        throw new Error('App config is invalid');
      }
    };
  }
});
define('frampton-app/utils/with_view_config', ['exports', 'frampton-utils/is_function', 'frampton-utils/is_array', 'frampton-utils/is_node'], function (exports, _is_function, _is_array, _is_node) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _is_function2 = _interopRequireDefault(_is_function);

  var _is_array2 = _interopRequireDefault(_is_array);

  var _is_node2 = _interopRequireDefault(_is_node);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = {
    init: _is_function2.default,
    update: _is_function2.default,
    view: _is_function2.default,
    inputs: _is_array2.default,
    rootElement: _is_node2.default
  };
});
define('frampton-app/with_view', ['exports', 'frampton-list/prepend', 'frampton-list/first', 'frampton-list/second', 'frampton-data/task/execute', 'frampton-signal/create', 'frampton-dom/scene', 'frampton-app/utils/with_view_config', 'frampton-app/utils/with_valid_config'], function (exports, _prepend, _first, _second, _execute, _create, _scene, _with_view_config, _with_valid_config) {
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

  var _with_view_config2 = _interopRequireDefault(_with_view_config);

  var _with_valid_config2 = _interopRequireDefault(_with_valid_config);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = (0, _with_valid_config2.default)(_with_view_config2.default, function with_view_app(config) {

    function update(acc, next) {
      var model = acc[0];
      return config.update(next, model);
    }

    var messages = (0, _create2.default)();
    var initialState = config.init();
    var inputs = config.inputs || [];
    var allInputs = (0, _create.mergeMany)((0, _prepend2.default)(inputs, messages));
    var stateAndTasks = allInputs.fold(update, initialState);
    var state = stateAndTasks.map(_first2.default);
    var tasks = stateAndTasks.map(_second2.default);

    var schedule = (0, _scene2.default)(config.rootElement);
    var html = state.map(function (next) {
      return config.view(messages.push, next);
    });

    html.value(function (tree) {
      schedule(tree);
    });

    // Run tasks and publish any resulting actions back into messages
    (0, _execute2.default)(tasks, messages.push);

    return state;
  });
});
require("frampton-app");
})();
