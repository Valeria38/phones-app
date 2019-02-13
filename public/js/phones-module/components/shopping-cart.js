import Component from '../../component';

export default class ShoppingCart extends Component {
  constructor({ element }) {
    super({ element });

    this._itemsMap = {};
    this.on('click', 'increase', (event) => {
      const phone = event.target.closest('[data-element="item"]');
      this.add(phone.dataset.itemId);
    });
    this.on('click', 'decrease', (event) => {
      const phone = event.target.closest('[data-element="item"]');
      this.remove(phone.dataset.itemId);
    });
    this._render();
  }

  add(item) {
    if (!(item in this._itemsMap)) {
      this._itemsMap[item] = 0;
    }
    this._itemsMap[item]++;
    this._render();
  }

  remove(item) {
    if (!(item in this._itemsMap)) {
      return;
    }
    this._itemsMap[item]--;
    if (this._itemsMap[item] === 0) {
      delete this._itemsMap[item];
    }
    this._render();
  }

  _render() {
    const items = Object.entries(this._itemsMap);

    this._element.innerHTML = `
      <h4>Shopping Cart</h4>
      <ul>
        ${ items.length > 0 ? `
          ${ items.map(([phoneId, amount]) => `
            <li
            data-element="item"
            data-item-id="${ phoneId }"
            >${ phoneId } (${ amount })
            <button data-element="decrease"> - </button>
            <button data-element="increase"> + </button>
            </li>
          `).join('') }
        ` : `
          <p>No phones selected.</p>
        ` }
        
      </ul>
    `;
  }
}
