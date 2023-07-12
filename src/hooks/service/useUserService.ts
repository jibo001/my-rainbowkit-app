import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "types/request";
import request from "utils/request";

export const useQueryUserInfo = () => {
  return useQuery(['userInfo'], (params) => {
    return request('GET', '/users/getUserInfo', params)
  }, {
    enabled: true,
  })
}

export const queryUserInfo = (parama?: any): Promise<ApiResponse<any>> => {
  return request('GET', `/users/getUserInfo`, parama)
}