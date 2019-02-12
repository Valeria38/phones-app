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
  }

  _initCatalog() {
    this._catalog = new PhoneCatalog({
      element: this._element.querySelector('[data-component="phone-catalog"]'),
      phones: PhoneService.getAll(),
    });

    this._catalog.subscribe('phone-selected', (phoneId) => {
      const phoneDetails = PhoneService.getById(phoneId);
      this._catalog.hide();
      this._viewer.show(phoneDetails);
    });
  }

  _initViewer() {
    this._viewer = new PhoneViewer({
      element: this._element.querySelector('[data-component="phone-viewer"]'),
    });

    this._viewer.subscribe('back', () => {
      this._viewer.hide();
      this._catalog.show();
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
