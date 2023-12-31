import { PixabayAPI } from "./js/api";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import throttle from "lodash.throttle";
import Notiflix from "notiflix";

const refs = {
    searchForm: document.querySelector('.search-form'),
    searchInput: document.querySelector('.search-input'),
    bthForm: document.querySelector('.bth-form'),
    gallery: document.querySelector('.gallery'),
    loadMore: document.querySelector('.load-more')
}

const pixabayApi = new PixabayAPI();

refs.searchForm.addEventListener('submit', ev => {
    ev.preventDefault();

    pixabayApi.q = ev.target.searchQuery.value.trim();
    pixabayApi.page = 1;

    if (pixabayApi.q === '') Notify.failure(`Enter a word to search for`);

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
          Notify.failure(`Invalid search word`);

          ev.target.reset();

          refs.gallery.innerHTML = '';

          refs.loadMore.classList.add('hidden');

          return;
        }

        if (data.data.totalHits === 1) {
          refs.gallery.innerHTML = blockGallery;
          refs.loadMore.classList.add('hidden');
        }

        refs.gallery.innerHTML = blockGallery;
        refs.loadMore.classList.remove('hidden');
      })
      .catch(err => Notify.failure(`error: ${err.name}`));
});

refs.loadMore.addEventListener('click', async ev => {
    pixabayApi.page += 1;

    try {
        const data = await pixabayApi.galleryCard();

        if (Math.ceil(data.data.totalHits / 40) < pixabayApi.page) {
            refs.loadMore.classList.add('hidden')
            Notify.failure('its all');
            return
        }
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
        
        if (pixabayApi.page === data.totalHits) {
            refs.loadMoreBtnEl.classList.add('hidden');
            Notify.failure(
              `We're sorry, but you've reached the end of search results`
            );
        }
    } catch (err) {
        Notify.failure(`error: ${err.name}`);
        console.log(err.name)
        if (data.name) {
            
        };
    }
})

// window.addEventListener('scroll', throttle (async () => {
//   if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
//     pixabayApi.page += 1;
//
//     try {
//       const data = await pixabayApi.galleryCard();

//       let blockGallery = '';
//       data.data.hits.map(el => {
//         blockGallery += `<div class="photo-card">
//                     <img class='photos' src="${el.webformatURL}" alt="${el.tags}" loading="lazy" />
//                     <div class="info">
//                         <p class="info-item">
//                         <b>Likes</b> ${el.likes}
//                         </p>
//                         <p class="info-item">
//                         <b>Views</b> ${el.views}
//                         </p>
//                         <p class="info-item">
//                         <b>Comments</b> ${el.comments}
//                         </p>
//                         <p class="info-item">
//                         <b>Downloads</b> ${el.downloads}
//                         </p>
//                     </div>
//                     </div>`;
//       });
//       refs.gallery.insertAdjacentHTML('beforeend', blockGallery);
//     } catch (err) {
//         alert(`error: ${err.name}`);
//     }
//     console.log(1)
//   }
// }, 250)
// );

//