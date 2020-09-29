/**
 * Created by xulimin on 2020/03/05.
 */
/* eslint-disable */
// 获取用户信息
export function getStorage(key) {
  return localStorage.getItem(key) || {};
}

export function setStorage(key, data) {
  return localStorage.setItem(key, data);
}
/* 清除指定 */
export function localStorageRemove(key) {
  return localStorage.removeItem(key);
}
/* 清除本地 */
export function localStorageClear() {
  return localStorage.clear();
}
