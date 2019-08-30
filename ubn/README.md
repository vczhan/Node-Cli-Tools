### 使网易云音乐灰色歌曲能听
主要工作有 [@nondanee/unblockneteasemusic](https://github.com/nondanee/UnblockNeteaseMusic) 完成。但是使用比较麻烦：要修改hosts，启动前要先`ping music.163.com`拿到ip。所以写了这个工具用于要用代理时自动修改hosts，自动获取ip，然后启动代理服务。

#### 使用
```
ubn
```
启动时修改hosts，`ctrl+c`删除前面添加的记录。如果意外关闭并不会自动删除，可使用`ubn -q`删除hosts记录。

hosts文件一般需要管理员权限才能修改，不过我在PC上测试并没有提示，顺利修改了，这个问题先不管了。
