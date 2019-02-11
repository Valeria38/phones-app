
export default class PhoneViewer {
  constructor({ element }) {
    this._element = element;
   
    // this._element.addEventListener('click', (event) => {
    //   const delegateTarget = event.target.closest('[data-element=""]');
    // });
  }

  show(phoneDetails) {   
    this._element.hidden = false; 
    this._phoneDetails = phoneDetails;
    this._render();
  }

  _render() {
    const phone = this._phoneDetails;

    this._element.innerHTML = `
      <img class="phone" src="${phone.images[0]}">

      <button>Back</button>
      <button>Add to basket</button>


      <h1>${phone.name}</h1>

      <p>${phone.description}</p>

      <ul class="phone-thumbs">
        <li>
          <img src="img/phones/motorola-xoom-with-wi-fi.0.jpg">
        </li>
        <li>
          <img src="img/phones/motorola-xoom-with-wi-fi.1.jpg">
        </li>
        <li>
          <img src="img/phones/motorola-xoom-with-wi-fi.2.jpg">
        </li>
        <li>
          <img src="img/phones/motorola-xoom-with-wi-fi.3.jpg">
        </li>
        <li>
          <img src="img/phones/motorola-xoom-with-wi-fi.4.jpg">
        </li>
        <li>
          <img src="img/phones/motorola-xoom-with-wi-fi.5.jpg">
        </li>
      </ul>
    `;
  }
}