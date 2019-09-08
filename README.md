## 一些自己可能会用到的工具

写Node.js cli工具有两个个注意点：
1. package.json
```
{
  "bin": {
    "xx": "./bin/xx",
  }
}
```
2. 文件头部要加上
```
#!/usr/bin/env node
```
这样`npm link`才能生成正确的的软链接。


### compress
压缩图片，JS文件，CSS文件
```
compress -j xx.js
```

### js2png
js代码转化为图片
```
js2png -c xx.js code.png
```

### node-dl
下载资源
```
node-dl -l xx.txt -e foo
```

### node-pd
下载网站
```
node-pd https://xxx.com
```

### ubn
使网易云音乐灰色歌曲能听
```
ubn
```

### node-gh
下载github单个文件或指定目录文件
```
node-gh https://github.com/username/repo
```
