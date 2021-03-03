const str = {}

str.isURL = function (s) {
  return /^http[s]?:\/\/.*/.test(s)
}

export default str
