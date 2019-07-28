const path = require('path')
const fs = require('fs')
const { promisify } = require('util')
const readdir = promisify(fs.readdir)
const stat = promisify(fs.stat)

const type = {
  all: '\.(js|css|png|jpg|jpeg)$',
  js: '\.js$',
  css: '\.css$',
  img: '\.(png|jpg|jpeg)$',
}

const isDir = async function (filePath) {
  try {
    const stats = await stat(filePath)
    return stats.isDirectory()
  } catch (error) {
    return false
  }
}

const excludePath = function (filePath) {
  return [
    '.vscode',
    '.git',
    'node_modules'
  ].includes(filePath)
}


const getFiles = async function (filter, files, depth, dirPath = '') {
  const reg = new RegExp(type[filter], 'i')
  try {
    return Promise.all(await files.reduce(async (prev, next) => {
      prev = await prev

      if (excludePath(next)) {
        return prev
      }

      next = path.join(dirPath, next)

      const isDirectory = await isDir(next)

      if (isDirectory && depth !== false) {  // 如果是文件夹
        if (typeof depth === 'undefined') {
          depth = false
        }

        const allFiles = await readdir(next)
        const subFiles = await getFiles(filter, allFiles, depth, next)
        return [...prev, ...subFiles]
      } else if (reg.test(next)) {
        return [...prev, next]
      } else {
        return prev
      }
    }, Promise.resolve([])))
  } catch(error) {
    console.log(error)
  }
}

const getJsFiles = async function (files, depth) {
  return await getFiles('js', files, depth)
}

const getCssFiles = async function (files, depth) {
  return await getFiles('css', files, depth)
}

const getImgFiles = async function (files, depth) {
  return await getFiles('img', files, depth)
}

const getAllFiles = async function (files, depth) {
  return await getFiles('all', files, depth)
}

module.exports = {
  getJsFiles,
  getCssFiles,
  getImgFiles,
  getAllFiles,
}
