import axios, { AxiosHeaders, AxiosRequestHeaders } from 'axios'
import { ApiResponse } from 'types/request';
import { toLower } from 'lodash';
import { env } from 'config/env';
import { Toast } from 'antd-mobile';

axios.defaults.timeout = 50000

const request = <T>(
  method: string,
  url: string,
  params: any,
  needToken: boolean = true,
  headerContentType: string = 'application/json',
  baseURL: string = env.baseUrl
): Promise<ApiResponse<T>> => {
  const headers: AxiosRequestHeaders = new AxiosHeaders()
  headers['Content-type'] = headerContentType
  headers.address = toLower(localStorage.getItem('address') || '')
  headers.message = localStorage.getItem('message') || ''
  headers.signature = localStorage.getItem('signature') || ''
  if (needToken) {
    if (!headers.signature) {
      return new Promise((resolve) => {
        resolve({
          code: -1,
          success: false,
          data: null,
          msg: 'Network exception'
        })
      })
    }
    headers.authorized = localStorage.getItem('authorized') || ''
  }


  return new Promise((resolve, reject) => {
    axios({
      method,
      headers,
      baseURL: baseURL,
      url,
      timeout: 15000,
      params: method === 'GET' || method === 'DELETE' ? params : null, // 是即将与请求一起发送的 URL 参数
      data: method === 'POST' || method === 'PUT' ? params : null // 是作为请求主体被发送的数据
    })
      .then(res => {
        Toast.clear()
        if (res.data.code === 1) {
          res.data.success = true
          resolve(res.data)
        } else if (+res.data.code === -1) { // token失效
          resolve({
            code: -1,
            success: false,
            data: null,
            msg: 'Token inValid',
          })
        } else {
          // Toast.fail(res.data.msg)
          resolve({
            code: res.data.code,
            success: false,
            data: null,
            msg: res.data.msg || 'Network exception',
          })
        }
      }).catch((error) => {
        Toast.clear()
        let messageText = ''
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          messageText = error.response.data.msg
        } else {
          messageText = 'Network exception'
        }
        Toast.show(messageText)
        resolve({
          code: 500,
          success: false,
          data: null,
          msg: 'Network exception',
        })
      })
  })
}

export default request
