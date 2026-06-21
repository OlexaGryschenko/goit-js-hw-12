import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton, 
  hideLoadMoreButton
 } from './js/render-functions.js';
  
  import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let currentQuery = '';
let currentPage = 1;
let maxPage = 0;
const PER_PAGE = 15;


form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const searchQuery = event.currentTarget.elements['search-text'].value.trim();

  if (!searchQuery) return;

  currentQuery = searchQuery;
  currentPage = 1;

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(searchQuery);
    
    if (data.hits.length === 0) {
      iziToast.error({
        message: "Sorry, there are no images matching your search query. Please try again!",
        position: 'topRight'
      });
      return;
    }

maxPage = Math.ceil(data.totalHits / PER_PAGE);
    createGallery(data.hits);
    
    if (currentPage < maxPage) {
      showLoadMoreButton();
    } else {
      showEndMessage();
    }
  } catch (error) {
    handleError(error);
  } finally {
    hideLoader();
    form.reset();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    createGallery(data.hits);
    scrollPage();

    if (currentPage < maxPage) {
      showLoadMoreButton();
    } else {
      showEndMessage();
    }
  } catch (error) {
    handleError(error);
  } finally {
    hideLoader();
  }
});

function scrollPage() {
  const galleryItem = document.querySelector('.gallery-item');
  if (!galleryItem) return;
  
  const rect = galleryItem.getBoundingClientRect();
  window.scrollBy({
    top: rect.height * 2,
    behavior: 'smooth'
  });
}

function showEndMessage() {
  iziToast.info({
    message: "We're sorry, but you've reached the end of search results.",
    position: 'topRight'
  });
}

function handleError(error) {
  iziToast.error({
    title: 'Error',
    message: error.message,
    position: 'topRight'
  });
}