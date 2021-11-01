import {_axios as request} from '@/utils/axios'

export function addVoteApi(data) {
  // data = JSON.stringify(data);
  console.log(data);
  return request({
    url: '/vote/add',
    method: 'post',
    data
  })
}