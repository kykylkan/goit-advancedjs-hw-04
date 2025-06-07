import { fetchImages } from './js/pixabay-api';
import { renderImages } from './js/render-functions';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const loader = document.querySelector('.loader');

let query = '';
let page = 1;
let totalHits = 0;
let lightbox;

form.addEventListener('submit', async e => {
  e.preventDefault();
  gallery.innerHTML = '';
  loadMoreBtn.classList.add('hidden');
  loader.classList.remove('hidden');
  page = 1;
  query = e.target.elements.searchQuery.value.trim();

  if (!query) {
    iziToast.warning({
      message: 'Please enter a search query!',
      position: 'topRight',
    });
    loader.classList.add('hidden');
    return;
  }

  try {
    const data = await fetchImages(query, page);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.info({
        message: 'Sorry, no images match your search query. Try again!',
        position: 'topRight',
      });
      return;
    }

    gallery.innerHTML = renderImages(data.hits);
    lightbox = new SimpleLightbox('.gallery a').refresh();

    if (data.hits.length < 15 || page * 15 >= totalHits) {
      loadMoreBtn.classList.add('hidden');
    } else {
      loadMoreBtn.classList.remove('hidden');
    }

    iziToast.success({
      message: `Found ${totalHits} images.`,
      position: 'topRight',
    });
  } catch (err) {
    console.error(err);
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  } finally {
    loader.classList.add('hidden');
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page++;
  loader.classList.remove('hidden');

  try {
    const data = await fetchImages(query, page);
    gallery.insertAdjacentHTML('beforeend', renderImages(data.hits));
    lightbox.refresh();

    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    if (page * 15 >= totalHits) {
      loadMoreBtn.classList.add('hidden');
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (err) {
    console.error(err);
    iziToast.error({
      message: 'Error while loading more images.',
      position: 'topRight',
    });
  } finally {
    loader.classList.add('hidden');
  }
});
