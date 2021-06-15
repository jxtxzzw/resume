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
export const honor = sortByDate(
  filenameToSrc(require('./data/honor.json'), setting.src.honor)
)
export const study = sortByDate(require('./data/study.json'))
export const life = sortByDate(require('./data/life.json'))
export const work = sortByDate(require('./data/work.json'))
export const project = sortByDate(
  filenameToSrc(require('./data/project.json'), setting.src.project)
)
export const subject = sortByDate(
  filenameToSrc(require('./data/subject.json'), setting.src.subject)
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
export const income = require('./data/income.json')
export const advancedIncome = require('./data/advanced_income.json')
export const course = require('./data/course.json')
export const tech = require('./data/tech.json')
export const dream = sortByDate(require('./data/dream.json'), 'born_date')
