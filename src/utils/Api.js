import { USER_TOKEN } from './constants';

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  async _request(url, options) {
    const res = await fetch(`${this._baseUrl}/${url}`, options);
    return Api._checkResponse(res);
  }

  static _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  }

  getInitialCards() {
    return this._request('cards', {
      headers: {
        authorization: `Bearer ${localStorage.getItem(USER_TOKEN)}`,
      },
    });
  }

  async addCard(name, link) {
    return this._request('cards', {
      method: 'POST',
      headers: { ...this._headers, authorization: `Bearer ${localStorage.getItem(USER_TOKEN)}` },
      body: JSON.stringify({
        name,
        link,
      }),
    });
  }

  async deleteCard(id) {
    return this._request(`cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem(USER_TOKEN)}`,
      },
    });
  }

  async addLike(id) {
    return this._request(`cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${localStorage.getItem(USER_TOKEN)}`,
      },
    });
  }

  async deleteLike(id) {
    return this._request(`cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem(USER_TOKEN)}`,
      },
    });
  }

  async getUserInfo() {
    return this._request('users/me', {
      headers: {
        authorization: `Bearer ${localStorage.getItem(USER_TOKEN)}`,
      },
    });
  }
}

const api = new Api({
  // baseUrl: 'https://krismestoback.nomoredomainsrocks.ru',
  baseUrl: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
