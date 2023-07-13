import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "types/request";
import request from "utils/request";

export const useQueryUserInfo = (params?: any) => {
  return useQuery(['userInfo'], () => {
    return request('GET', '/v1/getAgentLevel', params)
  }, {
    enabled: true,
  })
}

