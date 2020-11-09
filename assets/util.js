export function splitToArray(str, split = ',') {
  if (str === null || str === undefined || str === '') {
    return []
  } else {
    return str.split(split)
  }
}

export function randomLabelColor() {
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
  const r = Math.floor(Math.random() * color.length)
  return color[r]
}
