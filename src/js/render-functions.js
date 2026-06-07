import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Створюємо екземпляр SimpleLightbox для модального вікна
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const galleryContainer = document.querySelector('.gallery');
const loader = document.querySelector('.loader'); // Припускаємо, що лоадер має клас .loader

export function createGallery(images) {
  clearGallery();
  const markup = images
    .map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
        <li class="gallery-item">
          <a class="gallery-link" href="${largeImageURL}">
            <img class="gallery-image" src="${webformatURL}" alt="${tags}" loading="lazy" />
          </a>
          <div class="info">
            <p class="info-item"><b>Likes</b> ${likes}</p>
            <p class="info-item"><b>Views</b> ${views}</p>
            <p class="info-item"><b>Comments</b> ${comments}</p>
            <p class="info-item"><b>Downloads</b> ${downloads}</p>
          </div>
        </li>
      `
    )
    .join('');

  galleryContainer.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
  // if (!window.lightbox) {
  //   lightbox = new SimpleLightbox('.gallery a', {
  //     captionsData: 'title', // Використовуємо атрибут title для підписів
  //     captionDelay: 250,
  //   });
  // } else {
    
  // }
  // Оновлюємо екземпляр лайтбоксу після додавання нових елементів
 }

export function clearGallery() {
  galleryContainer.innerHTML = '';
}

export function showLoader() {
  if (loader){
  loader.classList.remove('is-hidden'); // Замініть 'is-hidden' на ваш клас видимості
  }
}

export function hideLoader() {
  if (loader)
  {loader.classList.add('is-hidden');}
  else {
    console.warn('Element is apsent');
    
  }
}
