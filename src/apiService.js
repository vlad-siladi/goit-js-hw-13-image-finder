import axios from 'axios'

export default function picsFinder(formInputValue, mainApi, page, apiKey) {
   return axios.get(`${mainApi}?image_type=photo&orientation=horizontal&q=${formInputValue}&page=${page}&per_page=12&key=${apiKey}`).then(res=>res.data.hits)
}
