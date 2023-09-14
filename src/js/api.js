import axios from "axios";

// export function search(request) {
//     let API_KEY = '39435847-d6a38cbbc0d0e6f45fb6a9696';
//     let URL = 'https://pixabay.com/api/?key=' + API_KEY + '&q=' + encodeURIComponent(`${request}`);

//     return axios.get(URL).then(response => response.data);
  
//     $.getJSON(URL, function (data) {
//         if (parseInt(data.totalHits) > 0)
            
//             $.each(data.hits, function (i, hit) {
//                 console.log(hit.pageURL);
//             });
//         else console.log('No hits');
//     });
// }

export class PixabayAPI { 
    static API_KEY = '39435847-d6a38cbbc0d0e6f45fb6a9696';
    static Base_URL = 'https://pixabay.com/api/?key=';

    constructor() {
        this.q = null;
        this.page = 1;
        this.per_page = 40;
    }
    galleryCard() {
        const options = {
          params: {
            q: this.q,
            page: this.page,
            per_page: this.per_page,
            key: PixabayAPI.API_KEY,
            safesearch: true,
            image_type: 'photo',
            orientation: 'horizontal',
          },
        };

        return axios.get(`${PixabayAPI.Base_URL}`, options);
    }
}

// export function fetchCatByBreed(breedId) {
//     const urlSearch = 'https://api.thecatapi.com/v1/images/search';
//     const Params = new URLSearchParams({ breed_ids: breedId });
//     const url = `${urlSearch}?${Params}`;

//     return axios.get(url).then(response => response.data);
// };