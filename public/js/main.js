import PhonesPage from './phones-module/phones-page.js';

const currentPage = new PhonesPage({
  /* global document:true */
  element: document.querySelector('[data-page-container]'),
});
