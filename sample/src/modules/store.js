/**
 * Store to handle data
 */

const store = (function() {
  // store
  const store = {};

  /**
   * Cache and pass data to consumer
   * @param  {String} url url
   * @return {Object}     data
   */
  const get = async url => {
    if (!store[url]) {
      store[url] = await fetchData(url);
    }
    return store[url];
  };

  /**
   * Fetch data from URL
   * @param  {String} url url
   * @return {Promise}     promise
   */
  const fetchData = async url =>
    fetch(url)
      .then(response => response.json())
      .then(json => json)
      .catch(err => console.log(err.message));

  // expose public API
  return {
    get: get
  };
})();

export default store;
