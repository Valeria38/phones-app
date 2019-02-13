const PhoneService = {
  getAll({ query = '', orderField = ''} = {}, callback) {
    const url = 'https://mate-academy.github.io/phone-catalogue-static/phones/phones.json';
    this._sendRequest(url, (PhonesFromServer) => {
        const filteredPhones = this._filter(PhonesFromServer, query);
        const sortedPhones = this._sortBy(filteredPhones, orderField);
        callback(sortedPhones);
    });
    
},

  getById(phoneId, callback) {
    const url = `https://mate-academy.github.io/phone-catalogue-static/phones/${phoneId}.json`;
    this._sendRequest(url, callback);
  },

  _sendRequest(url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open(
        'GET', 
        url, 
        true
        );
    xhr.send();

    xhr.onload = function() {
        if (xhr.status !== 200) {
            console.warn(`${ xhr.status } ${ xhr.statusText }`);
            return {};
        }
        const data = JSON.parse(xhr.responseText);
        callback(data);
    };
    
  },

  _filter(phones, query) {
    return phones.filter((phone) => {
        return phone.name.toLowerCase().includes(query.toLowerCase());
    });
  },

  _sortBy(phones, orderField) {
    const compareByName = (a, b) => {
        return a['name'].localeCompare(b['name']);
    };
    const compareByAge = (a, b) => {
        return a['age'] > b['age'];
    }
    if (orderField === 'name') {
        return phones.sort(compareByName);
    } else if (orderField === 'age') {
        return phones.sort(compareByAge);
    }
  }
};

export default PhoneService;