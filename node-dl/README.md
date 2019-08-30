### 下载图片，JS，CSS等静态资源

#### 使用:

##### 根据本地文件的资源地址列表下载
```
node-dl -l newfile.txt
```
可选参数：
- -s: `-s https://abc.com`，只下载这个网站的资源
- -e: `-e foo/bar`，忽略`foo/bar`目录，如https://abc.com/foo/bar/baz/a.jpg 下载到 baz/a.jpg


##### 下载单个资源
```
node-dl https://abc.com/foo/bar/1.jpg
```
