import { sortByDate, filenameToSrc } from './util'

export const setting = require('./data/setting.json')
export const certificate = sortByDate(
  filenameToSrc(
    require('./data/certificate.json')[2].data,
    setting.src.certificate
  )
)
export const game = sortByDate(require('./data/game.json')[2].data)
export const fiction = sortByDate(require('./data/fiction.json')[2].data)
export const milestone = sortByDate(require('./data/milestone.json')[2].data)
export const media = sortByDate(require('./data/media.json')[2].data)
export const photo = sortByDate(
  filenameToSrc(require('./data/photo.json')[2].data, setting.src.photo)
)
export const study = sortByDate(require('./data/study.json')[2].data)
export const work = sortByDate(require('./data/work.json')[2].data)
