import Component from '../../component.js';

export default class PhoneCatalog extends Component{
  constructor({ element, phones = [], onPhoneSelected = () => {}}) {
    super({ element });
    this._phones = phones;
    this._onPhoneSelected = onPhoneSelected;
    this._render();

    this._element.addEventListener('click', (event) => {
      const detailsLink = event.target.closest('[data-element="details-link"]');

      if (!detailsLink) {
        return;
      }
      const phoneElement = event.target.closest('[data-element="phone"]');
      this._onPhoneSelected(phoneElement.dataset.phoneId);
    });
  }

  _render() {
    this._element.innerHTML = `
      <ul class="phones">
        ${this._phones.map((phone) => `
          <li class="thumbnail" 
          data-element="phone"
          data-phone-id="${phone.id}"
          >
            <a href="#!/phones/${phone.id}" class="thumb">
              <img 
              data-element="details-link" 
              alt="${phone.name}" src="${phone.imageUrl}">
            </a>

            <div class="phones__btn-buy-wrapper">
              <a class="btn btn-success">
                Add
              </a>
            </div>

            <a
            data-element="details-link"
            href="#!/phones/${phone.id}">${phone.name}</a>
            <p>${phone.snippet}</p>
          </li>
        `).join('')}
      </ul>
    `;
  }
}