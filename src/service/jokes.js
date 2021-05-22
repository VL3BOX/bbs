import { $cms } from "@jx3box/jx3box-common/js/https";

// 获取 joke 列表
const getJokes = (params) => {

  let _params = Object.assign(params, { type: 'joke' })

  return $cms().get('/api/cms/posts', {
    params: _params
  })
}

export {
  getJokes
}