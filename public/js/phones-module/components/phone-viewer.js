import Component from '../../component';


export default class PhoneViewer extends Component {
  constructor({ element }) {
    super({ element });

    this.on('click', 'back-button', () => {
      this.emit('back');
    });

    this.on('click', 'small-image', (event) => {
      const smallImage = event.target;
      const largeImage = this._element.querySelector('[data-element="large-image"]');
      largeImage.src = smallImage.src;
    });

    this.on('click', 'add-button', () => {
      this.emit('add', this._phoneDetails.id);
    });
  }

  show(phoneDetails) {
    super.show();
    this._phoneDetails = phoneDetails;
    this._render();
  }

  _render() {
    const phone = this._phoneDetails;
    this._element.innerHTML = `
      <img class="phone" 
      data-element="large-image"
      src="${ phone.images[0] }">

      <button
      data-element="back-button"
      >Back</button>
      <button
      data-element="add-button"
      >Add to basket</button>

      <h1>${ phone.name }</h1>

      <p>${ phone.description }</p>

      <ul class="phone-thumbs">
        ${ phone.images.map(image => `
          <li>
            <img 
            data-element="small-image"
            src="${ image }">
          </li>
        `).join('') }
      </ul>
    `;
  }
}
