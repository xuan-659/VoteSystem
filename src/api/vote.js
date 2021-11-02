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

export function getVoteApi(data) {
  const {username} = data;
  return request({
    url:`/vote/${username}`,
    method: 'get',
  })
}
