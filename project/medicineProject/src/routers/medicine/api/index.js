/**
 * Created by xulimin on 2019/3/22.
 */
/* eslint-disable */
import { request as baseRequest } from '../../../baseApi';

const baseUrl = process.env.REACT_APP_SECRET_API; // 基础URl

export let HOST = baseUrl;
console.log(HOST);

export function setHostHandle(baseIP) {
  if (baseIP) { HOST = baseIP; }
}

export function request(url, options) {
  if (url.indexOf('http') === 0) {
    return baseRequest(url, options);
  }
  return baseRequest(HOST + url, options);
}

export function getHOST() {
  return HOST;
}
