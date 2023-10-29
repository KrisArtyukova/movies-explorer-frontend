import { USER_TOKEN } from './constants';

class MoviesApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  async _request(url, options) {
    const route = options?.rewriteBaseUrl ? url : `${this._baseUrl}/${url}`;

    const res = await fetch(route, options);
    return MoviesApi._checkResponse(res);
  }

  static _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  }

  getSavedMovies() {
    return this._request('', {
      headers: {
        authorization: `Bearer ${localStorage.getItem(USER_TOKEN)}`,
      },
    });
  }

  createMovie({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  }) {
    return this._request('', {
      method: 'POST',
      headers: { ...this._headers, authorization: `Bearer ${localStorage.getItem(USER_TOKEN)}` },
      body: JSON.stringify({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        nameRU,
        nameEN,
        thumbnail,
        movieId,
      }),
    });
  }

  async deleteMovie(movieId) {
    return this._request(`${movieId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem(USER_TOKEN)}`,
      },
    });
  }

  getMoviesBeatFilm() {
    return this._request('https://api.nomoreparties.co/beatfilm-movies', {
      rewriteBaseUrl: true,
      headers: { ...this._headers },
    });
  }
}

const moviesApi = new MoviesApi({
  baseUrl: 'http://localhost:3001/movies',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default moviesApi;
