const fs = require('fs')
const searchPhrase = process.argv[2]
console.log(searchPhrase)
const albums = fs.readFileSync('albums.csv', {
  encoding: 'utf-8'
}).split('\n')

const results = []

for (let album of albums) {
  if (album.toLowerCase().includes(searchPhrase.toLowerCase())) {
    results.push(album)
  }
}

console.log(results)