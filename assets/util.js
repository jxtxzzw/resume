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

export function sortByDate(list, field = 'date') {
  return list.sort((a, b) => {
    if (a[field] === null && b[field] === null) {
      return 0
    } else if (a[field] === null && b[field] !== null) {
      return 1
    } else if (a[field] !== null && b[field] === null) {
      return -1
    } else {
      return new Date(b[field]) - new Date(a[field])
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
    'Y+': date.getFullYear().toString(), // 年
    'm+': (date.getMonth() + 1).toString(), // 月
    'd+': date.getDate().toString(), // 日
    'H+': date.getHours().toString(), // 时
    'M+': date.getMinutes().toString(), // 分
    'S+': date.getSeconds().toString(), // 秒
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
