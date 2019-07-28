const path = require('path')
const fs = require('fs')
const csso = require('csso')
const { getCssFiles } = require('./utils')

class MinCss {
  constructor(files = ['./'], config) {
    this.files = files
    this.sourceMap = config.sourceMap
    this.depth = config.depth // 默认undefined，递归为true
  }

  compress() {
    const sourceMap = this.sourceMap
    const files = this.files

    for (let filePath of files) {
      const extname  = path.extname(filePath) // .css
      const dirname = path.dirname(filePath)
      const basename = path.basename(filePath, extname)
      const minPath = path.join(dirname, basename + '.min' + extname)

      const input = fs.readFileSync(filePath, 'utf8')
      const output = csso.minify(input, {
        filename: filePath,
        sourceMap
      })

      if (sourceMap) {
        const sourceMapPath = filePath + '.map'
        fs.writeFileSync(sourceMapPath, output.map.toString(), 'utf8')
        output.css += `/*# sourceMappingURL=${path.basename(filePath) + '.map'} */`
      }

      fs.writeFileSync(minPath, output.css, 'utf8')
    }

    console.log('css mini done!')
  }

  async run() {
    try {
      this.files = await getCssFiles(this.files, this.depth)

      this.compress()
    } catch(error) {
      console.log(error)
    }
  }
}

module.exports = MinCss
