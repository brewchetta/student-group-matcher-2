import { capitalize } from 'utils/stringUtils'

export default class CSVParser {

  constructor(input) {
    this.file = input.files[0]
    this.reader = new FileReader()
    this.reader.addEventListener('load', this.handleLoad)
    this.reader.readAsBinaryString(this.file)
  }


  handleLoad = e => {
    this.data = e.target.result
    this.unparsedNames = this.matchNames()
    this.parsedNames = this.parseNames()
  }

  matchNames = () => this.data.match(/"([a-z -.,]+)"/gi)

  parseNames = () => {
    return this.unparsedNames
    .map(name => {
      return capitalize(name)
      .replaceAll(`"`, ``)
      .split(", ")
      .reverse()
      .join(" ")
    })
  }

}
