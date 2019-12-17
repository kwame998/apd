import request from '../utils/request';

export async function query(params,variables) {
  return request(`/api/graphql`, {
    method: 'POST',
    data: {query:params,variables},
  });
}
