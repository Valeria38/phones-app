const BASE_URL = 'https://mate-academy.github.io/phone-catalogue-static/';
// const BASE_URL = 'http://localhost:8080';
const PhoneService = {
  getAll({ query = '', orderField = '' } = {}) {
    return new Promise((resolve, reject) => {
      const url = `${BASE_URL}phones/phones.json`;
      const callbackForSendRequest = (PhonesFromServer) => {
        const filteredPhones = this._filter(PhonesFromServer, query);
        const sortedPhones = this._sortBy(filteredPhones, orderField);
        resolve(sortedPhones);
      }
      const requestPromise = this._sendRequest(url);
      requestPromise.then(callbackForSendRequest);
    });
  },
  getById(phoneId, callback) {
    const url = `${BASE_URL}/phones/${ phoneId }.json`;
    const requestPromise = this._sendRequest(url);
    requestPromise.then(callback)
    .catch(error => console.warn(error));
  },

  _sendRequest(url, callback) {
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
