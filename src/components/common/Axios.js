import axios from 'axios';
import urls from './variables.js';

export default axios.create({
  baseURL: urls.serverURL
});