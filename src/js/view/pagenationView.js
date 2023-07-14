import icons from 'url:../../img/icons.svg';
import view from './View.js';

class PagenationView extends view {
  _parentElement = document.querySelector('.pagination');

  addHandlerclick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      console.log(btn);
      const goToPage = +btn.dataset.goto;
      console.log(goToPage);
      handler(goToPage);
    });
  }
  _generateMarkup() {
    const curPage = this._data.page;
    const numpages = Math.ceil(
      this._data.result.length / this._data.resultperpage
    );
    console.log(numpages);

    //page 1 and there are other pages
    if (curPage === 1 && numpages > 1) {
      return ` <button data-goto="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
      <span>Page ${curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;
    }
    //last page
    if (curPage === numpages && numpages > 1) {
      return `<button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${curPage - 1}</span>
    </button>`;
    }

    //other pages
    if (curPage < numpages) {
      return `<button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${curPage - 1}</span>
    </button>
    <button data-goto="${
      curPage + 1
    }" class="btn--inline pagination__btn--next">
      <span>Page ${curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
    `;
    }

    //Page 1 and there are no other pages
    return 'page 1 and no other';
  }
}

export default new PagenationView();
