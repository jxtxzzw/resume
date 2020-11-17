export function hashCode(str) {
  let hash = 0
  if (str.length === 0) return hash
  for (let i = 0; i < str.length; i++) {
    const chr = str.charCodeAt(i)
    hash = (hash << 5) - hash + chr
    hash |= 0 // Convert to 32bit integer
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
    'gold',
    'yellow',
    'lime',
    'green',
    'cyan',
    'blue',
    'geekblue',
    'purple',
  ]
  const r = hashCode(str) % color.length
  return color[r]
}
