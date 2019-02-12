export default class Component {
  constructor({ element }) {
    this._element = element;
  }

  hide() {
    this._element.hidden = true;
  }

  show() {
    this._element.hidden = false;
  }

  on(eventName, selector, callback) {
    this._element.addEventListener(eventName, (event) => {
      const delegateTarget = event.target.closest(`[data-element="${ selector }"]`);

      if (!delegateTarget || !this._element.contains(delegateTarget)) {
        return;
      }

      callback(event);
    });
  }

  subscribe(eventName, callback) {
    this._element.addEventListener(eventName, (event) => {
      callback(event.detail);
    });
  }

  emit(eventName, data) {
    const customEvent = new CustomEvent(eventName, {
      detail: data,
    });
    this._element.dispatchEvent(customEvent);
  }
}
