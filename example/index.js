const parseSrt = require('../dist/srt-parser.js')
const fs = require('fs')
const path = require('path')

fs.readFile(path.join(__dirname, 'data.srt'), (err, buf) => {
  if (err) {
    throw err
  }
  console.log(parseSrt(buf.toString()))
})
