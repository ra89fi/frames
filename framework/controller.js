/**
 * Controller
 * Responsible for events
 */
const controller = (function() {
  // holds one time events
  const oneTimers = {};
  // holds all other events
  const events = {};

  /**
   * Subscribe to an event
   * @param  {String} name    type of event
   * @param  {Function} handler function to handle the event
   */
  const sub = (name, handler) => {
    events[name] = events[name] || [];
    if (events[name].indexOf(handler) === -1) {
      events[name].push(handler);
    }
  };

  /**
   * Subscribe to an event but will call handler only once
   * @param  {String} name    type of event
   * @param  {Function} handler function to handle the event
   */
  const once = (name, handler) => {
    oneTimers[name] = oneTimers[name] || [];
    if (oneTimers[name].indexOf(handler) === -1) {
      oneTimers[name].push(handler);
    }
  };

  /**
   * Unsubscribe from an event
   * @param  {String} name    type of event
   * @param  {Function} handler function to handle the event
   */
  const unsub = (name, handler) => {
    const idx = events[name].indexOf(handler);
    if (idx !== -1) {
      events[name].splice(idx, 1);
    }
  };

  /**
   * Publish an event
   * @param  {String} name type of event
   * @param  {Any} data pass extra data to handler function
   */
  const pub = (name, data) => {
    events[name] && events[name].forEach(fn => fn(data));
    while (oneTimers[name] && oneTimers[name].length) {
      const fn = oneTimers[name].shift();
      fn(data);
    }
  };

  // expose public API
  return {
    sub: sub,
    once: once,
    unsub: unsub,
    pub: pub
  };
})();

export default controller;

// TODO:
// unsubscribe one time events
