import galleryItems from './gallery-items.js';

import refs from './get-refs.js';
const { gallery, lightbox, lightboxOverlay, lightboxImg, lightboxCloseBtn } = refs;

gallery.addEventListener('click', onModalOpen);
lightboxCloseBtn.addEventListener('click', onModalClose);
lightboxOverlay.addEventListener('click', onModalClose);

function onModalOpen(e) {
  e.preventDefault();

  if (!e.target.classList.contains('gallery__image')) return;

  lightbox.classList.add('is-open');
  lightboxImg.src = e.target.dataset.source;
  lightboxImg.alt = e.target.alt;
  window.addEventListener('keydown', onEscClose);
  window.addEventListener('keydown', onArrowPress);
}

function onModalClose() {
  lightbox.classList.remove('is-open');
  lightboxImg.src = '';
  lightboxImg.alt = '';
  window.removeEventListener('keydown', onModalClose);
  window.removeEventListener('keydown', onArrowPress);
}

function onEscClose(e) {
  if (e.code === 'Escape') onModalClose();
}

function onArrowPress(e) {
  if (e.code === 'ArrowRight') nextImg();
  if (e.code === 'ArrowLeft') previousImg();
}

let currentIndex = 0;

function nextImg() {
  galleryItems.forEach((item, i) => {
    if (lightboxImg.src === item.original) currentIndex = i + 1;
  });

  if (currentIndex >= galleryItems.length) currentIndex = 0;
  setModalImage(currentIndex);
}

function previousImg() {
  galleryItems.forEach((item, i) => {
    if (lightboxImg.src === item.original) currentIndex = i - 1;
  });

  if (currentIndex < 0) currentIndex = galleryItems.length - 1;
  setModalImage(currentIndex);
}

function setModalImage(i) {
  lightboxImg.src = galleryItems[i].original;
  lightboxImg.alt = galleryItems[i].description;
}
