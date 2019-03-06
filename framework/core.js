// controller
import controller from './controller';

/**
 * Core
 * Responsible for modules and core components
 */
const core = (function() {
  // holds modules
  const modules = {};
  // utils to hold references to tools such as jQuery, underscore etc
  const utils = {
    dom: jQuery
  };

  /**
   * Add a module
   * @param  {String} name      name of the module
   * @param  {Object} moduleObj module object
   */
  const addModule = (name, moduleObj) => {
    if (typeof moduleObj !== 'object') {
      throw Error('module must be an Object');
    }
    if (typeof name !== 'string') {
      throw Error('name must be a String');
    }
    modules[name] = {
      module: moduleObj,
      init: false
    };
  };

  /**
   * Start a module
   * @param  {String} name name of the module
   * @return {Boolean}      module started or not
   */
  const initModule = name => {
    if (typeof name !== 'string') {
      throw Error('name must be a String');
    }
    if (!modules[name]) {
      throw Error(`${name} module not found`);
    }
    if (modules[name].init) {
      console.log(`${name} module already started`);
      return true;
    }
    let deps = modules[name].module.dependency;
    if (deps) {
      deps =
        deps.forEach(d => {
          if (initModule(d)) {
            return {
              init: true
            };
          } else {
            console.log(`unable to start dependency module ${d}`);
            return {
              init: false
            };
          }
        }) || [];
      deps = deps.filter(item => !item.init);
      if (deps.length) {
        throw Error(`unable to start dependency module(s)`);
      }
    }
    if (typeof modules[name].module.init === 'function') {
      modules[name].module.init(controller, utils.dom);
    }
    modules[name].init = true;
    return true;
  };

  /**
   * Stop a module
   * @param  {String} name name of the module
   * @return {Boolean}      module stopped or not
   */
  const stopModule = name => {
    if (typeof name !== 'string') {
      throw Error('name must be a String');
    }
    if (!modules[name]) {
      throw Error(`${name} module not found`);
    }
    if (!modules[name].init) {
      console.log(`${name} module not running`);
      return true;
    }
    if (typeof modules[name].module.destroy === 'function') {
      modules[name].module.destroy();
    }
    modules[name].init = false;
    return true;
  };

  /**
   * Show current status of all the modules added
   * @return {Array} array of objects
   */
  const showStatus = () => {
    return Object.keys(modules).map(m => ({
      [m]: modules[m].init ? 'running' : 'stopped'
    }));
  };

  // expose public API
  return {
    addModule: addModule,
    initModule: initModule,
    stopModule: stopModule,
    showStatus: showStatus
  };
})();

export default core;
