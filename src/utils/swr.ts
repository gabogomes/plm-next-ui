import axios, { AxiosRequestConfig } from 'axios'
import swr, { Key, SWRResponse } from 'swr'

export const getFetcher = (args: string | AxiosRequestConfig): Object => {
  if (typeof args !== 'object') {
    return axios.get(args).then(res => res.data)
  } else {
    const { url, ..._ } = args
    const params: AxiosRequestConfig = {
      paramsSerializer: {
        indexes: null
      },
      ..._
    }
    return axios.get(url as string, params).then(res => res.data)
  }
}

export const postFetcher = (args: AxiosRequestConfig): Object => {
  const { url, params } = args
  return axios.post(url as string, params).then(res => res.data)
}

const useSwr = (key: Key, options?: Object): SWRResponse => (key as any)?.method !== 'POST' ? swr(key, getFetcher, options) : swr(key, postFetcher, options)

export default useSwr
