import {getOJInfo} from './getInfo'

export async function getOJData () {
  let ret = []
  let res = await getOJInfo()
  for (let row of res) {
    let rec = []
    rec['oj'] = row['oj']
    rec['problem'] = row['problem']
    rec['name'] = row['name']
    rec['status'] = row['status']
    rec['ds'] = []
    rec['args'] = []
    const ds = row['ds'].split(',')
    for (const x of ds) {
      if (x.length > 0) {
        rec['ds'].push(x)
      }
    }
    const args = row['args'].split(',')
    for (const x of args) {
      if (x.length > 0) {
        rec['args'].push(x)
      }
    }
    ret.push(rec)
  }
  return ret
}
