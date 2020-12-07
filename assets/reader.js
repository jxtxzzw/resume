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
export const milestone = sortByDate(
  require('./data/milestone.json')[2].data
).reverse()
export const media = sortByDate(require('./data/media.json')[2].data)
export const photo = sortByDate(
  filenameToSrc(require('./data/photo.json')[2].data, setting.src.photo)
)
export const exhibit = sortByDate(
  filenameToSrc(require('./data/exhibit.json')[2].data, setting.src.exhibit)
)
export const study = sortByDate(require('./data/study.json')[2].data)
export const work = sortByDate(require('./data/work.json')[2].data)
export const project = sortByDate(
  filenameToSrc(require('./data/project.json')[2].data, setting.src.project)
)
export const coding = sortByDate(require('./data/coding.json')[2].data)
export const microblog = sortByDate(
  require('./data/microblog.json')[2].data,
  'post_date'
).filter((e) => {
  return e.post_type === 'microblog'
})
export const introduction = require('./data/introduction.json')
export const food = require('./data/food.json')[2].data
