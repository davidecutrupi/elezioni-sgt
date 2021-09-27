import axios from 'axios'

export const get = (url) => axios.get(url).then(res => res.data)

export const post = (url, body) => axios.post(url, body).then(res => res.data)