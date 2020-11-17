import { sortByDate } from './util'

export const setting = require('./data/setting.json')
export const certificate = sortByDate(
  require('./data/certificate.json')[2].data
)
export const game = sortByDate(require('./data/game.json')[2].data)
export const fiction = sortByDate(require('./data/fiction.json')[2].data)
export const milestone = sortByDate(require('./data/milestone.json')[2].data)
export const media = sortByDate(require('./data/media.json')[2].data)
