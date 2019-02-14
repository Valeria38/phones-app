const BASE_URL = 'https://mate-academy.github.io/phone-catalogue-static/';
// const BASE_URL = 'http://localhost:8080';
const PhoneService = {
  getAll({ query = '', orderField = '' } = {}, callback) {
    const url = `${BASE_URL}phones/phones.json`;
    this._sendRequest(url, (PhonesFromServer) => {
      const filteredPhones = this._filter(PhonesFromServer, query);
      const sortedPhones = this._sortBy(filteredPhones, orderField);
      callback(sortedPhones);
    });
  },
  getById(phoneId, callback) {
    const url = `${BASE_URL}/phones/${ phoneId }.json`;
    this._sendRequest(url, callback);
  },

  _sendRequest(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.send();
    xhr.onload = (() => {
      if (xhr.status !== 200) {
        console.warn(`${ xhr.status } ${ xhr.statusText }`);
        return {};
      }
      const data = JSON.parse(xhr.responseText);
      callback(data);
    });
  },

  _filter(phones, query) {
    return phones.filter(phone => {
      return phone.name.toLowerCase().includes(query.toLowerCase());
    });
  },

  _sortBy(phones, orderField) {
    const compareByName = (a, b) => {
      return a.name.localeCompare(b.name);
    };
    const compareByAge = (a, b) => {
      return a.age > b.age;
    };
    if (orderField === 'name') {
      return phones.sort(compareByName);
    }
    if (orderField === 'age') {
      return phones.sort(compareByAge);
    }
  },
};

export default PhoneService;
