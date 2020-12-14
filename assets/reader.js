import { sortByDate, filenameToSrc } from './util'

export const setting = require('./data/setting.json')
export const certificate = sortByDate(
  filenameToSrc(require('./data/certificate.json'), setting.src.certificate)
)
export const game = sortByDate(require('./data/game.json'))
export const fiction = sortByDate(require('./data/fiction.json'))
export const milestone = sortByDate(require('./data/milestone.json')).reverse()
export const media = sortByDate(require('./data/media.json'))
export const photo = sortByDate(
  filenameToSrc(require('./data/photo.json'), setting.src.photo)
)
export const exhibit = sortByDate(
  filenameToSrc(require('./data/exhibit.json'), setting.src.exhibit)
)
export const study = sortByDate(require('./data/study.json'))
export const work = sortByDate(require('./data/work.json'))
export const project = sortByDate(
  filenameToSrc(require('./data/project.json'), setting.src.project)
)
export const coding = sortByDate(require('./data/coding.json'))
export const microblog = sortByDate(
  require('./data/microblog.json'),
  'post_date'
).filter((e) => {
  return e.post_type === 'microblog'
})
export const introduction = require('./data/introduction.json')
export const food = require('./data/food.json')
export const footprint = require('./data/footprint.json')
export const exam = require('./data/exam.json')
