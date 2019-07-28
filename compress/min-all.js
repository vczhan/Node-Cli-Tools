const path = require('path')
const fs = require('fs')
const { promisify } = require('util')
const readdir = promisify(fs.readdir)
const stat = promisify(fs.stat)
const csso = require('csso')
const { getAllFiles } = require('./utils')
const MinJs = require('./min-js')
const MinCss = require('./min-css')
const MinImg = require('./min-img')

class MinAll {
  constructor(files = ['./'], config) {
    this.files = files
    this.config = config
    this.sourceMap = config.sourceMap
    this.depth = config.depth // 默认undefined，需要递归为true
  }

  compress() {
    const files = this.files
    const config = this.config
    const jsFiles = files.filter(file => /\.js$/i.test(file))
    const cssFiles = files.filter(file => /\.css$/i.test(file))
    const imgFiles = files.filter(file => /\.(jpg|jpeg|png)$/i.test(file))

    new MinJs(jsFiles, config).compress()
    new MinCss(cssFiles, config).compress()
    new MinImg(imgFiles, config).compress()
  }

  async run() {
    try {
      this.files = await getAllFiles(this.files, this.depth)

      this.compress()
    } catch(error) {
      console.log(error)
    }
  }
}

module.exports = MinAll
