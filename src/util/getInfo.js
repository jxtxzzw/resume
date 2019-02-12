import {QUERY_URL} from '../data/Constant'

const axios = require('axios')

export async function getInfo (item) {
  const res = await axios
    .get(QUERY_URL, { params: { item: item } })
    .then((response) => response.data)['catch']((error) => {
      alert(error)
    })
  return res.reverse()
}
