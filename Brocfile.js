var FramptonBuild = require('frampton-build');
var packages = {
  'frampton-app' : { trees: null }
};

var build = new FramptonBuild({
  name : 'frampton-app',
  packages : packages
});

module.exports = build.getDistTree();