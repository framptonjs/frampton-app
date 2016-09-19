/*globals Frampton:true */
var define, require;
var global = this;

(function() {

  if (typeof Frampton === 'undefined') {
    throw new Error('Frampton is undefined');
  }

  define = Frampton.__loader.define;
  require = Frampton.__loader.require;

  if (typeof Frampton.DOM === 'undefined') {
    Frampton.__loader.registry['frampton-dom/scene'] = {
      deps : [],
      callback : function() {}
    };
  }

}());
