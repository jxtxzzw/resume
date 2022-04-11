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
export const research = sortByDate(
  filenameToSrc(require('./data/research.json'), setting.src.research)
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
export const activity = require('./data/activity.json')
export const dreamEntry = require('./data/dream_entry.json')
export const dreamCascade = require('./data/dream_cascade.json')
export const dreamProgress = require('./data/dream_progress.json')
export const dreamProgressRelation = require('./data/dream_progress_relation.json')
export const balance = sortByDate(require('./data/balance.json')).reverse()
export const credit = sortByDate(require('./data/credit.json')).reverse()
