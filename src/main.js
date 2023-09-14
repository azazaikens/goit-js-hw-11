import { PixabayAPI } from "./js/api";
import throttle from "lodash.throttle";

const refs = {
    searchForm: document.querySelector('.search-form'),
    searchInput: document.querySelector('.search-input'),
    bthForm: document.querySelector('.bth-form'),
    gallery: document.querySelector('.gallery'),
}

const pixabayApi = new PixabayAPI();

refs.searchForm.addEventListener('submit', ev => {
    ev.preventDefault();

    pixabayApi.q = ev.target.searchQuery.value.trim();
    pixabayApi.page = 1;

    if (pixabayApi.q === '') alert('Введіть слово');

    pixabayApi
      .galleryCard()
      .then(data => {
          let blockGallery = '';
          data.data.hits.map(el => {
          blockGallery += `<div class="photo-card">
                    <img class='photos' src="${el.webformatURL}" alt="${el.tags}" loading="lazy" />
                    <div class="info">
                        <p class="info-item">
                        <b>Likes</b> ${el.likes}
                        </p>
                        <p class="info-item">
                        <b>Views</b> ${el.views}
                        </p>
                        <p class="info-item">
                        <b>Comments</b> ${el.comments}
                        </p>
                        <p class="info-item">
                        <b>Downloads</b> ${el.downloads}
                        </p>
                    </div>
                    </div>`;
          });
          
          console.log(data)
          
        if (data.data.totalHits === 0) {
          alert('некоректне слово');

          ev.target.reset();
          refs.gallery.innerHTML = '';

          return;
        }

        if (data.data.totalHits === 1) {
          refs.gallery.innerHTML = blockGallery;
        }

        refs.gallery.innerHTML = blockGallery;
      })
      .catch(err => alert(`error: ${err.name}`));
});

window.addEventListener('scroll', throttle (async () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    pixabayApi.page += 1;

    try {
      const data = await pixabayApi.galleryCard();

      let blockGallery = '';
      data.data.hits.map(el => {
        blockGallery += `<div class="photo-card">
                    <img class='photos' src="${el.webformatURL}" alt="${el.tags}" loading="lazy" />
                    <div class="info">
                        <p class="info-item">
                        <b>Likes</b> ${el.likes}
                        </p>
                        <p class="info-item">
                        <b>Views</b> ${el.views}
                        </p>
                        <p class="info-item">
                        <b>Comments</b> ${el.comments}
                        </p>
                        <p class="info-item">
                        <b>Downloads</b> ${el.downloads}
                        </p>
                    </div>
                    </div>`;
      });
      refs.gallery.insertAdjacentHTML('beforeend', blockGallery);
    } catch (err) {
        alert(`error: ${err.name}`);
    }
}
console.log(1)
}, 250)
);

