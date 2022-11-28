export function hashCode(str) {
  let hash = 0
  if (str.length === 0) return hash
  for (let i = 0; i < str.length; i++) {
    const chr = str.charCodeAt(i)
    hash = (hash << 5) - hash + chr
    hash |= 0 // Convert to 32bit integer
  }
  if (hash < 0) {
    hash = -hash
  }
  return hash
}

export function splitToArray(str, split = ',') {
  if (str === null || str === undefined || str === '') {
    return []
  } else {
    return str.split(split)
  }
}

export function randomLabelColor(str) {
  const color = [
    'magenta',
    'blue',
    'volcano',
    'orange',
    'green',
    'cyan',
    'blue',
    'geekblue',
    'purple',
  ]
  const r = hashCode(str) % color.length
  return color[r]
}

export function sortByDate(list, field = 'date', breakingTie = undefined) {
  return list.sort((a, b) => {
    if (a[field] === null && b[field] === null) {
      return 0
    } else if (a[field] === null && b[field] !== null) {
      return 1
    } else if (a[field] !== null && b[field] === null) {
      return -1
    } else {
      const dDiff = new Date(b[field]) - new Date(a[field])
      if (breakingTie && dDiff === 0) {
        return breakingTie(a, b)
      } else {
        return dDiff
      }
    }
  })
}

export function filenameToSrc(list, dir) {
  return list.map((e) => {
    e.src = dir + e.filename
    return e
  })
}

export function dateFormat(date, fmt = 'YYYY-mm-dd') {
  let ret
  const opt = {
    'Y+': date.getUTCFullYear().toString(), // 年
    'm+': (date.getUTCMonth() + 1).toString(), // 月
    'd+': date.getUTCDate().toString(), // 日
    'H+': date.getUTCHours().toString(), // 时
    'M+': date.getUTCMinutes().toString(), // 分
    'S+': date.getUTCSeconds().toString(), // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  }
  for (const k in opt) {
    ret = new RegExp('(' + k + ')').exec(fmt)
    if (ret) {
      fmt = fmt.replace(
        ret[1],
        ret[1].length === 1 ? opt[k] : opt[k].padStart(ret[1].length, '0')
      )
    }
  }
  return fmt
}

export function normalizeDate(
  arr,
  dateField = 'date',
  timeZoneField = 'timezone'
) {
  for (const x of arr) {
    if (dateField && x[dateField]) {
      const date = x[dateField]
      let timezone = 'UTC'
      if (timeZoneField && x[timeZoneField]) {
        timezone = x[timeZoneField]
      }
      const dateInEn = new Date(`${date}`).toLocaleString('en-US') // 增加 Firefox 兼容性
      const normalizedDate = new Date(`${dateInEn} ${timezone}`) // 统一转换为 UTC 时区
      x[dateField] = dateFormat(normalizedDate) // 将 date 字段赋值为 YYYY-mm-dd 的字符串，方便后续代码操作
      x[timeZoneField] = timezone
    }
  }
  return arr
}

export function showDate(
  item,
  formattedField = 'formatted_date',
  compatibleDateField = 'date'
) {
  if (item && item[formattedField]) {
    return item[formattedField]
  } else if (item && item[compatibleDateField]) {
    return item[compatibleDateField]
  } else {
    return new Date()
  }
}
