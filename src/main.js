import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api';
import { clearGallery, createGallery, hideLoader, showLoader } from './js/render-functions';



const form = document.querySelector('.form');
const searchInput = document.querySelector('.input');

if (form)
form.addEventListener('submit', async (event) => {
  event.preventDefault();
clearGallery();
  const query = event.currentTarget.elements['search-text'].value.trim();

  // Перевірка на пустий рядок
  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Будь ласка, введіть значення!',
      position: 'topRight',
    });
    return;
  }

    showLoader();

  try {
    const data = await getImagesByQuery(query);
    
    // Перевірка чи знайдено хоч якісь зображення
    if (!data.hits || data.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }
    // Успішний результат, малюємо галерею
    createGallery(data.hits);
    iziToast.success({
      title: 'Success',
      message: `Ми знайшли ${data.hits.length} зображень!`,
      position: 'topRight',
    });
   

  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Сталася помилка під час завантаження. Спробуйте пізніше!',
      position: 'topRight',
    });
    console.error('Fetch error:', error);
  } finally {
    hideLoader();
    event.target.reset(); // Очищаємо форму після виконання
  }
});

