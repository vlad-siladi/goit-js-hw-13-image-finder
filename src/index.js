import picsTemplate from './templates/template.hbs';
import picsFinder from './apiService';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import './styles.css';

const apiKey = '23096925-d42719920a727f8342c46883c';
const mainApi = 'https://pixabay.com/api/';
let page = 1;

const refs = {
  input: document.querySelector('.input'),
  searchBtn: document.querySelector('.search__btn'),
  picsList: document.querySelector('.gallery'),
  form: document.querySelector('.search-form'),
  loadMore: document.querySelector('.load-more'),
  reset: document.querySelector('.reset__btn'),
  body: document.querySelector('body'),
};

console.log(refs.picsList);

function onInput(event) {
  event.preventDefault();
  const formInputValue = refs.input.value;
  if (formInputValue === '') {
    error({
      text: 'Please enter something!',
      delay: 2000,
    });
  } else {
    console.log(refs.picsList);

    picsFinder(formInputValue, mainApi, page, apiKey)
      .then(markupRender)
      .then(page++)
      .catch(error);
  }
  setTimeout(() => scroll(), 1000);
}

function markupRender(array) {
  if (array.length > 1) {
    const markup = picsTemplate(array);
    refs.picsList.insertAdjacentHTML('beforeend', markup);
    showBtn();
  }

  if (array.length === 0) {
    error({
      text: 'Nothing found',
    });
    refs.loadMore.classList.add('is-hidden');
  }
}

function err(res) {
  refs.picsList.innerHTML = ' ';
  refs.loadMore.classList.add('is-hidden');
}

function showBtn() {
  if (refs.picsList.length !== 0) {
    refs.loadMore.classList.remove('is-hidden');
  }
}

function onClickModalForBigImage(e) {
  const fullImageSrc = e.target.dataset.source;
  const instance = basicLightbox.create(`<img src="${fullImageSrc}">`);

  instance.show();
}
function scroll() {
  refs.body.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
  console.log(refs.body);
}

refs.form.addEventListener('submit', onInput);
refs.loadMore.addEventListener('click', onInput);
refs.reset.addEventListener('click', err);
refs.searchBtn.addEventListener('click', onInput);
refs.picsList.addEventListener('click', onClickModalForBigImage);
