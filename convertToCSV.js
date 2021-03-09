const path = require('path')
const fs = require('fs')

const folder = 'output'
fs.mkdirSync(folder)
const fileName = 'insults.csv'

const pathName = path.join(folder, fileName)

console.log(pathName)

const insultObject = JSON.parse(fs.readFileSync('insults.json', {
  encoding: 'utf-8'
}))

const rows = []
let header = ''
for (let key of Object.keys(insultObject.insults[0])) {
  header += key + ','
}

rows.push(header.slice(0, -1))

for (let insult of Object.values(insultObject.insults)) {
  let row = ''
  for (let value of Object.values(insult)) {
    row += value + ','
  }
  rows.push(row.slice(0, -1))
}

const csvString = rows.join('\n')

fs.writeFileSync(pathName, csvString)