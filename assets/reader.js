import { sortByDate, filenameToSrc, normalizeDate } from './util'

export const setting = require('./data/setting.json')

export const introduction = require('./data/introduction.json')
export const exam = require('./data/exam.json')

export const activity = sortByDate(
  normalizeDate(require('./data/activity.json'))
)
export const advancedIncome = require('./data/advanced_income.json')
export const balance = sortByDate(require('./data/balance.json')).reverse()
export const certificate = sortByDate(
  filenameToSrc(
    normalizeDate(require('./data/certificate.json')),
    setting.src.certificate
  )
)
export const coding = require('./data/coding.json')
export const course = require('./data/course.json')
export const credit = sortByDate(
  normalizeDate(require('./data/credit.json'))
).reverse()
export const dreamCascade = require('./data/dream_cascade.json')
export const dreamEntry = require('./data/dream_entry.json')
export const dreamProgress = normalizeDate(
  require('./data/dream_progress.json')
)
export const dreamProgressRelation = require('./data/dream_progress_relation.json')
export const exhibit = sortByDate(
  filenameToSrc(
    normalizeDate(require('./data/exhibit.json')),
    setting.src.exhibit
  )
)
export const fiction = sortByDate(normalizeDate(require('./data/fiction.json')))
export const food = require('./data/food.json')
export const footprint = normalizeDate(require('./data/footprint.json'))
export const game = sortByDate(normalizeDate(require('./data/game.json')))
export const honor = sortByDate(
  filenameToSrc(normalizeDate(require('./data/honor.json')), setting.src.honor)
)
export const income = require('./data/income.json')
export const life = sortByDate(
  normalizeDate(
    normalizeDate(require('./data/life.json'), 'date', 'datezone'),
    'till',
    'tillzone'
  ),
  'date',
  (a, b) => {
    return b.event.localeCompare(a.event)
  }
)
export const media = sortByDate(normalizeDate(require('./data/media.json')))
export const milestone = sortByDate(
  normalizeDate(require('./data/milestone.json'))
).reverse()
export const photo = sortByDate(
  filenameToSrc(normalizeDate(require('./data/photo.json')), setting.src.photo)
)
export const project = sortByDate(
  filenameToSrc(
    normalizeDate(require('./data/project.json')),
    setting.src.project
  )
)
export const research = sortByDate(
  filenameToSrc(
    normalizeDate(require('./data/research.json')),
    setting.src.research
  )
)
export const study = sortByDate(
  normalizeDate(
    normalizeDate(require('./data/study.json'), 'date', 'datezone'),
    'end',
    'endzone'
  )
)
export const subject = sortByDate(
  filenameToSrc(
    normalizeDate(require('./data/subject.json')),
    setting.src.subject
  )
)
export const tech = require('./data/tech.json')
export const work = sortByDate(
  normalizeDate(
    normalizeDate(require('./data/work.json'), 'date', 'datezone'),
    'end',
    'endzone'
  )
)

export const microblog = sortByDate(
  require('./data/microblog.json'),
  'post_date_gmt'
).filter((e) => {
  return e.post_type === 'microblog'
})
