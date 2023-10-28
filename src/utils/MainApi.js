import { USER_TOKEN } from './constants';

class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  async _request(url, options) {
    const res = await fetch(`${this._baseUrl}/${url}`, options);
    return MainApi._checkResponse(res);
  }

  static _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  }

  async registrate({ name, password, email }) {
    return this._request('signup', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        password,
        email,
      }),
    });
  }

  async login({ password, email }) {
    return this._request('signin', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password,
        email,
      }),
    });
  }

  async checkAuth() {
    const token = localStorage.getItem(USER_TOKEN);
    if (!token) throw new Error('Отсутствует токен');

    return this._request('users/me', {
      method: 'GET',
      headers: { ...this._headers, Authorization: `Bearer ${token}` },
    });
  }

  async editUserInfo({ name, email }) {
    return this._request('users/me', {
      method: 'PATCH',
      headers: { ...this._headers, authorization: `Bearer ${localStorage.getItem(USER_TOKEN)}` },
      body: JSON.stringify({
        name,
        email,
      }),
    });
  }
}

const mainApi = new MainApi({
  // baseUrl: 'https://kris-diplom-backend.nomoredomainsrocks.ru',
  baseUrl: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default mainApi;
