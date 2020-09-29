/**
 * Create by xulimin on 2020-03-05
 */
/* eslint-disable */
import { stringify } from 'qs';
import { request } from './index';

// 获取订单文件列表接口
export function queryFileList(params) {
  return request('/dhl-api/v1/shipment/get-uploaded-bill-list', {
    'method': 'POST',
    'body': {
      ...params,
    },
  })
}

// 查看订单接口
export function viewFileData(params) {
  console.log(stringify(params));
  return request(`/dhl-api/v1/shipment/get-uploaded-bill-data?${stringify(params)}`)
}

// 下载模板
export function getTemplates(params) {
  return request(`/dhl-api/v1/shipment/get-templates?${stringify(params)}`)
}