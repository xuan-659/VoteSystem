import {_axios as request} from '@/utils/axios'

export function addVoteApi(data) {
  return request({
    url: '/vote/add',
    method: 'post',
    data
  })
}