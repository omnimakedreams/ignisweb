import axios from 'axios';
import urls from './variables.js';
const APIimgbburl = axios.create({
  baseURL: urls.imgbburl
})
export default APIimgbburl;