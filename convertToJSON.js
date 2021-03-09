const path = require('path')
const fs = require('fs')


const customSplit = (string) => {
  const array = []
  let newStr = ''

  let OUTSIDE = 0
  let INSIDE = 1
  let state = OUTSIDE

  for (let i = 0; i < string.length; i++) { // "Chronicle, Vol. 1",Creedence Clearwater Revival,20
    switch (state) {
      case INSIDE:
        if (string[i] == '"') {
          state = OUTSIDE
        } else {
          newStr += string[i]
        }
        break
      case OUTSIDE:
        if (string[i] == '"') {
          state = INSIDE
        } else if (string[i] != ',') {
          newStr += string[i]
        } else {
          array.push(newStr)
          newStr = ''
        }
    }
  }
  array.push(newStr)

  return array
}

const folder = 'output'
const fileName = 'albums.json'

const pathName = path.join(folder, fileName)

const albums = fs.readFileSync('albums.csv', {
  encoding: 'utf-8'
}).split('\n')

const [key1, key2, key3] = albums.shift().split(',')

const objectArray = []

for (const album of albums) {
  const albumObject = {}

  const values = customSplit(album)

  albumObject[key1] = values[0]
  albumObject[key2] = values[1]
  albumObject[key3] = values[2]

  objectArray.push(albumObject)
}

fs.writeFileSync(pathName, JSON.stringify(objectArray))


// console.log(customSplit('"Chronicle, Vol. 1",Creedence Clearwater Revival,20'))
// console.log(objectArray)