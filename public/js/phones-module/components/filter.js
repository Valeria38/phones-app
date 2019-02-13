import Component from '../../component';
/* global _:true */
const { debounce } = _.debounce;
const QUERY_CHANGE_DELAY = 500;

export default class Filter extends Component {
  constructor({ element }) {
    super({ element });
    this._render();
    this._queryField = this._element.querySelector('[data-element="query"]');
    this._orderField = this._element.querySelector('[data-element="order"]');
    // console.log(this._orderField.value)
    this.on('change', 'order', () => {
      this.emit('order-changed');
    });
    this.on('input', 'query', debounce(() => {
      this.emit('query-changed');
    }, QUERY_CHANGE_DELAY));
  }

  getCurrentData() {
    return {
      query: this._queryField.value,
      orderField: this._orderField.value,
    };
  }

  _render() {
    this._element.innerHTML = `
      <p>
      Search:
      <input data-element="query">
      </p>

      <p>
        Sort by:
        <select data-element="order">
          <option value="name">Alphabetical</option>
          <option value="age">Newest</option>
        </select>
      </p>
    `;
  }
}
