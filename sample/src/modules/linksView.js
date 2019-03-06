// store
import store from './store';

/**
 * Create links
 */
const linksView = (function() {
  let ct, ut;
  let linkItems, linksEl;
  const url = 'https://swapi.co/api/';

  /**
   * Module init function
   * @param  {Object} controller interface to use events
   * @param  {Object} domUtil    dom helper
   */
  const init = (controller, domUtil) => {
    console.log('linksView init');
    ct = controller;
    ut = domUtil;
    linksEl = ut('.item-links');
    getLinkItemsFromStore();
  };

  /**
   * Get link items from store
   */
  const getLinkItemsFromStore = async () => {
    linkItems = await store.get(url);
    if (linkItems) {
      createLinks();
    }
  };

  /**
   * Create links
   */
  const createLinks = () => {
    let html = Object.keys(linkItems)
      .map(item => `<li>${formatLinkItem(item)}</li>`)
      .join('');
    linksEl.html(html);
    addListeners();
  };

  /**
   * Format link items
   * @param  {String} item input string in lowercase
   * @return {String}      formatted string
   */
  const formatLinkItem = item => item[0].toUpperCase() + item.substr(1);

  /**
   * Add listeners to link items
   */
  const addListeners = () => {
    const links = Array.prototype.slice.call(linksEl.children());
    links.forEach(link => ut(link).on('click', handleLinkClick));
  };

  /**
   * Click handler
   * @param  {Object} e event object
   */
  const handleLinkClick = e => {
    e.preventDefault();
    ct.pub('select', e.target.innerText.toLowerCase());
  };

  // expose public API
  return {
    init: init
  };
})();

export default linksView;
