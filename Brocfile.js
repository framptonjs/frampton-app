const FramptonBuild = require('frampton-build');
const packages = {
  'frampton-app' : { trees: null }
};

const build = new FramptonBuild({
  name : 'frampton-app',
  packages : packages
});

module.exports = build.getDistTree();
