const path = require('path')
const fs = require('fs')
const UglifyJS = require('uglify-es')
const { getJsFiles } = require('./utils')

class MinJs {
  constructor(files = ['./'], config) {
    this.files = files
    this.sourceMap = config.sourceMap
    this.depth = config.depth // 默认undefined，递归为true
  }

  compress() {
    const sourceMap = this.sourceMap
    const files = this.files

    for (let filePath of files) {
      const extname  = path.extname(filePath) // .js
      const dirname = path.dirname(filePath)
      const basename = path.basename(filePath, extname)
      const minPath = path.join(dirname, basename + '.min' + extname)

      const input = fs.readFileSync(filePath, 'utf8')
      let options = {}

      if (sourceMap) {
        options = {
          sourceMap: {
            filename: path.basename(filePath),
            url: path.basename(filePath) + '.map'
          }
        }
      }

      const output = UglifyJS.minify(input, options)

      fs.writeFileSync(minPath, output.code, 'utf8')

      if (sourceMap) {
        const sourceMapPath = filePath + '.map'
        fs.writeFileSync(sourceMapPath, output.map.toString(), 'utf8')
      }
    }

    console.log('js mini done!')
  }

  async run() {
    try {
      this.files = await getJsFiles(this.files, this.depth)

      this.compress()
    } catch(error) {
      console.log(error)
    }
  }
}

module.exports = MinJs
