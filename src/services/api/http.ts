import axios from 'axios'
import type { ResponseType } from 'axios'

export interface Request {
  url: string
  method?: string
  responseType?: ResponseType
  headers?: any
  params?: any
  data?: any
  paramsSerializer?: (params: object | string) => string
}

export function makeRequest ({
  url = '/',
  method = 'get',
  headers,
  params,
  data,
  responseType = 'json',
}: Request) {
  return axios({
    url,
    method,
    responseType,
    headers,
    params,
    data,
    paramsSerializer: { indexes: null },
    withCredentials: false,
  })
}