import view from './View.js';
import icons from 'url:../../img/icons.svg';

class ResultView extends view {
  _parentElement = document.querySelector('.results');
  _errormessage = 'No recipes found for your query! Please try again :)';
  _message = '';

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
export default new ResultView();
