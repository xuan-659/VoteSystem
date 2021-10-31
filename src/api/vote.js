import {_axios as request} from '@/utils/axios'

export function addVoteApi(data) {
  console.log('api');
  return request({
    url: '/vote/add',
    method: 'post',
    data
  })
}