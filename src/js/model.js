import { async } from 'regenerator-runtime';
import { API_KEY, RES_PER_PAGE } from './config.js';
import { getJson } from './helper.js';

export const state = {
  recipe: {},
  search: {
    page: 1,
    query: '',
    result: [],
    resultperpage: RES_PER_PAGE,
  },
  bookmarks: [],
};

export const loadrecipe = async function (id) {
  try {
    const data = await getJson(`${API_KEY}${id}`);

    let { recipe } = data.data;
    // console.log(recipe);

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    if (state.bookmarks.some(bookmark => bookmark.id === id)) {
      state.recipe.bookmark = true;
    } else state.recipe.bookmark = false;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const loadSearchRecipe = async function (query) {
  try {
    const data = await getJson(`${API_KEY}?search=${query}`);
    state.search.query = query;
    state.search.result = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * 10;
  const end = page * 10;
  return state.search.result.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.map(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
  console.log(state.recipe.ingredients);
};

const presistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  // add bookmark array
  state.bookmarks.push(recipe);

  // add a bookmark
  if (recipe.id === state.recipe.id) state.recipe.bookmark = true;

  presistBookmarks();
};

export const removeBookmark = function (id) {
  //find the index of the bookmark
  const index = state.bookmarks.findIndex(bookmark => bookmark.id === id);

  //remove the bookmark using the index
  state.bookmarks.splice(index, 1);
  if (id === state.recipe.id) state.recipe.bookmark = false;

  presistBookmarks();
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};

init();
