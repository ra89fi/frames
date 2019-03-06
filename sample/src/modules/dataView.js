// store
import store from './store';

/**
 * Handle data view
 */
const dataView = (function() {
  let ct, ut;
  let linkData, dataEl, type;
  const urlPrefix = 'https://swapi.co/api/';

  /**
   * Module init function
   * @param  {Object} controller interface to use events
   * @param  {Object} domUtil    dom helper
   */
  const init = (controller, domUtil) => {
    console.log('dataView init');
    ct = controller;
    ut = domUtil;
    dataEl = ut('.item-data');
    ct.sub('select', getDataFromStore);
  };

  /**
   * Get data from store
   * @param  {String} tp item type
   */
  const getDataFromStore = async tp => {
    dataEl.html('Loading...');
    type = tp;
    linkData = await store.get(urlPrefix + type);
    if (linkData) {
      createDataView();
    }
  };

  /**
   * Create data view
   */
  const createDataView = () => {
    const count = linkData.count;
    const rows = linkData.results;
    let html = `<h4>${formatType(type)}</h4>`;
    html += '<ul>';
    html += rows.map(row => `<li>${row.name || row.title}</li>`).join('');
    html += '</ul>';
    dataEl.html(html);
  };

  /**
   * Format item name
   * @param  {String} item name
   * @return {String}      formatted name
   */
  const formatType = item => item[0].toUpperCase() + item.substr(1);

  // expose public API
  return {
    init: init
  };
})();

export default dataView;
