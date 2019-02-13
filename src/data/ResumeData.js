import {getInfo} from '../util/getInfo'
import {QUERY_ITEM_DB_NAME_FICTION, QUERY_ITEM_DB_NAME_GAME, QUERY_ITEM_DB_NAME_MOVIE, QUERY_ITEM_DB_NAME_OJ} from './Constant'

export async function getOJData () {
  let ret = []
  let res = await getInfo(QUERY_ITEM_DB_NAME_OJ)
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

export async function getMovieData () {
  let ret = []
  let res = await getInfo(QUERY_ITEM_DB_NAME_MOVIE)
  for (let row of res) {
    let rec = []
    rec['name'] = row['name']
    rec['rate'] = parseInt(row['rate'])
    rec['type'] = row['type']
    rec['date'] = row['date']
    rec['status'] = row['status']
    rec['comment'] = row['comment']
    ret.push(rec)
  }
  return ret
}

export async function getGameData () {
  let ret = []
  let res = await getInfo(QUERY_ITEM_DB_NAME_GAME)
  for (let row of res) {
    let rec = []
    rec['name'] = row['name']
    rec['cloud'] = row['cloud'] === '1'
    rec['play'] = row['play'] === '1'
    rec['date'] = row['date']
    rec['status'] = row['status']
    rec['rate'] = parseInt(row['rate'])
    rec['comment'] = row['comment']
    rec['label'] = []
    const ds = row['label'].split(',')
    for (const x of ds) {
      if (x.length > 0) {
        rec['label'].push(x)
      }
    }
    ret.push(rec)
  }
  return ret
}

export async function getFictionData () {
  let ret = []
  let res = await getInfo(QUERY_ITEM_DB_NAME_FICTION)
  for (let row of res) {
    let rec = []
    rec['title'] = row['title']
    rec['date'] = row['date']
    rec['status'] = row['status']
    rec['rate'] = parseInt(row['rate'])
    rec['comment'] = row['comment']
    rec['label'] = []
    const ds = row['label'].split(',')
    for (const x of ds) {
      if (x.length > 0) {
        rec['label'].push(x)
      }
    }
    ret.push(rec)
  }
  return ret
}
