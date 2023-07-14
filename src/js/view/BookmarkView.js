import view from './View.js';
import icons from 'url:../../img/icons.svg';

class BookmarkView extends view {
  _parentElement = document.querySelector('.bookmarks');
  _errormessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';
  _message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return this._data.map(this._generateMarkuplist).join('');
  }
  _generateMarkuplist(res) {
    const id = window.location.hash.slice(1);
    return `<li class="preview">
    <a class="preview__link ${
      res.id == id ? 'preview__link--active' : ''
    }" href="#${res.id}">
      <figure class="preview__fig">
        <img src="${res.image}" alt="${res.title}" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${res.title}</h4>
        <p class="preview__publisher">${res.publisher}</p>
      </div>
    </a>
  </li>`;
  }
}
export default new BookmarkView();
