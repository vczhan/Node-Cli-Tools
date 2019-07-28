先拿到页面的资源
```
copy(performance.getEntriesByType('resource').map(x => x.name))
```

基本使用
```
node-dl -l newfile.txt -s https://abc.com -e foo/bar
```

```
# 根据文件列表下载
node-dl -l newfile.txt
```

```
# 下载单个文件
node-dl https://abc.com/foo/bar/1.jpg
```

```
# 过滤掉非这个网址的资源
-s https://abc.com
```

```
# 忽略目录，如https://abc.com/foo/bar/baz/a.jpg 下载到 baz/a.jpg
-e foo/bar
```
