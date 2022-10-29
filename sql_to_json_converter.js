const Converter = (function () {
  let _fs = null
  let _fileLines = null
  const _collections = []
  const shouldHiddenFields = ['note', 'hidden', 'secret']
  const HIDDEN = 'HIDDEN'

  const reportError = function (errorText) {
    console.log('ERROR: ' + errorText)
    process.exit(1)
  }

  const getNextLine = function () {
    return _fileLines.shift().trim()
  }

  const hasMoreLines = function () {
    return _fileLines.length > 0
  }

  const readFile = function (fileName) {
    const fileAsString = _fs.readFileSync(fileName, 'utf8')
    _fileLines = fileAsString.split('\n')
  }

  const startsWith = function (str, textToFind) {
    return str.trim().indexOf(textToFind.trim()) === 0
  }

  const convertData = function (data, type) {
    if (type === HIDDEN) {
      return HIDDEN
    }
    // NULL should not be treated as a string "NULL", it should be null itself
    if (data === 'NULL') {
      return null
    }
    // Strings
    if (
      startsWith(type, 'varchar') ||
      startsWith(type, 'text') ||
      startsWith(type, 'date') ||
      startsWith(type, 'longtext') ||
      startsWith(type, 'enum') ||
      startsWith(type, 'bigint')
    ) {
      return data
    }
    // Convert it as a number
    else if (startsWith(type, 'int') || startsWith(type, 'decimal')) {
      return Number(data)
    }
    // Boolean, return if it is 1, note that we need parseInt() to compare a string and an integer
    else if (startsWith(type, 'tinyint')) {
      return parseInt(data) === 1
    } else {
      console.log("Don't know this type: " + type + '. Keep the original data.')
      return data
    }
  }

  const readNextTableDef = function () {
    while (hasMoreLines()) {
      let currentLine = getNextLine()

      if (startsWith(currentLine, 'CREATE TABLE')) {
        const tableName = currentLine.split('`')[1]
        console.log('Converting table: ' + tableName)
        currentLine = getNextLine()
        const fields = []

        while (startsWith(currentLine, '`')) {
          const parts = currentLine.split('`')
          const fieldName = parts[1]
          let fieldType = parts[2].split(' ')[1]

          // The field `id` is int in many cases, but we need to treat it as a string
          if (fieldName === 'id') {
            // fieldName = '_id'; // optional, if the `id` is for other usage
            fieldType = 'text'
          }
          if (shouldHiddenFields.includes(fieldName)) {
            fieldType = HIDDEN
          }

          fields.push({
            name: fieldName,
            type: fieldType,
          })

          currentLine = getNextLine()
        }

        _collections.push({
          name: tableName,
          fields,
        })

        return
      }
    }
  }

  const readTableValues = function () {
    const currentCollection = _collections[_collections.length - 1]
    const tableName = currentCollection.name
    const fields = currentCollection.fields

    while (hasMoreLines()) {
      let currentLine = getNextLine()

      if (startsWith(currentLine, 'INSERT INTO')) {
        currentLine = currentLine.replace(
          'INSERT INTO `' + tableName + '` VALUES ',
          ''
        )
        let index = 1
        let valueId = 0
        let insideString = false
        let currentValue = ''
        const values = []
        let pair = {}

        while (index < currentLine.length) {
          const previousChar = currentLine.charAt(index - 1)
          const currentChar = currentLine.charAt(index)

          if ((currentChar === ',' || currentChar === ')') && !insideString) {
            const field = fields[valueId]
            pair[field.name] = convertData(currentValue, field.type)

            valueId++
            currentValue = ''

            if (currentChar === ')') {
              index += 2
              values.push(pair)
              pair = {}
              valueId = 0
            }
          } else if (currentChar === "'" && previousChar !== '\\') {
            insideString = !insideString
          } else {
            currentValue = currentValue + currentChar
          }

          index++
        }

        _collections[_collections.length - 1].values = values
        return
      }
    }
  }

  return {
    init() {
      if (parseInt(process.argv.length) !== 3) {
        reportError(':-)Please specify exactly one mysqldump input file')
      }

      _fs = require('fs')
      const fileName = process.argv[2]
      readFile(fileName)

      while (hasMoreLines()) {
        readNextTableDef()
        readTableValues()
      }

      for (let i = 0; i < _collections.length; i++) {
        const escapedJsonStr = JSON.stringify(
          _collections[i].values,
          undefined,
          4
        )
        const jsonStr = escapedJsonStr
          .replace(new RegExp('\\\\\\\\', 'gm'), '\\')
          .replace(new RegExp('\\\\\\\\"', 'gm'), '\\"')
          .replace(new RegExp("\\\\'", 'gm'), "'")
        _fs.writeFileSync(_collections[i].name + '.json', jsonStr)
      }

      process.exit()
    },
  }
})()

Converter.init()
