const path = require('path')
const fs = require('fs')
const tinify = require('tinify')
const { getImgFiles } = require('./utils')
const { promisify } = require('util')
const access = promisify(fs.access)

// const filePath = process.argv[2]
// stat(filePath).then(console.log)

// const source = tinify.fromFile('111.jpg')
// source.toFile('333.jpg')

// console.log(tinify)

// fs.readFile('111.jpg', (err, sourceData) => {
//   if (err) throw err
//   tinify.fromBuffer(sourceData).toBuffer((err, resultData) => {
//     if (err) throw err
//     fs.writeFile('222.jpg', resultData, () => {
//       console.log('compress sucess!')
//     })
//   })
// })
class MinImg {
  constructor(files = ['./'], config) {
    this.files = files
    this.depth = config.depth // 默认undefined，递归为true

    this.tinyInit()

  }

  async tinyInit() {
    tinify.key = YOUR_API_KEY // 使用自己申请的API_KEY

    tinify.validate(err => {
      if (err) {
        console.log(err)
        return
      }

      // console.log(tinify.compressionCount)
    })
  }

  backup(filePath) {
    const dirname = path.dirname(filePath)
    const basename = path.basename(filePath)
    const backupDir = path.join(dirname, 'source')
    const backupFile = path.join(backupDir, basename)

    // 如果当前目录下不存在source文件夹，则创建
    fs.existsSync(backupDir) || fs.mkdirSync(backupDir)
    fs.copyFileSync(filePath, backupFile)
    console.log('backup')
  }

  compress() {
    const files = this.files

    for (let filePath of files) {
      // 备份
      this.backup(filePath)

      tinify.fromFile(filePath).toFile(filePath)
    }

    console.log('img mini done!')
  }

  async run() {
    try {
      this.files = await getImgFiles(this.files, this.depth)

      this.compress()
    } catch(error) {
      console.log(error)
    }
  }
}

module.exports = MinImg
