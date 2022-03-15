export function capitalize(string) {
  return string.split(' ').map(subStr => subStr[0].toUpperCase() + subStr.slice(1)).join(' ')
}

export function toSpinalCase(string) {
  return string.replace(/[ _]/, '-').toLowerCase()
}

export function toSpacedCase(string) {
  return string.replace(/[-_]/, ' ')
}
