import axios from 'axios'

axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
//基地址
let base = '';  
//通用方法
export const POST = (url, params) => {
  return axios.post(`${base}${url}`, params).then(res => res.data)
}

export const GET = (url, params) => {
  return axios.get(`${base}${url}`, {params: params}).then(res => res.data)
}

export const PUT = (url, params) => {
  return axios.put(`${base}${url}`, params).then(res => res.data)
}

export const DELETE = (url, params) => {
  return axios.delete(`${base}${url}`, {params: params}).then(res => res.data)
}

export const PATCH = (url, params) => {
  return axios.patch(`${base}${url}`, params).then(res => res.data)
}

export const POSTHEADER = (url, params, header) => {
  return axios.post(`${base}${url}`, params, header).then(res => res.data)
}

export const POST1111 = (url, params) => {
  return axios.post('http://10.199.178.48:8080/test/invoices' , params).then(res => res.data)
}

