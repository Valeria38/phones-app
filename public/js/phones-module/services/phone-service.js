const BASE_URL = 'https://mate-academy.github.io/phone-catalogue-static/';
// const BASE_URL = 'http://localhost:8080';
const PhoneService = {
  async getAll({ query = '', orderField = '' } = {}) {
    const url = `${BASE_URL}phones/phones.json`;
    const PhonesFromServer = await this._sendRequest(url);
    const filteredPhones = this._filter(PhonesFromServer, query);
    const sortedPhones = this._sortBy(filteredPhones, orderField);
    return sortedPhones;
  },
  getById(phoneId) {
    const url = `${BASE_URL}/phones/${ phoneId }.json`;
    return this._sendRequest(url);
  },

  _sendRequest(url) {
    return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.send();
    xhr.onload = (() => {
      if (xhr.status !== 200) {
        reject(`${ xhr.status } ${ xhr.statusText }`);
        return;
      }
      const data = JSON.parse(xhr.responseText);
      resolve(data);
    });
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
