/**
 *Created by xulimin on 2020/02/05
 */
/* eslint-disable */
import { getStorage, localStorageClear, localStorageRemove } from '../utils/storage';
import { LOCAL_STORAGE_KEY } from '../utils/storage.config';

const codeMessage = {
  '200': '服务器成功返回请求的数据。',
  '201': '新建或修改数据成功。',
  '202': '一个请求已经进入后台排队（异步任务）。',
  '204': '删除数据成功。',
  '400': '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  '401': '用户没有权限（令牌、用户名、密码错误）。',
  '403': '用户得到授权，但是访问是被禁止的。',
  '404': '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  '406': '请求的格式不可得。',
  '410': '请求的资源被永久删除，且不会再得到的。',
  '422': '当创建一个对象时，发生一个验证错误。',
  '500': '服务器发生错误，请检查服务器。',
  '502': '网关错误。',
  '503': '服务不可用，服务器暂时过载或维护。',
  '504': '网关超时。',
};

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    if (!response.errorMessage) {
      return response;
    }
  }
  const errortext = codeMessage[response.status] || response.statusText
  const error = new Error(errortext);
  error.name = response.status;
  error.response = response;
  error.errorMessage = response.errorMessage;
  throw error;
}

// 超时请求fetch

function fetch_timeout(url, newOptions, timeout = 5000) {
  let abort = null;
  const abortPromise = new Promise((resolve, reject) => {
    abort = () => reject({
      'code': 505,
      'message': '请求超时！',
    });
  });
  const fetchPromise = fetch(url, newOptions);
  // 最快出结果的promise 作为结果
  const resultPromise = Promise.race([fetchPromise, abortPromise]);
  const timer1 = setTimeout(() => {
    abort();
  }, timeout);

  return resultPromise.then((res) => {
    clearTimeout(timer1);
    return res;
  });
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 *
 *
 */
export function request(url, options) {
  const defaultOptions = {
    'credentials': 'omit',
    // mode:'no-cor',
  };
  const newOptions = { ...defaultOptions, ...options };
  const downloadFlag = !!(options && options.body && options.body.downloadFlag);
  if (
    newOptions.method === 'POST'
    || newOptions.method === 'PUT'
    || newOptions.method === 'DELETE'
  ) {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers,
        'Access-Control-Allow-Origin': '*',
      };
      newOptions.body = JSON.stringify(newOptions.body);
    } else {
      // newOptions.body is FormData
      newOptions.headers = {
        'Accept': 'application/json',
        ...newOptions.headers,
        'Access-Control-Allow-Origin': '*',
      };
    }
  }


  let user_info = null;
  const mainPath = sourceHandle();

  if (mainPath.indexOf('map') > -1) {
    user_info = getStorage(LOCAL_STORAGE_KEY.USER.SORTING_USER_INFO_MAP);
  } else {
    user_info = getStorage(LOCAL_STORAGE_KEY.USER.SORTING_USER_INFO);
  }
  const getUserInfoData = (JSON.stringify(user_info) != '{}') ? JSON.parse(user_info) : {};

  // const token = getUserInfoData.token ? getUserInfoData.token : ''; //获取token
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNDI5ODI4YTBmZDYxMDAyYjE5MzIxMSIsInByb2plY3QiOiJkaGwtYXBpIiwiaWF0IjoxNTgzMzk1MTAxLCJleHAiOjE1ODM0ODE1MDF9.f39S7X8dbEjrWwDweXumTIkJjes5_VwcPFfRkEDbaMY'

  if (token) {
    if (newOptions.headers) {
      newOptions.headers.Authorization = `Bearer ${token}`;
    } else {
      newOptions.headers = {
        'Authorization': `Bearer ${token}`,
        ...newOptions.headers,
      };
    }
  }

  return fetch(url, newOptions)
    .then(checkStatus)
    .then((response) => {
      if (newOptions.method === 'DELETE' || response.status === 204) {
        return response.text();
      } if (downloadFlag) {
        return response.blob();
      }
      return response.json();
    })
    .then((data) => data)
    .catch((e) => {
      if (e) {
        console.log('请求数据错误,请重试')
      }
    });
}

function sourceHandle() { // 返回url中的路径，找到指定服务即：dhl、map、hospital、indoor
  const sourceName = window.location.pathname.split('/', 2);
  return sourceName[1];
}