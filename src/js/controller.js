import * as model from './model.js';
import recipeView from './view/recipeView.js';
import searchView from './view/searchView.js';
import resultView from './view/resultView.js';
import pagenationView from './view/pagenationView.js';
import bookmarkView from './view/BookmarkView.js';
import addRecipeView from './view/addRecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipe = async function () {
  try {
    // get the id from url
    const id = window.location.hash.slice(1);
    if (!id) return;

    // render the spinner
    recipeView.renderSpinner();

    // 0) update the result review to mark selected
    resultView.update(model.getSearchResultsPage());
    bookmarkView.update(model.state.bookmarks);

    // collecting data
    await model.loadrecipe(id);
    const { recipe } = model.state;
    console.log(recipe);

    //render in app
    recipeView.render(recipe);
  } catch (err) {
    console.log(err);
    recipeView.renderError();
  }
};

const controlSearchResult = async function () {
  try {
    resultView.renderSpinner();
    //01. get search query
    const query = searchView.getQuery();
    if (!query) return;

    //02 load search results
    await model.loadSearchRecipe(query);

    //03 render the results
    console.log(model.state.search.result);
    console.log(model.getSearchResultsPage());
    resultView.render(model.getSearchResultsPage());

    //04 render initial pagination buttons
    pagenationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};
const controlPagenation = function (goToPage) {
  //Render new results
  resultView.render(model.getSearchResultsPage(goToPage));
  //render new pagination buttons
  pagenationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //update the servings
  model.updateServings(newServings);
  //update the view
  recipeView.update(model.state.recipe);
};
const controlBookmark = function () {
  // add the bookmark view
  if (!model.state.recipe.bookmark) model.addBookmark(model.state.recipe);
  else model.removeBookmark(model.state.recipe.id);

  //update the ui
  recipeView.update(model.state.recipe);

  // update to ui
  bookmarkView.render(model.state.bookmarks);
};
const controlLoadBookmark = function () {
  bookmarkView.render(model.state.bookmarks);
};
const controlAddRecipe = function (newRecipe) {
  console.log(newRecipe);
};

const init = function () {
  bookmarkView.addHandlerRender(controlLoadBookmark);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlBookmark);
  searchView.addHandlerSearch(controlSearchResult);
  pagenationView.addHandlerclick(controlPagenation);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
// window.addEventListener('hashchange', showRecipe);
