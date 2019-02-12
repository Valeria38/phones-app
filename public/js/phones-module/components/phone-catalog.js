import Component from '../../component.js';

export default class PhoneCatalog extends Component {
  constructor({ element }) {
    super({ element });
    this._phones = [];
    this._render();

    this.on('click', 'details-link', (event) => {
      const phoneElement = event.target.closest('[data-element="phone"]');
      this.emit('phone-selected', phoneElement.dataset.phoneId);
    });

    this.on('click', 'add-button', (event) => {
      const phone = event.target.closest('[data-element="phone"]');
      this.emit('phone-added', phone.dataset.phoneId);
    });
  }
  show(phones) {
    this._phones = phones;
    super.show();
    this._render();
  }

  _render() {
    this._element.innerHTML = `
      <ul class="phones">
        ${ this._phones.map(phone => `
          <li class="thumbnail" 
          data-element="phone"
          data-phone-id="${ phone.id }"
          >
            <a href="#!/phones/${ phone.id }" class="thumb">
              <img 
              data-element="details-link" 
              alt="${ phone.name }" src="${ phone.imageUrl }">
            </a>

            <div class="phones__btn-buy-wrapper">
              <a class="btn btn-success"
              data-element="add-button"
              >
                Add
              </a>
            </div>

            <a
            data-element="details-link"
            href="#!/phones/${ phone.id }">${ phone.name }</a>
            <p>${ phone.snippet }</p>
          </li>
        `).join('') }
      </ul>
    `;
  }
}
