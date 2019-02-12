import Component from '../../component.js';

export default class ShoppingCart extends Component {
  constructor({ element }) {
    super({ element });

    this._itemsMap = {};
    this._render();
  }

  add(item) {
    if (!this._itemsMap.hasOwnProperty(item)) {
      this._itemsMap[item] = 0;
    }
    this._itemsMap[item]++;
    this._render();
  }

  remove(item) {
    if (!this._itemsMap.hasOwnProperty(item)) {
      return;
    }
    this._itemsMap[item]--
    
    if (this._itemsMap[item] === 0) {
      delete this._itemsMap[item];
    };
    this._render();
  }

  _render() {
    this._element.innerHTML = `
      <p>Shopping Cart</p>
      <ul>
        ${ Object.entries(this._itemsMap).map(([phoneId, amount]) => `
          <li>${phoneId} (${amount})</li>
        `).join('') }
      </ul>
    `;
  }
}
