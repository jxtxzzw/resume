import {QUERY_URL} from './Constant'

const axios = require('axios')

const PARAMS_OJ = 'oj'

export async function getOJInfo () {
  const res = await axios
    // .get(QUERY_URL, { params: { item: PARAMS_OJ } })
    .get(QUERY_URL)
    .then((response) => response.data)['catch']((error) => {
      alert(error)
    })
  return res
}

export async function getInfo (item) {
  switch (item) {
    case PARAMS_OJ:
      await getOJInfo()
      break
  }
}
