import axios from "axios";

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
          },
        };

        return axios.get(`${PixabayAPI.Base_URL}`, options);
    }
}
