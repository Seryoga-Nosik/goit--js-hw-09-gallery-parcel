import galleryItems from './gallery-items.js';
import refs from './get-refs.js';

const galleryMarkup = createGalleryMarkup(galleryItems);
refs.gallery.insertAdjacentHTML('afterbegin', galleryMarkup);

function createGalleryMarkup(items) {
  return items
    .map(({ preview, original, description }, i) => {
      return `
    <li class="gallery__item">
        <a class="gallery__link" href='${original}'>
            <img class="gallery__image"
            src='${preview}' 
            data-source='${original}' 
            alt='${description}'
            i=${i} />
        </a>
    </li>`;
    })
    .join('');
}
