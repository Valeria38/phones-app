import PhoneCatalog from './components/phone-catalog.js';
import PhoneViewer from './components/phone-viewer.js';
import PhoneService from './services/phone-service.js';
import Filter from './components/filter.js';
import ShoppingCart from './components/shopping-cart.js';

export default class PhonesPage {
  constructor({ element }) {
    this._element = element;
    this._render();
    this._initFilter();
    this._initCatalog();
    this._initViewer();
    this._initShoppingCart();
    this._showFilteredPhones();
  }

  _initShoppingCart() {
    this._cart = new ShoppingCart({
      element: this._element.querySelector('[data-component="shopping-cart"]'),
    });
  }

  _initFilter() {
    this._filter = new Filter({
      element: this._element.querySelector('[data-component="filter"]'),
    });
    this._filter.subscribe('order-changed', () => {
      this._showFilteredPhones();
    });
    this._filter.subscribe('query-changed', () => {
      this._showFilteredPhones();
    });
  }

  async _showFilteredPhones() {
    const currentFiltering = this._filter.getCurrentData();
    const phones = await PhoneService.getAll(currentFiltering);
    this._catalog.show(phones);
    this._viewer.hide();
  }

  _initCatalog() {
    this._catalog = new PhoneCatalog({
      element: this._element.querySelector('[data-component="phone-catalog"]'),
    });
    this._catalog.subscribe('phone-selected', async (phoneId) => {
      const phoneDetails = await PhoneService.getById(phoneId);
      this._catalog.hide();
      this._viewer.show(phoneDetails);
    });

    this._catalog.subscribe('phone-added', (phoneId) => {
      this._cart.add(phoneId);
    });
  }

  _initViewer() {
    this._viewer = new PhoneViewer({
      element: this._element.querySelector('[data-component="phone-viewer"]'),
    });

    this._viewer.subscribe('back', () => {
      this._viewer.hide();
      this._showFilteredPhones();
    });

    this._viewer.subscribe('add', (phoneId) => {
      this._cart.add(phoneId);
    });
  }

  _render() {
    this._element.innerHTML = `
        <div class="row">

        <!--Sidebar-->
        <div class="col-md-2">
          <section>
            <div data-component="filter"></div>
          </section>

          <section>
            <div data-component="shopping-cart"></div>
          </section>
        </div>

        <!--Main content-->
        <div class="col-md-10">
          <div data-component="phone-catalog"></div>
          <div data-component="phone-viewer" hidden></div>
          
        </div>
      </div>
    `;
  }
}
